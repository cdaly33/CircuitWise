\# PRD: Interactive Quizzes with Feedback + Step-by-Step Breakdown



\*\*Project:\*\* Circuit-Wise  

\*\*Feature:\*\* Interactive quizzes with immediate answer checking and worked-solution teaching  

\*\*Prepared for:\*\* Static educational website  

\*\*Version:\*\* 1.0



\---



\## 1. Product Summary



Add interactive quizzes to Circuit-Wise so learners can:



\- read a question

\- enter or choose an answer

\- submit their guess

\- immediately see whether they were right or wrong

\- always receive a full step-by-step explanation of the formula, process, arithmetic, and reasoning



The feature should feel like a patient tutor, not an exam engine. Every question should become a mini lesson.



This feature should work entirely on a static website with no login and no backend.



\---



\## 2. Problem Statement



Users can currently read lesson content, but they cannot actively test understanding or get corrective feedback in context.



For an electricity-learning website, many concepts are procedural. Learners need repeated practice in:



\- identifying circuit types

\- choosing the correct formula

\- substituting values correctly

\- solving with the right arithmetic

\- understanding why the method applies



A static educational site becomes much more valuable when users can try a problem and see a worked solution immediately.



\---



\## 3. Goals



\### Primary Goals



\- Reinforce learning through active participation

\- Let users answer questions directly on the page

\- Provide immediate right/wrong feedback

\- Always show the worked solution after submission

\- Explain the why, not just the answer

\- Keep the implementation static-site friendly



\### Secondary Goals



\- Support multiple question types

\- Reuse one quiz engine across many lessons and stages

\- Make content authoring easy in JSON

\- Create a strong foundation for future practice pages and mixed question sets



\---



\## 4. Non-Goals



For the initial release, do not include:



\- user accounts

\- cloud sync

\- server-side grading

\- adaptive AI tutoring

\- certifications

\- timed exams

\- classroom management

\- advanced algebra parsing

\- persistent analytics tied to users



\---



\## 5. Target Users



\### Primary Users



\- absolute beginners learning electricity from scratch

\- DIY-minded learners

\- aspiring electricians

\- adults refreshing long-unused electrical knowledge



\### User Needs



Users want:



\- “Tell me if I got it right.”

\- “Show me how to solve it.”

\- “Explain why that formula applies.”

\- “Let me learn even if I miss it.”



\---



\## 6. Product Principles



1\. \*\*Teach first, grade second\*\*  

&#x20;  The quiz should feel educational, not punitive.



2\. \*\*Every answer reveals the process\*\*  

&#x20;  Users should always see the breakdown, even when correct.



3\. \*\*Static-first architecture\*\*  

&#x20;  No backend required.



4\. \*\*Reusable content model\*\*  

&#x20;  Question data should be easy to author and scale.



5\. \*\*Consistent solution structure\*\*  

&#x20;  Formula problems should follow a predictable explanation pattern.



\---



\## 7. User Experience Overview



\### Entry Points



Quizzes may appear in:



\- stage pages

\- lesson pages

\- future practice pages



\### MVP Recommendation



Launch first in:



\- one or more stage pages

\- one or more early theory/fundamentals lessons



\---



\## 8. Standard Quiz Flow



1\. User sees a question

2\. User reviews the prompt and optional diagram

3\. User enters or selects an answer

4\. User clicks \*\*Check Answer\*\*

5\. System shows:

&#x20;  - correct or not quite

&#x20;  - the correct answer

&#x20;  - the formula used when relevant

&#x20;  - value substitution

&#x20;  - arithmetic steps

&#x20;  - reasoning notes

&#x20;  - optional common mistake guidance

6\. User can:

&#x20;  - retry the question

&#x20;  - move to the next question

&#x20;  - reveal a hint before answering

&#x20;  - review the worked solution again



\---



\## 9. MVP Scope



\### Supported Question Types



\#### A. Multiple Choice

