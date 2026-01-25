# Blog Specification

## Vision
A personal blog that serves as a creative playground where each post can be its own mini-application. Not just text - but interactive experiments, generative art, games, visualizations. A space to share both polished work and rough experiments.

## Core Principles

### 1. Per-Post Flexibility
Each post can be completely unique:
- Different visual styles and layouts
- Custom interactive components
- Full applications (Three.js scenes, games, tools)
- Or just simple text

The architecture supports this through Astro's islands - only the JavaScript needed for that specific post is loaded.

### 2. Minimal JavaScript by Default
Text posts ship zero JS. Interactive posts load only their specific dependencies. The shell (navigation, theme) is shared and lightweight.

### 3. Future-Proof
- Output is mostly static HTML
- Content in MDX (portable)
- Framework-agnostic islands (can use React, Vue, Svelte, vanilla)
- If Astro dies, content survives

### 4. Easy Workflow
Adding a post should be: create MDX file, write content, push. No complex build steps or configuration per-post.

## Current State (V1)

### Implemented
- [x] Astro + React + shadcn + Tailwind setup
- [x] Left sidebar navigation (Home, About, Blog, Projects, Resume)
- [x] Theme toggle with circle expansion View Transition
- [x] Content Collections with typed frontmatter
- [x] MDX support with component imports
- [x] 3 sample posts (text, interactive, custom styles)
- [x] Vercel deployment

### Pages
- **Home** - Featured/pinned posts
- **Blog** - Chronological post list
- **About** - Personal bio
- **Projects** - Project showcase
- **Resume** - Professional history

## Architecture Details

### Content Collections
Posts are defined in `src/content/config.ts`:
```typescript
{
  title: string,
  description: string,
  date: Date,
  tags: string[],
  pinned: boolean,  // Feature on homepage
  draft: boolean,   // Hide from production
}
```

### View Transitions
Using the View Transitions API for:
1. Smooth page navigation (automatic via Astro)
2. Theme toggle circle animation (custom CSS in global.css)

The circle effect works by:
1. Capturing click coordinates
2. Setting CSS custom properties `--toggle-x` and `--toggle-y`
3. Using `clip-path: circle()` animation on `::view-transition-new(root)`

### Theming
CSS variables approach:
- `:root` - Light theme values
- `.dark` - Dark theme overrides
- shadcn components use these variables automatically
- Theme preference stored in localStorage

## Future Roadmap

### V2 - Enhanced Content
- [ ] RSS feed
- [ ] Sitemap
- [ ] Search (Pagefind or similar)
- [ ] Comments (Giscus)
- [ ] Reading time estimates
- [ ] Table of contents for long posts

### V3 - Content System
- [ ] Content planning system (backlog management)
- [ ] Writing style skill/guidelines
- [ ] Auto-posting from content queue
- [ ] Cross-project idea collection

### V4 - Backend Features
- [ ] Cloudflare Workers/Durable Objects
- [ ] Multiplayer experiments
- [ ] Real-time features
- [ ] Agent integrations

### V5 - Per-Post Themes
- [ ] Per-post theme overrides in frontmatter
- [ ] Theme transition between posts
- [ ] Custom layout per post

See `ideas.md` for detailed feature ideas.
