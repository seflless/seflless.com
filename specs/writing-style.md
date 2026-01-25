# Writing Style Guide

Guidelines for maintaining consistent voice and quality across all content.

## Voice Principles

### Be Useful First

Every piece should leave the reader with something:
- A new understanding
- A technique they can apply
- A perspective shift
- A reference they'll return to

**Ask before publishing:** "If I were the reader, would I bookmark this?"

### Show, Don't Just Tell

- Include working code, not just descriptions
- Screenshots > words for UI
- Demos > explanations for interactions
- Real examples > abstract concepts

### Earn Personal Stories

Personal anecdotes are powerful but must be earned:

**Good use of personal story:**
"I spent a week debugging this issue, and the fix was embarrassingly simple. Here's what I learned so you don't have to."
→ The story serves the reader's learning

**Bad use of personal story:**
"I've been coding for 15 years and have worked at many companies."
→ Credentialing that doesn't help the reader

**Rule:** Your story should create empathy or context, not just establish authority.

### Technical Accuracy > Simplification

Don't dumb things down to the point of being wrong. Instead:
- Start with the accurate version
- Add explanatory layers
- Link to deeper resources
- Acknowledge when you're simplifying

### Opinions Are Good (When Earned)

Strong opinions make content memorable. But:
- Show your reasoning
- Acknowledge tradeoffs
- Be open to being wrong
- Don't be contrarian just for attention

---

## Structure Guidelines

### Post Anatomy

```
[Hook - Why should I read this?]
[Context - What do I need to know?]
[Meat - The actual content]
[Takeaways - What should I remember?]
[Next steps - What can I do now?]
```

### Hook Formulas

**Problem-first:**
"Have you ever spent hours trying to X, only to discover Y?"

**Counterintuitive:**
"Everything you've read about X is wrong. Here's why."

**Promise:**
"After reading this, you'll be able to X in Y minutes."

**Story:**
"Last week I broke production with a one-line change..."

### Headings

- Use questions as headers (readers scan for their question)
- Keep hierarchy consistent (H2 for sections, H3 for subsections)
- Front-load keywords (helps skimming)

### Code Blocks

- Always specify language for syntax highlighting
- Keep examples minimal but complete
- Add comments for non-obvious parts
- Include output when helpful

### Length Guidelines

| Type | Target Length | Notes |
|------|---------------|-------|
| Quick tip | 300-500 words | One idea, get in/out |
| Standard post | 800-1500 words | Most posts |
| Deep dive | 2000-3000 words | Comprehensive guides |
| Tutorial | Variable | As long as needed, well-structured |

---

## Editing Checklist

### First Pass: Structure
- [ ] Does the hook grab attention?
- [ ] Is the promise clear?
- [ ] Are sections in logical order?
- [ ] Can readers skip to what they need?

### Second Pass: Clarity
- [ ] Remove jargon or define it
- [ ] Shorten sentences where possible
- [ ] Cut redundant words
- [ ] Check that examples are clear

### Third Pass: Voice
- [ ] Does it sound like me?
- [ ] Am I being preachy?
- [ ] Are personal stories earning their place?
- [ ] Is the tone appropriate for the topic?

### Final Pass: Polish
- [ ] Spelling and grammar
- [ ] Links work
- [ ] Code runs
- [ ] Images have alt text
- [ ] Metadata is complete

---

## Common Pitfalls

### Avoid These

**The Disclaimer Dump**
"Before we start, I should mention that this might not work for everyone, and there are many other approaches, and I'm not an expert, but..."
→ Just get to the point. Readers assume you're sharing your perspective.

**The History Lesson**
"To understand X, we must first go back to 1973 when..."
→ Only include history if it directly helps understanding.

**The Feature List**
"X has these features: A, B, C, D, E, F, G..."
→ Curate. What's actually useful to know?

**The Hedge Overload**
"Maybe, perhaps, in some cases, it could be argued that..."
→ Take a position. It's more useful.

**The Humble Brag**
"I don't want to brag, but when I was at [Famous Company]..."
→ Either the information is relevant or it isn't.

### Watch For

- **Passive voice** - "Mistakes were made" → "I made mistakes"
- **Weasel words** - "Some people think" → "I think" or "[Source] says"
- **Unnecessary qualifiers** - "Very unique" → "unique"
- **Clichés** - "At the end of the day" → [delete]

---

## Formatting Standards

### Emphasis

- **Bold** for key terms on first use
- *Italics* for emphasis in sentences
- `code` for anything technical
- "Quotes" for quoting others

### Lists

Use bullets for:
- Unordered collections
- Features/attributes
- Quick references

Use numbers for:
- Sequential steps
- Ranked items
- Counted things

### Links

- Link descriptive text, not "click here"
- External links open in new tab
- Include link context when not obvious
- Prefer permanent URLs

### Images

- Always include alt text
- Caption when context needed
- Compress for web
- Use consistent sizing

---

## Feedback & Improvement

### Self-Review Questions

After each post:
1. What was I trying to say?
2. Did I say it clearly?
3. What would I cut?
4. What's missing?
5. Would I share this if someone else wrote it?

### Getting Feedback

Good feedback questions:
- "Where did you get confused?"
- "What would you cut?"
- "What questions weren't answered?"
- "Did the hook work for you?"

Bad feedback questions:
- "Was it good?" (too vague)
- "Should I publish this?" (yes/no doesn't help)

### Building the Muscle

Writing improves with volume. Track:
- Words written per week
- Posts published per month
- Time from idea to published
- Editing rounds per post

---

## Future: AI Writing Review

_Placeholder for Claude Code skill that reviews drafts_

**Potential checks:**
- Voice consistency with past posts
- Clarity score
- Jargon detection
- Structure analysis
- Headline effectiveness
- SEO basics
- Accessibility review

**Review prompt template:**
```
Review this draft against my writing style guide:
- Is the hook effective?
- Are personal stories earning their place?
- What would you cut?
- Where is clarity lacking?
- Does it match my voice?
```