Useful for:



\- safety questions

\- vocabulary

\- circuit identification

\- conceptual understanding



\#### B. Numeric Input

Useful for:



\- Ohm’s Law

\- current

\- voltage

\- resistance

\- power

\- total series resistance



\### Future Types



\- multi-select

\- ordered steps

\- drag/drop matching

\- diagram labeling



\### Recommendation



For the first release, support:



\- multiple choice

\- numeric input



That gives a strong balance of conceptual and mathematical practice.



\---



\## 10. Feedback Requirements



After answer submission, every question must show:



\- whether the answer is correct or incorrect

\- a clear and friendly response message

\- the correct answer

\- the full worked solution

\- optional hint usage state

\- optional common mistake explanation



\### Correct Answer Example



> Correct — now let’s confirm the process.



\### Incorrect Answer Example



> Not quite — let’s solve it step by step.



\### Critical Rule



Even when the user answers correctly, the system must still show the full breakdown.



\---



\## 11. Worked Solution Format



For all formula-based questions, the worked solution should use a standard structure.



\### Standard Breakdown Pattern



1\. Identify the circuit type or relevant concept

2\. Choose the formula

3\. Substitute the values

4\. Solve the arithmetic

5\. Interpret the result

6\. Optionally check the result



\### Example Pattern



\- \*\*Step 1: Identify the circuit type\*\*  

&#x20; All three resistors are in one loop, so this is a series circuit.



\- \*\*Step 2: Find total resistance\*\*  

&#x20; `R\_total = R1 + R2 + R3`



\- \*\*Step 3: Substitute values\*\*  

&#x20; `R\_total = 10 + 15 + 30`



\- \*\*Step 4: Solve\*\*  

&#x20; `R\_total = 55 Ω`



\- \*\*Step 5: Use Ohm’s Law\*\*  

&#x20; `I = V / R`



\- \*\*Step 6: Substitute and solve\*\*  

&#x20; `I = 110 / 55 = 2 A`



\- \*\*Step 7: Interpret\*\*  

&#x20; In a series circuit, the same current flows through every component.



\---



\## 12. Information Architecture



\### Placement Options



\#### Stage Page Quiz Block

A short “Test Your Knowledge” or “Quick Check” block near the bottom of a stage page.



\#### Lesson Page Quick Check

A small quiz section at the end of a lesson.



\#### Future Practice Page

A page dedicated to multiple questions across a topic.



\### Recommended Labels



Use friendly labels such as:



\- Quick Check

\- Practice Question

\- Test Your Knowledge

\- Step-by-Step Solution

\- Why This Works

\- Common Mistake



Avoid harsh exam-like language.



\---



\## 13. Content Model Overview



Questions should be authored in structured JSON.



Each question should contain:



\- unique id

\- stage or lesson association

\- topic

\- question type

\- prompt

\- optional diagram

\- answer data

\- hint

\- worked solution

\- optional common mistakes

\- tags



\---



\## 14. UX Requirements



\### Question Card Must Include



\- question prompt

\- optional diagram or SVG

\- answer controls

\- hint toggle or reveal button

\- submit button

\- feedback area

\- worked-solution area

\- retry button



\### Numeric Input Requirements



\- accept integers and decimals

\- ignore leading/trailing spaces

\- optionally normalize commas

\- compare using numeric tolerance

\- show unit expectations near the field when appropriate



\### Multiple Choice Requirements



\- radio buttons

\- fully keyboard accessible

\- clearly indicate selected state



\### Worked Solution Display



After submission, the worked solution should be visible automatically by default.



\---



\## 15. Accessibility Requirements



The quiz system must support:



\- keyboard-only use

\- visible focus states

\- semantic labels

\- screen-reader-friendly feedback

\- ARIA live feedback region for answer results

\- sufficient color contrast

\- non-color-only correctness indicators

\- alt text for diagrams

\- mobile readability



\### Important Rule



