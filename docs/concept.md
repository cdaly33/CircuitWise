You are an expert product-minded senior frontend architect and educator-focused web builder.

Your task is to create a COMPLETE IMPLEMENTATION PLAN for a static educational website based on the PRD below.

Do not write production code yet.
Do not skip planning.
Do not make up backend services.
Do not introduce server-side dependencies.
Do not introduce authentication, a database, analytics, CMS, or APIs.
This project must remain purely static.

Your job in this phase is to produce a detailed plan that an implementation agent could execute with minimal ambiguity.

==================================================
PROJECT PRD
==================================================

# Project Name
Electricity Fundamentals

# Product Summary
Build a purely static educational website that teaches the fundamentals of electricity from absolute beginner level to expert-level conceptual understanding.

The site is intended for:
- absolute beginners
- curious learners
- future electricians
- DIY homeowners who want conceptual understanding
- students

The tone must be:
- friendly
- encouraging
- visual-first
- plain-English
- not academic and not dry

The site must:
- teach electricity progressively in stages
- blend theory, practical electrician concepts, residential concepts, and commercial concepts
- include lessons that build on prior lessons
- explain relationships between concepts like voltage, current, resistance, wattage, AC/DC, circuits, grounding, etc.
- include component-level lessons such as diodes, resistors, transistors, capacitors, inductors, relays, transformers, fuses, breakers, and contactors
- include visuals throughout
- use SVG diagrams and lightweight interactive elements where helpful
- include basic math practice such as Ohm's law and wattage exercises
- include real wiring examples conceptually, while avoiding unsafe step-by-step instructions
- include a glossary
- include an electrical symbol library
- remain informational only
- never be used for financial gain

The site must NOT include:
- server functionality
- database
- login
- account system
- API reliance
- monetization features
- code-specific authoritative installation guidance
- unsafe how-to instructions for performing real electrical work

# Static Architecture Requirement
Everything must run as a static website with static HTML/CSS/JS output only.

Recommended stack:
- Astro preferred
- acceptable alternative: Next.js static export

Use Astro unless there is a compelling reason not to.

# Core Learning Structure
The site should be stage-based and progressive.

Suggested stages:
- Stage 0: Safety Foundations
- Stage 1: Foundations of Electricity
- Stage 2: AC vs DC
- Stage 3: Circuits
- Stage 4: Measurement and Tools
- Stage 5: Electrical Components
- Stage 6: Reading Electrical Diagrams
- Stage 7: Residential Electrical Systems
- Stage 8: Commercial Electrical Systems
- Stage 9: Troubleshooting Thinking
- Stage 10: Electricity Math

# Lesson Template
Each lesson should follow a consistent structure:
- Lesson Title
- Why This Matters
- Concept Explanation
- Visual Explanation
- Real World Example
- Common Beginner Mistake
- Key Terms
- Mini Exercise
- Lesson Recap
- Next Lesson

# Version 1 Scope
V1 must include:
- stages 0 through 5
- approximately 25 to 40 lessons
- glossary
- symbol library
- SVG visuals
- basic interactive elements

# Design Direction
Design goals:
- clean
- modern
- educational
- diagram-heavy
- not cluttered
- responsive
- accessible

Potential concept colors:
- voltage = red
- current = blue
- resistance = orange

# Accessibility
Must support:
- keyboard navigation
- semantic HTML
- SVG alt/desc support
- sufficient color contrast
- responsive layouts

# Legal / Safety
Include a clear educational disclaimer:
This site is educational only and does not replace licensed electricians, inspections, or local electrical codes.

==================================================
YOUR OUTPUT REQUIREMENTS
==================================================

Produce a comprehensive implementation plan with the exact sections below.

1. EXECUTIVE SUMMARY
- summarize the product
- summarize target audience
- summarize V1 scope
- summarize architectural constraints

2. RECOMMENDED STACK
- recommend the exact stack
- explain why
- list exact core dependencies
- list anything intentionally excluded

3. INFORMATION ARCHITECTURE
- define the site map
- define primary navigation
- define secondary navigation
- define stage progression
- define cross-linking strategy between lessons, glossary, and symbols

