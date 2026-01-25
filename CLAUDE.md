# Francois Laberge's Personal Blog

## Quick Start
```bash
npm run dev     # Start dev server at localhost:4321
npm run build   # Production build
```

## Project Overview
Personal blog built with **Astro + React islands + shadcn/ui + Tailwind**. Key principle: each post can be its own creative playground while sharing navigation and theme.

## Architecture
- **Astro** - Static site generator with islands architecture
- **React** - For interactive components (hydrates only where needed)
- **shadcn/ui** - Component library (buttons, cards, etc.)
- **Tailwind CSS 4** - Styling with CSS variables for theming
- **MDX** - Rich content with components in markdown
- **View Transitions API** - Smooth page transitions + circle theme toggle

## Directory Structure
```
src/
├── components/        # React components
│   ├── ui/           # shadcn components
│   └── *.tsx         # Custom components (Counter, ThemeToggle)
├── content/blog/     # MDX posts (add new posts here)
├── layouts/          # Page layouts (BaseLayout.astro)
├── pages/            # Routes (index, about, blog, projects, resume)
└── styles/           # Global CSS + Tailwind config
specs/                # Documentation, ideas, content planning
```

## Adding a New Post
Create `src/content/blog/my-post.mdx`:
```mdx
---
title: "Post Title"
description: "Short description"
date: 2025-01-25
tags: ["tag1", "tag2"]
pinned: false        # Set true to feature on homepage
draft: false         # Set true to hide from production
---

# Content here

Use React components with `client:load`:
import { Counter } from "@/components/Counter";
<Counter client:load />
```

## Adding Interactive Components
1. Create component in `src/components/MyComponent.tsx`
2. Import in MDX with `import { MyComponent } from "@/components/MyComponent"`
3. Use with hydration directive: `<MyComponent client:load />`

Hydration options:
- `client:load` - Hydrate immediately on page load
- `client:idle` - Hydrate when browser is idle
- `client:visible` - Hydrate when component enters viewport

## Theme System
- Light/dark toggle in sidebar with circle expansion animation
- Uses CSS variables in `global.css` (`:root` for light, `.dark` for dark)
- Theme persisted in localStorage

## Key Files
- `src/layouts/BaseLayout.astro` - Main layout with nav + View Transitions
- `src/components/ThemeToggle.tsx` - Theme toggle with circle animation
- `src/content/config.ts` - Content Collection schema (post frontmatter types)
- `src/styles/global.css` - Tailwind + theme variables + view transition CSS

## Deployment
Deployed to Vercel via GitHub integration. Push to main to deploy.

## Documentation
See `specs/` directory for:
- `README.md` - Vision, goals, architecture details
- `ideas.md` - Future features and content ideas
- `content-plan.md` - Content planning and backlog

## Writing Guidelines
(Future: writing style skill to be added)
- Clear, concise technical writing
- Code examples where helpful
- Personal voice encouraged
