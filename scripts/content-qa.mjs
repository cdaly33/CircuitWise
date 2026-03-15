#!/usr/bin/env node
/**
 * Content QA Script for Circuit-Wise
 * Validates frontmatter, cross-references, ordering, and content quality.
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, basename, dirname, relative } from 'path';

const ROOT = join(import.meta.dirname, '..');
const CONTENT = join(ROOT, 'src', 'content');
const PUBLIC = join(ROOT, 'public');

const errors = [];
const warnings = [];

function error(msg) { errors.push(`❌ ERROR: ${msg}`); }
function warn(msg) { warnings.push(`⚠️  WARN: ${msg}`); }
function info(msg) { console.log(`ℹ️  ${msg}`); }

// ── Frontmatter parser ──────────────────────────────────────────────
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const raw = match[1];
  const data = {};
  let currentKey = null;
  let inArray = false;

  for (const line of raw.split(/\r?\n/)) {
    // Array item
    if (inArray && /^\s+-\s+/.test(line)) {
      const val = line.replace(/^\s+-\s+/, '').replace(/^["']|["']$/g, '');
      data[currentKey].push(val);
      continue;
    }
    // Key-value
    const kvMatch = line.match(/^(\w[\w-]*):\s*(.*)/);
    if (kvMatch) {
      const [, key, rawVal] = kvMatch;
      const val = rawVal.trim();
      if (val === '' || val === '[]') {
        // Could be start of array block or empty
        data[key] = [];
        currentKey = key;
        inArray = true;
        continue;
      }
      inArray = false;
      currentKey = key;
      // Inline array: ["a", "b"]
      if (val.startsWith('[')) {
        try {
          data[key] = JSON.parse(val);
        } catch {
          data[key] = val.replace(/^\[|\]$/g, '').split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
        }
      } else if (val === 'true') {
        data[key] = true;
      } else if (val === 'false') {
        data[key] = false;
      } else if (/^\d+$/.test(val)) {
        data[key] = parseInt(val, 10);
      } else {
        data[key] = val.replace(/^["']|["']$/g, '');
      }
    }
  }
  return data;
}

function getBody(content) {
  const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)/);
  return match ? match[1] : '';
}

// ── File collectors ─────────────────────────────────────────────────
function collectFiles(dir, ext) {
  const results = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(full, ext));
    } else if (entry.name.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

// ── Placeholder detection ───────────────────────────────────────────
const PLACEHOLDER_PATTERNS = [
  /\bTODO\b/i,
  /\bPLACEHOLDER\b/i,
  /\bLorem ipsum\b/i,
  /\bComing soon\b/i,
  /\bTBD\b/,
  /\bFIXME\b/i,
  /\bXXX\b/,
];

function checkPlaceholders(text, label) {
  for (const pat of PLACEHOLDER_PATTERNS) {
    const match = text.match(pat);
    if (match) {
      error(`${label}: Contains placeholder text "${match[0]}"`);
    }
  }
}

// ── Stage mapping ───────────────────────────────────────────────────
const stageMap = {}; // slug → stageNumber
const stageFiles = collectFiles(join(CONTENT, 'stages'), '.md');
for (const f of stageFiles) {
  const content = readFileSync(f, 'utf-8');
  const fm = parseFrontmatter(content);
  if (fm) {
    const slug = basename(f, '.md');
    stageMap[slug] = fm.stageNumber;
  }
}
info(`Loaded ${Object.keys(stageMap).length} stages: ${JSON.stringify(stageMap)}`);

// ── LESSONS ─────────────────────────────────────────────────────────
info('\n=== LESSON CHECKS ===');
const lessonDir = join(CONTENT, 'lessons');
const lessonFiles = collectFiles(lessonDir, '.mdx');
const lessonIds = new Set(); // "stage-slug/lesson-slug"
const lessonsByStage = {}; // stageSlug → [{file, fm}]

const REQUIRED_LESSON_FIELDS = ['title', 'stage', 'stageSlug', 'lessonNumber', 'description', 'keyTerms', 'difficulty', 'estimatedMinutes'];

for (const f of lessonFiles) {
  const relPath = relative(lessonDir, f).replace(/\\/g, '/');
  const parts = relPath.split('/');
  const stageSlug = parts[0];
  const lessonSlug = basename(f, '.mdx');
  const lessonId = `${stageSlug}/${lessonSlug}`;
  lessonIds.add(lessonId);

  const content = readFileSync(f, 'utf-8');
  const fm = parseFrontmatter(content);
  const body = getBody(content);

  if (!fm) {
    error(`Lesson ${lessonId}: No frontmatter found`);
    continue;
  }

  // Required fields
  for (const field of REQUIRED_LESSON_FIELDS) {
    if (fm[field] === undefined || fm[field] === null || fm[field] === '') {
      error(`Lesson ${lessonId}: Missing required field "${field}"`);
    }
  }

  // stageSlug must match directory
  if (fm.stageSlug && fm.stageSlug !== stageSlug) {
    error(`Lesson ${lessonId}: stageSlug "${fm.stageSlug}" doesn't match directory "${stageSlug}"`);
  }

  // stage number must match stage mapping
  if (fm.stage !== undefined && stageMap[stageSlug] !== undefined) {
    if (fm.stage !== stageMap[stageSlug]) {
      error(`Lesson ${lessonId}: stage=${fm.stage} but ${stageSlug} is stageNumber=${stageMap[stageSlug]}`);
    }
  }

  // Collect for ordering check
  if (!lessonsByStage[stageSlug]) lessonsByStage[stageSlug] = [];
  lessonsByStage[stageSlug].push({ lessonId, lessonNumber: fm.lessonNumber, file: f });

  // keyTerms should be a non-empty array
  if (Array.isArray(fm.keyTerms) && fm.keyTerms.length === 0) {
    warn(`Lesson ${lessonId}: keyTerms is empty`);
  }

  // Check difficulty value
  if (fm.difficulty && !['beginner', 'intermediate', 'advanced'].includes(fm.difficulty)) {
    error(`Lesson ${lessonId}: Invalid difficulty "${fm.difficulty}"`);
  }

  // Placeholder check
  checkPlaceholders(`${fm.title} ${fm.description}`, `Lesson ${lessonId} frontmatter`);
  checkPlaceholders(body, `Lesson ${lessonId} body`);

  // Body should have substantive content (at least 100 chars after stripping imports/components)
  const strippedBody = body.replace(/import\s+.*?;\s*/g, '').replace(/<[^>]+>/g, '').trim();
  if (strippedBody.length < 100) {
    warn(`Lesson ${lessonId}: Body content seems very short (${strippedBody.length} chars)`);
  }
}

