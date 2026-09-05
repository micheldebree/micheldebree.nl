---
name: cv-tailor
description: Optimize the CV for a specific vacancy so it scores exceptionally well on automatic LLM screening. Takes the vacancy text, works on a dedicated git branch, and adapts wording, emphasis and ordering — without fabricating experience.
metadata:
  version: "2.2"
---

# CV Tailor for Vacancies

Adapt this CV to a specific vacancy, targeting an **exceptional score from an LLM
that automatically screens candidates against the vacancy text**. The vacancy
text is the spec: the screening LLM compares what the vacancy asks for against
what the CV says, and rewards precise, specific, well-placed matches.

Two hard constraints shape everything:
1. **No lies.** Never invent experience, skills, or duration. Every claim in the
   optimized CV must be true.
2. **Human-readable.** The result must read like a normal, well-written CV. No
   keyword stuffing, no meta-instructions ("this role is a strong fit for"), no
   bullet-spam, nothing that signals the CV was engineered for a machine.

---

## 1. Collect the Vacancy and Set Up

1. Ask for the vacancy text. Accept pasted text, a file path, or a URL (fetch it
   and confirm the extracted text with the user).
2. Ask which language version to optimize: **Dutch** (`.nl` fields) or
   **English** (`.en` fields). Usually the language the vacancy is written in.
   Fields without a language suffix (`Company`, `Keywords = [...]`, scores) are
   shared.
3. Create a working branch so the tailored CV stays isolated:
   ```
   git checkout -b cv/<company-slug>
   ```
   (e.g. `cv/acme-bank`). All edits happen on this branch; the master CV is
   never touched.

---

## 2. Know the Levers (how this CV renders)

- **Data lives in `michel_de_bree.toml`.** Per-language fields use `.nl`/`.en`
  suffixes (`Summary.Introduction.en`, `Experience[0].Situation.nl`, ...).
- **`[Summary]`** — `Tagline` (one line under the name) and `Introduction`
  (profile paragraph). First thing any screen reads.
- **`[[Experience]]`** — rendered in array order. Each has `Situation` and
  `[[Experience.Task.*]]` entries with `Task`/`Action`/`Result`.
- **`[Keywords.<id>]`** — `Name` (display string) and `Score` (0–10).
- **`[Skills]`** — categories that reference keyword ids; only referenced
  keywords are rendered (as `Name (score/10)` with stars).
- **Per-experience `Keywords = [...]`** — renders the keyword **names** under
  that experience entry, so a truthfully-applicable keyword surfaces there.
- **`cv.typ`** — PDF metadata (`title`, `description`, `keywords`). Shared by
  both languages; some extractors read this. The `keywords` list carries ALL
  the vacancy's requirement and wish terms, regardless of experience level
  (step 4.7); `title` and `description` stay natural.
- **Build:** `make` (compiles both languages). Always run it before finishing.

---

## 3. Fit Analysis

Read `michel_de_bree.toml` fully. Extract every technology, tool, framework,
practice, and hard requirement from the vacancy, then classify each:

| Class | Meaning | Action |
|---|---|---|
| **Direct** | CV already states it | Verify wording uses the vacancy's exact term; promote if buried |
| **Terminology** | Same thing, different name (e.g. "Spring Boot" vs "Spring") | Align terminology where truthful |
| **Adjacent** | CV has a closely related technology | Bridge with similarity (step 4.4) |
| **Hard gap** | No comparable experience | Downplay it: compare to the closest experience the CV does have (step 4.5). If no comparable experience exists, add a brief self-study note (step 4.5) |

Present the user a compact analysis:

```
## Fit: <Role> @ <Company>   (language: en)

Direct (promote/align):        Spring Boot, REST, Kubernetes, GitLab CI
Terminology:                   "microservices" (CV says "services")
Adjacent:                      AWS  ← CV has Azure + cloud-agnostic K8s
Hard gaps (downplayed):        <...>
```

---

## 4. Optimize (propose in batches, apply after approval)

Work top-down through the levers. For every change show the exact before/after
text and get approval before editing. Batch related changes (e.g. all of one
experience entry) to keep the number of round-trips small.

### 4.1 Summary first (highest weight)
Rewrite `Tagline.<lang>` and `Introduction.<lang>` so the vacancy's most
important technologies and requirements appear **early and in the vacancy's own
words** — each grounded in real experience. Keep it one coherent, human
profile; it must stand alone as a good summary even for a role with none of
these technologies.

### 4.2 Terminology alignment
Where the CV describes something the vacancy asks for, adopt the vacancy's
exact term (`microservices`, not "services"; the vendor's product name, not a
generic). Truthful synonyms are the cheapest wins — use them generously, but
only where the underlying fact is identical.

