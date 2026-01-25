# Testing Strategy

## Overview

Tests ensure:
1. **Links don't break** - All internal links return 200
2. **Content doesn't change unexpectedly** - HTML snapshots catch accidental changes
3. **Visual consistency** - Screenshot comparison catches CSS/layout regressions
4. **Post integrity** - Required elements are present

## Running Tests

```bash
# Run all tests
npm test

# Just link validation
npm run test:links

# Just snapshot tests
npm run test:snapshots

# Update snapshots (when intentional changes)
npm run test:update
```

## Test Types

### 1. Link Validation (`tests/links.spec.ts`)

**What it does:**
- Crawls all pages defined in `PAGES_TO_CHECK`
- Collects all internal links
- Verifies each returns HTTP 200
- Saves link registry to `__snapshots__/links.json`

**When it fails:**
- A link points to a non-existent page
- A page was renamed/removed without updating links

**Maintaining:**
- Add new pages to `PAGES_TO_CHECK` array when created

### 2. HTML Snapshots (`tests/snapshots.spec.ts`)

**What it does:**
- Captures `<main>` content of each post
- Normalizes (removes dynamic attributes)
- Compares against saved snapshot
- Fails if content changed

**When it fails:**
- Post content changed without updating snapshot
- Global component change affected post

**Maintaining:**
- Run `npm run test:update` after intentional changes
- Add new posts to `POSTS_TO_SNAPSHOT` when they're "locked in"

### 3. Visual Snapshots

**What it does:**
- Takes full-page screenshots
- Compares against baseline
- Allows 1% pixel difference (anti-aliasing)

**When it fails:**
- CSS changed affecting layout
- Theme changes affected appearance
- Font loading issues

**Maintaining:**
- Run `npx playwright test --update-snapshots` for visual updates
- Review screenshot diffs carefully before accepting

### 4. Post Integrity Checks

**What it does:**
- Verifies required elements exist (h1, time, back link)
- Specific content checks for known posts

**When it fails:**
- Post structure changed
- Required element removed

## Snapshot Files

```
__snapshots__/
├── links.json           # Registry of all links found
├── html/                # HTML content snapshots
│   ├── blog-hello-world.html
│   └── ...
└── snapshots.spec.ts-snapshots/  # Visual snapshots (Playwright managed)
    ├── index.png
    └── ...
```

## CI Integration

Tests run on every PR. The workflow:

1. Build the site
2. Start preview server
3. Run Playwright tests
4. Fail PR if any test fails

## Per-Post Theme Isolation (Future)

### The Problem
Global theme changes could affect old posts. We want posts to be "frozen" visually once published.

### Proposed Solution

1. **Snapshot themes per post**
   - Store theme variables used when post was published
   - Load those variables when rendering old posts

2. **Scoped CSS**
   - Each post gets scoped styles
   - Global changes don't cascade into old posts

3. **Explicit update workflow**
   - To update an old post's theme, run a command
   - This updates the snapshot and is explicit

### Implementation Approach

```typescript
// In frontmatter
---
title: "My Post"
themeSnapshot: "2025-01-25"  // Lock to theme as of this date
---
```

```typescript
// In content config
themeSnapshot: z.string().optional(),
```

The build process would:
1. Check for `themeSnapshot` in frontmatter
2. If present, load theme variables from that snapshot
3. Apply as scoped CSS to the post

Theme snapshots would be stored in:
```
__snapshots__/
├── themes/
│   ├── 2025-01-25.json  # Theme variables at this point
│   └── ...
```

## Adding Tests for New Posts

When you add a new post that should be "locked in":

1. Add the URL to `POSTS_TO_SNAPSHOT` in `tests/snapshots.spec.ts`
2. Run `npm run test:update` to create initial snapshots
3. Commit the new snapshot files
4. Optionally add specific content checks to "Post Content Integrity" test

## Troubleshooting

### "Snapshot mismatch" but content looks the same
- Check for whitespace differences
- Check for dynamic content that wasn't filtered
- Run with `--update-snapshots` if change is intentional

### "Element not found" errors
- Page structure may have changed
- Check if selectors need updating

### Visual diff too large
- May indicate font loading issues
- May indicate animation timing issues
- Wait longer for page load or disable animations

### External link tests failing
- External links are skipped in CI
- Run manually: `npx playwright test --grep "external links"`
- External services may be temporarily down