// Check ordering within each stage
for (const [stageSlug, lessons] of Object.entries(lessonsByStage)) {
  const numbers = lessons.map(l => l.lessonNumber).filter(n => n !== undefined);
  const sorted = [...numbers].sort((a, b) => a - b);

  // Duplicate check
  const seen = new Set();
  for (const n of numbers) {
    if (seen.has(n)) {
      error(`Stage ${stageSlug}: Duplicate lessonNumber ${n}`);
    }
    seen.add(n);
  }

  // Gap check (should be sequential from 1)
  if (sorted.length > 0) {
    const expected = Array.from({ length: sorted.length }, (_, i) => i + 1);
    if (JSON.stringify(sorted) !== JSON.stringify(expected)) {
      warn(`Stage ${stageSlug}: lessonNumbers are ${JSON.stringify(sorted)}, expected ${JSON.stringify(expected)}`);
    }
  }
}

info(`Found ${lessonFiles.length} lessons across ${Object.keys(lessonsByStage).length} stages`);

// ── GLOSSARY ────────────────────────────────────────────────────────
info('\n=== GLOSSARY CHECKS ===');
const glossaryDir = join(CONTENT, 'glossary');
const glossaryFiles = collectFiles(glossaryDir, '.md');
const glossaryIds = new Set(); // file slug (without .md)

const REQUIRED_GLOSSARY_FIELDS = ['term', 'category'];

