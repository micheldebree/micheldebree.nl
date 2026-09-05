---
description: Check for unread job openings in the email
---

IMPORTANT: you do not need to read the tagging rules. `notmuch tag` will apply
them.

IMPORTANT: do *NOT* use python or other custom scripting

## Step 1: Find unread job email id's

```bash
notmuch new
notmuch tag --batch --input="$HOME/.config/notmuch-tagging-rules"
notmuch search --output messages tag:jobs AND tag:unread
```

## Step 2: Read the first message

```bash
notmuch show --format json id:<id>
```

The `body` tag contains the body parts, each with its own `id`

## Step 3: Get body text

```bash
notmuch show --format raw --part=<part id>
```

## Step 4: Collect links

Append links to job openings to `leads.md`, along with a description found in
the email, if any

## Step 5: Suggest prompt improvements

If you learned anything that will improve this prompt to
be more efficient or effective, propose the improvements to the user.
