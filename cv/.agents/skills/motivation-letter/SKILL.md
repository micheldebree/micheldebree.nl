---
name: motivation-letter
description: Write a motivation letter (motivatie.typ) tailored to a job description. Analyzes fit between CV and job requirements, highlights matching experience, addresses gaps, and adapts writing style to match the CV's tone.
metadata:
  version: "1.0"
---

# Motivation Letter Workflow

Write a motivation letter in `motivatie.typ` tailored to a specific job description.

---

## 1. Load the Job Description

Ask the user for the job description. Accept it as:
- A URL (fetch the page and extract text)
- Pasted text
- A file path

If a URL is provided, use WebFetch or WebSearch to retrieve the content. Confirm the extracted text with the user before proceeding.

---

## 2. Analyze Fit

Read `michel_de_bree.toml` (the CV data file) and understand all experience, skills, and keywords.

### 2.1 Requirements Mapping
For each requirement in the job description:
- Find matching experience entries in the CV
- Note specific technologies, domains, and roles that overlap
- Score the match: strong, partial, or gap

### 2.2 Gap Analysis
- What does the JD ask for that the CV doesn't explicitly cover?
- Can gaps be truthfully addressed? (e.g. similar technology, adjacent experience, quick learner)
- For each gap, formulate how to explain it: acknowledge honestly + bridge with related experience

### 2.3 Writing Style Adaptation
Match the CV's writing style in every paragraph:
- **Direct and no-nonsense**: Short, straightforward sentences. Avoid flowery language.
- **Self-aware about limitations**: When a gap exists, say so clearly and explain how you'll overcome it. Use phrasing like "Mijn ervaring met X is gedateerd. wel ervaring met Y opgedaan, waardoor ik op dit punt een korte inwerktijd voorzie."
- **Specific technology names**: Use exact names (Java 21, Spring Boot, PostgreSQL, not "Java", "frameworks", "databases").
- **Concise but informative**: Each paragraph or bullet should convey experience and relevance without padding.
- **Results-oriented**: Where possible, mention outcomes (betrouwbaar, schaalbaar, robuust).
- **Humble confidence**: State experience factually without bragging. Words like "pragmatisch", "oplossingsgericht", "no-nonsense".
- **Professional register**: Use "u" (formal) unless you know the recipient.
- **Structure**: Opening paragraph → bullet-point body with experience mapping → gap acknowledgment → closing.
- **Language**: Write in Dutch (unless the JD or user specifies English).
- **Closing**: "Met vriendelijke groet" followed by name.

### 2.4 Determine the Subject Line
- Based on the role title, company, and location mentioned in the JD
- Format (Dutch): "Solicitatie <role> <location>" or "Solicitatie <role> bij <company>"
- Format (English): "Application for <role> at <company>"

---

## 3. Write the Motivation Letter

Write the file `motivatie.typ` following the existing template structure.

### Template to follow (from existing `motivatie.typ`):

```typst
#let meta = toml("./info.toml")

#import "@preview/grotesk-cv:1.0.4": cover-letter, cv-section, recipient-entry
#import meta.import.fontawesome: *

#let first-name = meta.personal.first_name
#let last-name = meta.personal.last_name
#let text-size = eval(meta.layout.text.cover_letter_size)
#show: cover-letter.with(meta)
#set text(size: text-size)

#v(20pt)

#datetime.today().display("[day]-[month]-[year]")

= <Subject Line>

Beste lezer,

<opening paragraph>

<bullet points mapping experience to requirements>

<gap acknowledgment (if needed)>

<closing paragraph>

Met vriendelijke groet,

#v(10pt)

#par(justify: true)[
  #first-name #last-name
]
```

### Content Structure

#### Opening Paragraph (2-3 sentences)
- Express interest in the role
- State your profile: "Als ervaren ZZP-er met meer dan 20 jaar ervaring in softwareontwikkeling, waarvan ruim 15 jaar met Java..."
- Mention availability (direct inzetbaar, 36 uur per week) if relevant

#### Body — Experience Mapping (bullet points)
For each key requirement from the JD:
- Lead with the requirement matching the JD's phrasing
- Reference specific CV experience
- Use concrete technology names
- Keep to 2-3 sentences per bullet

Example (from existing motivatie.typ):
```
- Java & Backend: Ik werk momenteel met Java 21, Spring Boot. In mijn recente projecten (o.a. Digitaal Stelsel Omgevingswet) heb ik complexe, missie-kritische systemen gebouwd waarbij betrouwbaarheid en schaalbaarheid essentieel waren.
```

#### Gap Acknowledgment (if applicable, 1 paragraph or bullet)
- Be direct about the limitation
- Bridge to related experience
- Express confidence in picking it up quickly

Example (from existing motivatie.typ):
```
- Frontend (Angular): Mijn ervaring met Angular is gedateerd (voor 2018). Op mijn laatste project heb ik wel ruime ervaring met React opgedaan, waardoor ik op dit punt een korte inwerktijd voorzie.
```

#### Closing Paragraph (2-3 sentences)
- Reiterate enthusiasm
- Offer to discuss further
- Reference kennismaking/gesprek

#### Salutation
- Use "Beste lezer," unless a specific contact person is known
- If known, use "Beste [name],"

---

## 4. Verify

1. Run `make` to verify the document builds successfully
   - This compiles `cv.typ` into PDFs; not strictly needed for `motivatie.typ`, but confirms the project is in a good state
2. Show the user a summary of what was written
3. Ask if they want to review/adjust the letter

---

## Guardrails

- **Never fabricate experience.** Do not add skills, roles, or projects that don't exist in the CV.
- **Be honest about gaps.** Acknowledge limitations directly and bridge with real adjacent experience, not hypotheticals.
- **Preserve the CV's tone.** The motivation letter should sound like it was written by the same person who wrote the CV.
- **Confirm content before writing.** Present the analysis to the user and get approval on the key points before generating `motivatie.typ`.
- **Stay in scope.** Only modify files under `cv/`. Do not touch other projects.