### 4.3 Ordering and prominence
- Reorder `[[Experience]]` so the best-matching role comes first (array order
  = render order). Present the proposed order.
- Within an entry, lead the `Task` list with the tasks that match the vacancy.
- Add truthfully-applicable keywords to an entry's `Keywords` list so the
  technology name renders next to the evidence.
- Add a keyword to a `[Skills]` category (and `[Keywords.*]` if missing) only
  if the person genuinely has it; **never raise a `Score`** beyond the honest
  self-assessment.

### 4.4 Bridging adjacent gaps (the similarity move)
For a wanted technology T the CV lacks, pick the closest technology S that the
CV **does** have, and phrase T's absence as a short, honest transfer note. The
pattern: *state S as evidence + one clause on the overlap + downplay ramp-up*.

Examples (adapt to language and context):
- Vacancy wants **.NET**, CV is deep Java:
  *"Twenty years of enterprise Java; the shift to .NET is a matter of weeks
  given the overlap in ecosystem, tooling, and architecture patterns."*
- Vacancy wants **AWS**, CV has Azure + Kubernetes:
  *"Cloud infrastructure experience on Azure with Kubernetes — platform
  choices that transfer directly to AWS."*

Rules:
- At most **one** such bridge per section, ideally one per page total.
- It must name the real technology S and say nothing that is untrue (no
  "AWS experience" — only "transfers to AWS").
- It must read like something a confident human candidate would write. No
  "fast learner" clichés, no "eager to learn X".

### 4.5 Downplaying hard gaps (comparison, then self-study)
Hard gaps are never claimed as experience — but they are not left completely
untouched either. For each hard gap, in this order of preference:

1. **Comparison (preferred).** Find the closest technology or practice the CV
   does have and downplay the gap by comparison: one short clause framing the
   gap as a small step from real experience. This is the 4.4 bridge pattern
   applied more modestly — the comparison target may be less directly related,
   so keep the claim small and concrete.
   - Vacancy wants **Rust**, CV is deep Java:
     *"Long experience with JVM performance tuning and manual resource
     management; the transition to Rust's ownership model is a small step."*
2. **Self-study note (fallback).** When nothing comparable exists, add a short
   sentence that the person studies the subject in their own time, e.g.
   *"Outside work I study Rust and build small projects with it."* Only use
   this if it is actually true — confirm with the user when unsure.

Rules:
- One note per hard gap, at most one line, placed where it reads naturally
  (Summary or the most relevant experience entry).
- Keep these notes in different sections from the 4.4 bridges so they don't
  pile up.
- Never list the gap technology as experience: no skill entry with a score, no
  "used X in production". Comparison and self-study wording only.

### 4.6 De-emphasis
Longer, older entries irrelevant to the vacancy can be shortened or moved down.
Never delete content the user wants to keep.

### 4.7 PDF metadata (last)
Add **ALL** the requirement and wish terms from the vacancy to the `keywords`
list in `cv.typ` — every technology, tool, and named requirement the vacancy
mentions, **regardless of the person's actual level of experience** with it.
Metadata is machine-readable, not part of the CV body: the no-fabrication
rules constrain the human-readable text, not this list. The body of the CV
must still only claim what is true; the keywords list may (and should) go
beyond that.

---

## 5. Verify

1. `make` must build both languages cleanly.
2. **Screening simulation:** re-read the final CV text (extracted from the PDF
   or the toml) against the vacancy requirement list. For each must-have,
   confirm it is now covered directly, via an adjacent bridge, or via a hard-gap
   downplay (comparison or self-study note), and report the coverage table to
   the user. Anything still uncovered is a hard gap — say so plainly.
3. Sanity-check the human-readable rule: read the modified sections aloud;
   flag anything that sounds engineered.
4. Commit the changes on the branch with a message like
   `tailor: <company> vacancy optimization`.

---

## Guardrails

- **Never fabricate the body.** The no-fabrication rules apply to the
  human-readable CV text (what a person sees): no invented skills, roles,
  durations, or projects, no inflated scores. A bridge sentence is only as
  true as technology S, and a self-study note is only valid if the person
  genuinely studies the subject. Machine-readable metadata (PDF keywords) is
  exempt — see 4.7.
- **No machine-steering in the body.** No meta commentary about the vacancy,
  no keyword walls, no duplicated terms to game matching. The vacancy's words
  appear in the body only where they are a natural, truthful description of
  real experience. Exception: the PDF metadata `keywords` list is explicitly
  allowed to carry all vacancy terms (step 4.7).
- **Confirm before editing.** Every file change is proposed and approved first.
- **Master is untouched.** All work happens on `cv/<slug>`; switching back to
  `master` restores the original CV.
- **Stay in scope.** Only modify files under `cv/`.
