# Ideas & Future Work

Collection of ideas for the blog. Add new ideas freely - they can be refined later.

## Content System

### Cross-Project Idea Collection
- Tool/script to scan other projects for potential blog topics
- Look for: interesting code patterns, solved problems, new learnings
- Could watch for certain file patterns or commit messages
- Integration with Claude Code to suggest: "This would make a good post"

### Auto-Posting Pipeline
- Content queue in a structured format (frontmatter ready)
- Agent that can draft posts from ideas
- Review workflow before publishing
- Scheduled publishing

### Writing Style Skill
- Define personal writing voice and tone
- Technical accuracy guidelines
- Code example standards
- Accessibility and readability checks
- Could be a Claude Code skill that reviews drafts

## Content Ideas

### Technical Posts
- [ ] How this blog is built (meta post)
- [ ] Astro islands architecture deep dive
- [ ] View Transitions API tutorial
- [ ] Building with shadcn/ui
- [ ] MDX component patterns

### Interactive Experiments
- [ ] Generative art piece
- [ ] Three.js / R3F scene
- [ ] Physics simulation
- [ ] Audio visualization
- [ ] Mini game

### Project Showcases
- [ ] (Add projects to showcase here)

## Feature Ideas

### Navigation & Discovery
- [ ] Tag-based filtering on blog list
- [ ] Related posts suggestions
- [ ] "Random post" button
- [ ] Reading progress indicator

### Interactivity
- [ ] Reactions/emoji on posts (lightweight, no auth)
- [ ] Code block copy button
- [ ] Interactive code playgrounds (like CodeSandbox embeds)
- [ ] Annotation/highlight system

### Performance & Analytics
- [ ] Core Web Vitals monitoring
- [ ] Privacy-respecting analytics (Plausible?)
- [ ] A/B testing for layouts

### Accessibility
- [ ] Screen reader testing
- [ ] Keyboard navigation audit
- [ ] Reduced motion support (already partially done)
- [ ] High contrast mode

### Backend (V4+)
- [ ] Cloudflare Workers for dynamic features
- [ ] Durable Objects for multiplayer
- [ ] Real-time cursor positions (like Figma)
- [ ] Collaborative drawing on posts
- [ ] Live coding sessions

### AI Integration
- [ ] Agent that summarizes long posts
- [ ] Auto-generated post metadata
- [ ] Suggested edits from Claude
- [ ] "Ask about this post" chat widget

## Design Ideas

### Visual Polish
- [ ] Custom code syntax theme
- [ ] Better typography scale
- [ ] Micro-interactions (hover states, etc.)
- [ ] Loading states/skeletons

### Per-Post Creativity
- [ ] Post-specific color schemes
- [ ] Custom cursors
- [ ] Background animations
- [ ] Sound design (opt-in)

## Infrastructure

### Dev Experience
- [ ] Post templates/scaffolding CLI
- [ ] Preview deploys with comments
- [ ] Lighthouse CI checks
- [ ] Visual regression testing

### Deployment
- [ ] Edge functions for dynamic features
- [ ] Image optimization pipeline
- [ ] CDN for assets

---

## How to Add Ideas

Just add them anywhere in this file. Use format:
```
### Category
- [ ] Idea description
```

Or for more detailed ideas:
```
### Idea Name
Description of the idea, why it's interesting, potential approaches.
```

Ideas can be promoted to `content-plan.md` when ready to work on.