Do not rely only on green and red. Pair status with text and optionally icons:



\- Correct

\- Not quite



\---



\## 16. Visual Design Requirements



The feature should match the site’s educational and approachable tone.



\### Design Characteristics



\- clean cards

\- simple spacing

\- readable typography

\- formula blocks in monospace or math-style presentation

\- numbered solution steps

\- calm and encouraging feedback states



\### Diagrams



Prefer SVG where practical for crisp circuit visuals.



\---



\## 17. Pedagogical Rules



1\. No shame-based wording

2\. No trick questions

3\. Explanations should teach the method

4\. Use the same terminology as the lesson content

5\. Show units clearly

6\. Explain why the formula applies

7\. Keep one core concept per question whenever possible



\---



\## 18. Functional Requirements



\### FR-1

The system shall render quiz questions from static JSON data.



\### FR-2

The system shall support multiple choice questions.



\### FR-3

The system shall support numeric input questions.



\### FR-4

The system shall evaluate answers client-side.



\### FR-5

The system shall display immediate correctness feedback after submission.



\### FR-6

The system shall display the full worked solution after every submission.



\### FR-7

The system shall support optional hints.



\### FR-8

The system shall allow users to retry a question.



\### FR-9

The system shall support optional diagrams or illustrations.



\### FR-10

The system shall support numeric tolerance for calculation questions.



\### FR-11

The system shall work with no login and no backend.



\### FR-12

The system shall support multiple questions on a single page.



\---



\## 19. Future Functional Requirements



\### FR-F1

The system may support multi-select questions.



\### FR-F2

The system may support ordered-step questions.



\### FR-F3

The system may support localStorage progress persistence.



\### FR-F4

The system may support randomized practice sets.



\### FR-F5

The system may support score summaries.



\---



\## 20. Technical Approach



\### Architecture



The quiz system should be a reusable front-end component that consumes statically provided question data at build time.



\### Implementation Style



\- static page content

\- client-side interactive behavior

\- no API dependency

\- no server rendering required for grading logic



\### Recommended Data Strategy



Use a structured JSON question bank that can either:



\- live per page, or

\- live in a shared central quiz library



\### Recommendation



For speed, start with per-page or per-section JSON imports, but structure them so they can later be centralized.



\---



\## 21. Formula Rendering



\### MVP



Use readable plain-text or monospace formulas such as:



\- `I = V / R`

\- `R\_total = R1 + R2 + R3`

\- `P = V × I`



\### Future



Optionally support KaTeX or MathJax if needed.



\### Recommendation



Plain-text formulas are sufficient for beginner electricity lessons.



\---



\## 22. Answer Evaluation Logic



\### Numeric Input



\- parse the input into a float

\- compare with a tolerance

\- reject blank input

\- optionally strip unit text in a later version



\### Example Rule



If the correct answer is `2` and tolerance is `0.01`, then `2`, `2.0`, and `1.999` are accepted.



\### Multiple Choice



\- compare selected choice id to correct choice id



\---



\## 23. State Model



Each question should support these states:



\- idle

\- hint shown

\- submitted correct

\- submitted incorrect

\- solution shown

\- retrying



\---



\## 24. Suggested Component Model



Recommended components:



\- `QuizBlock`

\- `QuestionCard`

\- `QuestionPrompt`

\- `DiagramPanel`

\- `AnswerInput`

\- `ChoiceList`

\- `HintReveal`

\- `FeedbackBanner`

\- `WorkedSolution`

\- `SolutionStep`

\- `CommonMistakes`

\- `QuizNavigation`



\---



\## 25. Copy Style Guidelines



Use supportive instructional language.



\### Good Examples



\- Correct — now let’s confirm the steps.

\- Not quite — here’s how to work it out.

\- First identify the circuit type.

\- In a series circuit, resistances add together.



\### Avoid



\- Wrong

\- Fail

\- Invalid response

\- You should know this