for (const f of glossaryFiles) {
  const slug = basename(f, '.md');
  glossaryIds.add(slug);

  const content = readFileSync(f, 'utf-8');
  const fm = parseFrontmatter(content);
  const body = getBody(content);

  if (!fm) {
    error(`Glossary ${slug}: No frontmatter found`);
    continue;
  }

  for (const field of REQUIRED_GLOSSARY_FIELDS) {
    if (fm[field] === undefined || fm[field] === null || fm[field] === '') {
      error(`Glossary ${slug}: Missing required field "${field}"`);
    }
  }

  // Body should contain a definition
  if (body.trim().length < 20) {
    warn(`Glossary ${slug}: Definition body seems very short (${body.trim().length} chars)`);
  }

  // Check relatedTerms point to existing glossary entries
  if (Array.isArray(fm.relatedTerms)) {
    for (const term of fm.relatedTerms) {
      if (!glossaryIds.has(term)) {
        // Defer this check — collect for later
      }
    }
  }

  // Check relatedLessons point to existing lessons
  if (Array.isArray(fm.relatedLessons)) {
    for (const lesson of fm.relatedLessons) {
      if (!lessonIds.has(lesson)) {
        // Defer
      }
    }
  }

  checkPlaceholders(`${fm.term} ${fm.category}`, `Glossary ${slug} frontmatter`);
  checkPlaceholders(body, `Glossary ${slug} body`);
}

info(`Found ${glossaryFiles.length} glossary entries`);

// ── SYMBOLS ─────────────────────────────────────────────────────────
info('\n=== SYMBOL CHECKS ===');
const symbolDir = join(CONTENT, 'symbols');
const symbolFiles = collectFiles(symbolDir, '.md');
const symbolIds = new Set();

const REQUIRED_SYMBOL_FIELDS = ['name', 'category', 'svgFile', 'altText'];

