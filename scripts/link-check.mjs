#!/usr/bin/env node
/**
 * Internal link checker for the Circuit-Wise static build.
 * Scans all HTML files in dist/ for broken internal links and missing images.
 *
 * Usage: node scripts/link-check.mjs [dist-dir]
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve, posix } from "node:path";

const DIST = resolve(process.argv[2] || "dist");

async function getAllHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllHtmlFiles(full)));
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

async function fileExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

function extractAttributes(html, tag, attr) {
  const regex = new RegExp(`<${tag}[^>]*\\s${attr}\\s*=\\s*["']([^"']+)["']`, "gi");
  const values = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    values.push(m[1]);
  }
  return values;
}

function isInternal(url) {
  if (!url || url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) return false;
  if (url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("javascript:")) return false;
  if (url.startsWith("data:")) return false;
  if (url === "#" || url.startsWith("#")) return false;
  return true;
}

function resolveLink(linkHref, htmlFilePath) {
  // Strip hash fragment and query string
  let href = linkHref.split("#")[0].split("?")[0];
  if (!href) return null; // was just a fragment

  // Normalise to forward slashes for path resolution
  href = href.replace(/\\/g, "/");

  if (href.startsWith("/")) {
    // Absolute internal link
    return join(DIST, ...href.split("/"));
  }

  // Relative link – resolve from the directory of the HTML file
  const htmlDir = join(htmlFilePath, "..");
  return join(htmlDir, ...href.split("/"));
}

async function resolveTarget(fsPath) {
  if (!fsPath) return true; // nothing to check
  if (await fileExists(fsPath)) {
    const s = await stat(fsPath);
    if (s.isFile()) return true;
    // It's a directory – check for index.html
    if (s.isDirectory()) return fileExists(join(fsPath, "index.html"));
  }
  // Maybe it needs .html appended
  if (await fileExists(fsPath + ".html")) return true;
  // Maybe it's a directory path without trailing slash
  if (await fileExists(join(fsPath, "index.html"))) return true;
  return false;
}

// ── Main ────────────────────────────────────────────────────────────────
const htmlFiles = await getAllHtmlFiles(DIST);
console.log(`Scanning ${htmlFiles.length} HTML files in ${DIST}\n`);

const broken = [];
let totalLinks = 0;
let totalImages = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, "utf-8");
  const relPath = file.slice(DIST.length).replace(/\\/g, "/");

  // Check href on <a> tags
  const hrefs = extractAttributes(html, "a", "href");
  for (const href of hrefs) {
    if (!isInternal(href)) continue;
    totalLinks++;
    const target = resolveLink(href, file);
    if (!(await resolveTarget(target))) {
      broken.push({ file: relPath, type: "link", value: href });
    }
  }

  // Check src on <img> tags
  const srcs = extractAttributes(html, "img", "src");
  for (const src of srcs) {
    if (!isInternal(src)) continue;
    totalImages++;
    const target = resolveLink(src, file);
    if (!(await resolveTarget(target))) {
      broken.push({ file: relPath, type: "image", value: src });
    }
  }

  // Check href on <link> tags (CSS etc.)
  const linkHrefs = extractAttributes(html, "link", "href");
  for (const href of linkHrefs) {
    if (!isInternal(href)) continue;
    const target = resolveLink(href, file);
    if (!(await resolveTarget(target))) {
      broken.push({ file: relPath, type: "asset-link", value: href });
    }
  }

  // Check src on <script> tags
  const scriptSrcs = extractAttributes(html, "script", "src");
  for (const src of scriptSrcs) {
    if (!isInternal(src)) continue;
    const target = resolveLink(src, file);
    if (!(await resolveTarget(target))) {
      broken.push({ file: relPath, type: "script", value: src });
    }
  }
}

console.log(`Checked ${totalLinks} internal links and ${totalImages} internal images.\n`);

if (broken.length === 0) {
  console.log("✅ No broken internal links or missing assets found!");
} else {
  console.log(`❌ Found ${broken.length} broken reference(s):\n`);
  for (const b of broken) {
    console.log(`  [${b.type}] ${b.file}  →  ${b.value}`);
  }
  process.exit(1);
}