4. CONTENT MODEL
- define how lesson content should be stored
- define frontmatter/content schema
- define fields for lessons, glossary entries, symbol entries, and stage landing pages
- define slugging and URL conventions
- define prerequisite / next-lesson metadata

5. PAGE TYPES
For each page type, describe:
- purpose
- required sections
- optional sections
- reusable components needed

Include at minimum:
- homepage
- stage landing page
- lesson page
- glossary index
- glossary entry page or modal strategy
- symbol library index
- symbol detail pattern
- about/disclaimer page

6. COMPONENT ARCHITECTURE
List the reusable UI components needed.
For each component include:
- purpose
- props/data inputs
- accessibility notes

Include at minimum:
- Header
- Footer
- Breadcrumbs
- StageProgress
- LessonLayout
- ConceptCallout
- CommonMistakeCard
- KeyTermsList
- MiniExercise
- LessonNav
- DiagramFrame
- SVGHotspotDiagram
- FormulaCard
- GlossaryTeaser
- SymbolCard
- DisclaimerBanner

7. INTERACTIVITY PLAN
Describe static-safe interactivity patterns only.
Include:
- SVG hover/click labeling
- simple calculators
- show/hide explanations
- highlight relationships between concepts
- low-JS patterns
- fallback behavior when JS is unavailable

8. VISUAL SYSTEM
Define:
- typography approach
- spacing approach
- color system
- icon/diagram style
- illustration style
- motion principles
- responsive behavior
- dark mode decision (include whether to support it in V1 or defer it)

9. ACCESSIBILITY PLAN
Provide concrete accessibility requirements for:
- navigation
- forms/inputs for calculators
- interactive SVGs
- focus states
- reduced motion
- color reliance
- semantic headings
- glossary and symbol browsing

10. CONTENT SEED PLAN
Create a proposed V1 lesson list with approximately 25 to 40 lessons across stages 0 through 5.
For each lesson include:
- stage
- lesson title
- one-sentence goal
- prerequisite lesson if applicable

11. GLOSSARY PLAN
List the initial glossary entries V1 should include.
Group them by category.

12. SYMBOL LIBRARY PLAN
List the initial symbol categories and representative symbols for V1.

13. FILE AND FOLDER STRUCTURE
Provide a practical Astro project structure.

14. SEO / METADATA PLAN
For a static educational site, define:
- title patterns
- meta description patterns
- Open Graph basics
- structured data suggestions if appropriate
- canonical approach
Do not introduce external services.

15. SAFETY AND DISCLAIMER PLAN
Explain where safety disclaimers should appear and how content should avoid unsafe instructional framing.

16. IMPLEMENTATION PHASES
Break the build into phases such as:
- foundation setup
- design system
- content model
- shell pages
- lesson pages
- glossary and symbols
- interactive diagrams
- accessibility pass
- content QA
- static build verification

17. ACCEPTANCE CRITERIA
Provide concrete acceptance criteria for V1.

18. RISKS AND MITIGATIONS
Identify likely risks such as:
- scope creep
- too much content before structure
- overly complex interactivity
- unsafe instructional interpretation
- inconsistent lesson writing
- accessibility gaps

19. AUTOPILOT HANDOFF
Provide a clean handoff section for an implementation agent that includes:
- what to build first
- what order to build in
- what to stub initially
- where content can start as placeholder
- what must be production-quality from the start

==================================================
IMPORTANT RULES
==================================================

- Stay in planning mode only.
- Do not output source code files.
- Do not write full lesson content.
- Be specific and implementation-oriented.
- Make reasonable decisions instead of asking questions.
- Prefer Astro content collections or an equivalent static-content approach.
- Optimize for maintainability, scalability, and clarity.
- Assume the website will later grow beyond V1.
- Keep the plan grounded in a purely static architecture.
- Avoid overengineering.
- Favor educational clarity over flashy UI.

At the end, include:
A. a concise recommended MVP build order
B. a short list of assumptions made
C. a short list of open decisions that can be deferred without blocking implementation