\---



\## 26. Stage-Based Content Strategy



Different stages should emphasize different kinds of questions.



\### Safety-Focused Stages

Use more conceptual questions such as:



\- Which step should come before electrical work begins?

\- Which hazard involves explosive energy release?

\- When should a licensed electrician be called?



\### Fundamentals and Theory Stages

Add more formula-based questions such as:



\- total resistance in series

\- current using Ohm’s Law

\- power using voltage and current

\- identifying circuit type from a diagram



\---



\## 27. Edge Cases



The system should handle:



\- blank numeric input

\- invalid numeric input

\- missing hint

\- missing diagram

\- retry after correct answer

\- multiple questions on one page

\- mobile layout

\- keyboard-only use

\- JavaScript-disabled fallback copy



\### Example Validation Message



> Enter a number before checking your answer.



\---



\## 28. Performance Requirements



\- no backend calls

\- lightweight JS

\- fast client-side checking

\- lazy-load heavier diagrams where needed

\- maintain strong page performance on desktop and mobile



\---



\## 29. Success Metrics



\### MVP Success Indicators



\- users interact with quizzes

\- users retry missed questions

\- quiz content increases engagement on lesson pages

\- questions feel helpful rather than intimidating

\- authoring new questions remains easy



\### Qualitative Success



Users should feel:



\- “I understand why this works.”

\- “I can follow the steps.”

\- “I want to try another one.”



\---



\## 30. Implementation Phases



\### Phase 1: MVP



\- multiple choice support

\- numeric input support

\- immediate answer checking

\- always-visible worked solution after submit

\- hints

\- retry button

\- initial question set for one stage and one fundamentals lesson



\### Phase 2



\- multi-select

\- per-page progress summary

\- localStorage persistence

\- shared quiz bank

\- richer diagrams



\### Phase 3



\- randomized practice mode

\- printable worksheets

\- broader question library

\- optional symbolic/unit-aware parsing enhancements



\---



\## 31. Acceptance Criteria



\### Product Acceptance



\- user can answer a question directly on the page

\- user gets immediate feedback

\- user always sees the worked solution

\- user can retry

\- feature works on desktop and mobile

\- feature requires no login

\- feature requires no backend



\### Content Acceptance



Every question must include:



\- prompt

\- correct answer

\- hint

\- worked solution



Every formula-based question must include:



\- formula

\- substitution

\- arithmetic

\- final answer

\- reasoning statement



\### UX Acceptance



\- keyboard accessible

\- screen-reader-friendly feedback

\- correctness not indicated by color alone

\- worked solution displayed clearly after submit



\---



\## 32. Open Decisions



1\. Should solutions auto-open immediately after submit or sit behind a reveal button?

2\. Should stage quizzes show one question at a time or all at once?

3\. Should correct answers still allow retry for practice?

4\. Should there be a lightweight score summary in MVP?

5\. Should diagrams be primarily SVG, image assets, or both?



\### Recommended Decisions



\- auto-show worked solution immediately

\- start with one question at a time or small stacked sets

\- allow retry even after correct submission

\- skip scoring in MVP

\- support both SVG and image assets



\---



\## 33. Recommended MVP Launch Plan



\### Initial Build



Launch the quiz engine in two contexts:



\#### A. Safety Foundations

Include 4 to 6 conceptual questions around:



\- why electricity is dangerous

\- safe work habits

\- PPE basics

\- when to call a licensed electrician



\#### B. Fundamentals / Early Theory

Include 4 to 6 calculation questions around:



\- series resistance

\- Ohm’s Law

\- current, voltage, and resistance basics



This proves the engine works for both concept learning and numerical problem solving.



\---



\## 34. Product Framing Recommendation



Do not think of this only as a quiz engine.



Frame it as an \*\*interactive worked-example engine\*\* that lets users try an answer and then learn from a guided breakdown.



That framing better matches the educational tone of Circuit-Wise.

