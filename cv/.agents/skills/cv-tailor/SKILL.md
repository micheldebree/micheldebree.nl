---
name: cv-tailor
description: Adapt the CV to best match a job description. Analyzes fit, discusses gaps interactively, and adapts the CV wording and emphasis to the target role — without fabricating experience.
metadata:
  version: "1.0"
---

# CV Tailor Workflow

Tailor this CV to a specific job description. The goal is to maximize relevance and match without introducing untruths.

---

## 1. Load the Job Description

Ask the user for the job description. Accept it as:
- A URL (fetch the page and extract text)
- Pasted text
- A file path

If a URL is provided, use WebFetch or WebSearch to retrieve the content. Confirm the extracted text with the user before proceeding.

---

## 2. Analyze Fit

Read the CV's data file (`michel_de_bree.toml`) to understand current content. Then analyze systematically:

### 2.1 Skills Match
- List each skill/technology from the job description
- Check if it exists in CV keywords (the `[Keywords.*]` section)
- Note the score
- Flag skills with score 0 (historic, low confidence — still mentionable but not strengths)

### 2.2 Experience Match
- For each job description requirement, find matching experience entries
- Note wording alignment — does the CV use terms the JD uses?
- Identify experience that could be reframed to match better

### 2.3 Gaps
- What does the JD ask for that the CV doesn't mention?
- Can gaps be truthfully addressed? (e.g. "I've used similar technologies" or the skill is present but not highlighted)
- Mark gaps as `actionable` (can be truthfully improved) or `hard gap` (cannot honestly claim)

### 2.4 Wording Alignment
- For matching skills/experience, does the CV use the same terms as the JD?
- Where the CV describes something the JD values, rewrite using JD phrasing where truthful

### 2.5 Reordering Opportunities
- The CV renders experiences in TOML array order. Which entries should move up/down?
- The left/right pane split in `cv.typ` controls section prominence. Consider swapping.

---

## 3. Present Analysis

Show the user a clear summary:

```
## Fit Analysis for: <Role> at <Company>

### Strong Match (highlight these)
- Java/Spring Boot: CV matches well, already prominent
- REST APIs: strong alignment, good wording
- ...

### Minor Gaps (actionable)
- <gap>: suggest rewording existing experience to use JD term X
- <gap>: move experience Y higher in order
- ...

### Hard Gaps (cannot truthfully claim)
- <gap>: you don't have this experience, leave as-is
- ...
```

---

## 4. Interactive Adaptation

For each change, **present the specific change to the user and ask before applying**.

Types of changes to propose:

### 4.1 Wording Tweaks (in `michel_de_bree.toml`)
- Rewrite `Summary.Introduction` to emphasize JD-relevant aspects
- Rewrite experience `Situation`/`Task`/`Action`/`Result` fields to use JD terminology where truthful
- Example: if JD says "microservices" and CV says "services", suggest changing

### 4.2 Reordering (in `michel_de_bree.toml`)
- Move matching experience entries higher in the `[[Experience]]` array
- Move less relevant entries lower
- Present the proposed order before changing

### 4.3 Section/Keyword Tuning
- Add or adjust skill keyword scores in `[Keywords.*]` if justified (never inflate dishonestly)
- Consider moving sections between left/right pane in `cv.typ` (e.g. put a key skill category more prominently)
- Consider adding relevant keywords to an experience entry's `Keywords` list if they truthfully apply

### 4.4 De-emphasizing Irrelevant Content
- If old experience (e.g. LUMC, PaC) is irrelevant to the target role, propose reducing detail or moving lower
- Never remove content the user wants to keep

---

## 5. Commit Changes

After all adaptations are agreed:
1. Run `make` to verify the CV builds successfully
2. Show the user a summary of all changes made
3. Ask if they want to commit the changes

---

## Guardrails

- **Never fabricate.** Do not add skills, experience, or roles that don't exist. Do not inflate scores beyond honest self-assessment.
- **Never rewrite to the point of misrepresentation.** Wording alignment is fine; claiming expertise is not.
- **Always confirm before editing.** Every change to a CV file must be explicitly approved.
- **Preserve truth.** If the JD requires something the candidate genuinely lacks, say so clearly.
- **Stay in scope.** Only modify files under `cv/`. Do not touch other projects.