for (const f of symbolFiles) {
  const slug = basename(f, '.md');
  symbolIds.add(slug);

  const content = readFileSync(f, 'utf-8');
  const fm = parseFrontmatter(content);
  const body = getBody(content);

  if (!fm) {
    error(`Symbol ${slug}: No frontmatter found`);
    continue;
  }

  for (const field of REQUIRED_SYMBOL_FIELDS) {
    if (fm[field] === undefined || fm[field] === null || fm[field] === '') {
      error(`Symbol ${slug}: Missing required field "${field}"`);
    }
  }

  // SVG file exists
  if (fm.svgFile) {
    const svgPath = join(PUBLIC, fm.svgFile.replace(/^\//, ''));
    if (!existsSync(svgPath)) {
      error(`Symbol ${slug}: svgFile "${fm.svgFile}" not found at ${svgPath}`);
    }
  }

  checkPlaceholders(`${fm.name || ''} ${fm.altText || ''}`, `Symbol ${slug} frontmatter`);
  checkPlaceholders(body, `Symbol ${slug} body`);
}

info(`Found ${symbolFiles.length} symbol entries`);

// ── CROSS-REFERENCE VALIDATION (deferred) ───────────────────────────
info('\n=== CROSS-REFERENCE CHECKS ===');

// Re-read glossary for cross-refs (now that all IDs are collected)
for (const f of glossaryFiles) {
  const slug = basename(f, '.md');
  const content = readFileSync(f, 'utf-8');
  const fm = parseFrontmatter(content);
  if (!fm) continue;

  if (Array.isArray(fm.relatedTerms)) {
    for (const term of fm.relatedTerms) {
      if (!glossaryIds.has(term)) {
        error(`Glossary ${slug}: relatedTerms references non-existent glossary entry "${term}"`);
      }
    }
  }
  if (Array.isArray(fm.relatedLessons)) {
    for (const lesson of fm.relatedLessons) {
      if (!lessonIds.has(lesson)) {
        warn(`Glossary ${slug}: relatedLessons references non-existent lesson "${lesson}"`);
      }
    }
  }
}

// Re-read symbols for cross-refs
for (const f of symbolFiles) {
  const slug = basename(f, '.md');
  const content = readFileSync(f, 'utf-8');
  const fm = parseFrontmatter(content);
  if (!fm) continue;

  if (Array.isArray(fm.relatedTerms)) {
    for (const term of fm.relatedTerms) {
      if (!glossaryIds.has(term)) {
        error(`Symbol ${slug}: relatedTerms references non-existent glossary entry "${term}"`);
      }
    }
  }
  if (Array.isArray(fm.relatedLessons)) {
    for (const lesson of fm.relatedLessons) {
      if (!lessonIds.has(lesson)) {
        warn(`Symbol ${slug}: relatedLessons references non-existent lesson "${lesson}"`);
      }
    }
  }
}

// ── LESSON CROSS-REFS ───────────────────────────────────────────────
info('\n=== LESSON CROSS-REFERENCE CHECKS ===');
for (const f of lessonFiles) {
  const relPath = relative(lessonDir, f).replace(/\\/g, '/');
  const parts = relPath.split('/');
  const stageSlug = parts[0];
  const lessonSlug = basename(f, '.mdx');
  const lessonId = `${stageSlug}/${lessonSlug}`;

  const content = readFileSync(f, 'utf-8');
  const fm = parseFrontmatter(content);
  if (!fm) continue;

  // nextLesson should exist
  if (fm.nextLesson && !lessonIds.has(fm.nextLesson)) {
    warn(`Lesson ${lessonId}: nextLesson "${fm.nextLesson}" doesn't exist`);
  }

  // prerequisites should exist
  if (Array.isArray(fm.prerequisites)) {
    for (const prereq of fm.prerequisites) {
      if (!lessonIds.has(prereq)) {
        warn(`Lesson ${lessonId}: prerequisite "${prereq}" doesn't exist`);
      }
    }
  }

  // keyTerms should correspond to glossary entries
  if (Array.isArray(fm.keyTerms)) {
    for (const term of fm.keyTerms) {
      if (!glossaryIds.has(term)) {
        warn(`Lesson ${lessonId}: keyTerm "${term}" has no glossary entry`);
      }
    }
  }

  // symbols should correspond to symbol entries
  if (Array.isArray(fm.symbols)) {
    for (const sym of fm.symbols) {
      if (!symbolIds.has(sym)) {
        warn(`Lesson ${lessonId}: symbol "${sym}" has no symbol entry`);
      }
    }
  }
}

// ── SAFETY DISCLAIMER CHECK ─────────────────────────────────────────
info('\n=== SAFETY DISCLAIMER CHECKS ===');
const safetyStageDir = join(lessonDir, 'safety-foundations');
if (existsSync(safetyStageDir)) {
  const safetyLessons = collectFiles(safetyStageDir, '.mdx');
  for (const f of safetyLessons) {
    const body = getBody(readFileSync(f, 'utf-8'));
    const slug = basename(f, '.mdx');
    // Check for safety-related keywords/components
    const hasSafetyContent = /\b(warning|caution|danger|safety|⚠|🚨|SafetyNote|Warning|Caution)\b/i.test(body);
    if (!hasSafetyContent) {
      warn(`Safety lesson safety-foundations/${slug}: No safety disclaimer/warning found in body`);
    }
  }
}

// Also check lessons that mention safety-critical topics
for (const f of lessonFiles) {
  const relPath = relative(lessonDir, f).replace(/\\/g, '/');
  const body = getBody(readFileSync(f, 'utf-8'));
  if (/\b(high voltage|electrocution|shock hazard|arc flash|lethal)\b/i.test(body)) {
    const hasWarning = /\b(warning|caution|danger|⚠|🚨|SafetyNote|Warning|Caution)\b/i.test(body);
    if (!hasWarning) {
      warn(`Lesson ${relPath}: Mentions dangerous topics but has no safety warning`);
    }
  }
}

// ── REPORT ──────────────────────────────────────────────────────────
console.log('\n' + '═'.repeat(60));
console.log('CONTENT QA REPORT');
console.log('═'.repeat(60));

if (errors.length === 0 && warnings.length === 0) {
  console.log('\n✅ All checks passed! No issues found.');
} else {
  if (errors.length > 0) {
    console.log(`\n🔴 ERRORS (${errors.length}):`);
    for (const e of errors) console.log(`  ${e}`);
  }
  if (warnings.length > 0) {
    console.log(`\n🟡 WARNINGS (${warnings.length}):`);
    for (const w of warnings) console.log(`  ${w}`);
  }
}

console.log(`\n📊 Summary: ${errors.length} errors, ${warnings.length} warnings`);
console.log(`   Lessons: ${lessonFiles.length} | Glossary: ${glossaryFiles.length} | Symbols: ${symbolFiles.length}`);
console.log(`   Lesson IDs: ${[...lessonIds].sort().join(', ')}`);
process.exit(errors.length > 0 ? 1 : 0);
