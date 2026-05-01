# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a GitHub issue, reporting a bug, or requesting a feature | issue-creation | C:\Users\kevin\.config\opencode\skills\issue-creation\SKILL.md |
| When creating a pull request, opening a PR, or preparing changes for review | branch-pr | C:\Users\kevin\.config\opencode\skills\branch-pr\SKILL.md |
| Creates new AI agent skills following the Agent Skills spec | skill-creator | C:\Users\kevin\.config\opencode\skills\skill-creator\SKILL.md |
| When writing Go tests, using teatest, or adding test coverage | go-testing | C:\Users\kevin\.claude\skills\go-testing\SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review" | judgment-day | C:\Users\kevin\.config\opencode\skills\judgment-day\SKILL.md |
| When the orchestrator launches you to onboard a user through the full SDD cycle | sdd-onboard | C:\Users\kevin\.config\opencode\skills\sdd-onboard\SKILL.md |
| When the orchestrator launches you to archive a change after implementation and verification | sdd-archive | C:\Users\kevin\.config\opencode\skills\sdd-archive\SKILL.md |
| When the orchestrator launches you to validate a completed change | sdd-verify | C:\Users\kevin\.config\opencode\skills\sdd-verify\SKILL.md |
| When the orchestrator launches you to implement one or more tasks from a change | sdd-apply | C:\Users\kevin\.config\opencode\skills\sdd-apply\SKILL.md |
| When the orchestrator launches you to create or update the task breakdown for a change | sdd-tasks | C:\Users\kevin\.config\opencode\skills\sdd-tasks\SKILL.md |
| When the orchestrator launches you to write or update the technical design for a change | sdd-design | C:\Users\kevin\.config\opencode\skills\sdd-design\SKILL.md |
| When the orchestrator launches you to write or update specs for a change | sdd-spec | C:\Users\kevin\.config\opencode\skills\sdd-spec\SKILL.md |
| When the orchestrator launches you to create or update a proposal for a change | sdd-propose | C:\Users\kevin\.claude\skills\sdd-propose\SKILL.md |
| When the orchestrator launches you to think through a feature, investigate the codebase, or clarify requirements | sdd-explore | C:\Users\kevin\.config\opencode\skills\sdd-explore\SKILL.md |

## Project Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating Angular projects, components, services, or for best practices on reactivity, forms, DI, routing, SSR, a11y, animations, styling, testing, or CLI tooling | angular-developer | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\angular-developer\SKILL.md |
| Use when creating projects, components, or services, or for best practices on reactivity (signals, linkedSignal, resource), forms, dependency injection, routing, SSR, accessibility (ARIA), animations, styling (component styles, Tailwind CSS), testing, or CLI tooling | reference-signal-forms | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\reference-signal-forms\SKILL.md |
| Master TypeScript's advanced type system including generics, conditional types, mapped types, template literals, and utility types | typescript-advanced-types | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\typescript-advanced-types\SKILL.md |
| Provides comprehensive Tailwind CSS utility-first styling patterns including responsive design, layout utilities, flexbox, grid, spacing, typography, colors | tailwind-css-patterns | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\tailwind-css-patterns\SKILL.md |
| Build production-ready Express.js servers with middleware, authentication, routing, and database integration | nodejs-express-server | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\nodejs-express-server\SKILL.md |
| Build robust Node.js servers with best practices for structure, error handling, security, and performance | nodejs-backend-patterns | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\nodejs-backend-patterns\SKILL.md |
| Node.js best practices for production applications: project structure, error handling, security, performance optimization | nodejs-best-practices | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\nodejs-best-practices\SKILL.md |
| Audit and improve web accessibility following WCAG 2.2 guidelines: "improve accessibility", "a11y audit", "WCAG compliance" | accessibility | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\accessibility\SKILL.md |
| Create distinctive, production-grade frontend interfaces with high design quality: build web components, pages, dashboards, React components | frontend-design | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\frontend-design\SKILL.md |
| Optimize for search engine visibility: "improve SEO", "optimize for search", "fix meta tags", "add structured data" | seo | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\seo\SKILL.md |
| PR review workflows and code review best practices | pr_review | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\pr_review\SKILL.md |
| Angular development writing guide for documentation and code comments | adev-writing-guide | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\adev-writing-guide\SKILL.md |
| Reference for Angular compiler CLI: ngc, tsc, and build configuration | reference-compiler-cli | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\reference-compiler-cli\SKILL.md |
| Reference for Angular core concepts: change detection, dependency injection, zones, signals | reference-core | C:\Users\kevin\Desktop\proyects\my-store-font-end\.agents\skills\reference-core\SKILL.md |

## Compact Rules

### angular-developer
- Use Angular CLI for scaffolding: `ng generate component|service|pipe|directive`
- Standalone components by default (no NgModules in Angular 17+)
- Use `inject()` function instead of constructor injection for services
- Signal-based inputs/outputs: `input<type>()`, `output<type>()`
- Always run `ng build` after generating code to verify no errors
- Use `withComponentInputBinding()` for route parameter binding
- Preload all modules: `withPreloading(PreloadAllModules)`

### typescript-advanced-types
- Use generics for reusable type-safe functions: `function identity<T>(value: T): T`
- Generic constraints: `<T extends HasLength>` to limit allowed types
- Mapped types: `{ [K in keyof T]: T[K] }` for transforming types
- Conditional types: `T extends string ? string : never`
- Template literal types: `` type EventName = `on${Capitalize<T>}` ``
- Utility types: `Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`

### tailwind-css-patterns
- Mobile-first responsive: `class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"`
- Flexbox centering: `flex items-center justify-center`
- Spacing scale: `p-4` (1rem), `m-8` (2rem), `gap-6` (1.5rem)
- Breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px
- Dark mode: `class="bg-white dark:bg-gray-900"` (requires `darkMode: 'class'`)
- Hover/focus: `hover:bg-blue-700 focus:ring-2 focus:ring-blue-500`

### reference-signal-forms
- Single source of truth: `WritableSignal<T>` holds the value, form is a view/proxy
- Access nested fields via Proxy: `myForm.user.name` (no FormGroups needed)
- Validation via schemas: `apply(schema, form)` separates structure from rules
- Bind to DOM with `[formField]` directive
- `FieldNode` aggregates: validationState, nodeState (touched/dirty), metadataState

### nodejs-express-server
- Use `express.json()` and `express.urlencoded()` middleware for body parsing
- Error handling: wrap async routes with `catchAsync` or use `next(error)`
- Structure: `app.use('/api/v1', router)` for API versioning
- Environment config: `const PORT = process.env.PORT || 3000`
- Health check endpoint: `app.get('/health', (req, res) => { res.json({status: 'OK'}) })`

### nodejs-backend-patterns
- Three-layer architecture: Controllers → Services → Repositories
- Use dependency injection for testability (pass dependencies as parameters)
- Centralized error handling middleware (last middleware in chain)
- Use `helmet` for security headers, `cors` for cross-origin requests
- Log with structured logging (Winston/Pino) instead of console.log

### nodejs-best-practices
- Never use `eval()`, `new Function()`, or dynamic require and imperatively opt into strict mode
- Use `const` > `let` > `var` (no var except for hoisting edge cases)
- Async/await over Promise chains; always await or return promises
- Use `Array.isArray()` for arrays, `{}.toString.call()` for others
- Handle errors with `try-catch` or `.catch()`; never leave promises unhandled
- Set `NODE_ENV=production` and use `pm2` or `cluster` for scalability

### accessibility
- Images: always add `alt` text (empty `alt=""` for decorative images)
- Forms: associate labels with inputs using `for`/`id` or wrapping `<label>`
- Keyboard: all interactive elements must be focusable and operable without mouse
- ARIA: use `role`, `aria-label`, `aria-describedby` only when HTML semantics insufficient
- Color contrast: 4.5:1 for normal text, 3:1 for large text (WCAG AA)
- Semantic HTML: use `<nav>`, `<main>`, `<article>`, `<button>` instead of `<div onclick>`

### frontend-design
- Choose a BOLD aesthetic direction: minimalist, maximalist, brutalist, retro-futuristic
- Typography: avoid Inter/Arial; use distinctive font pairings (display + body)
- Colors: dominant palette with sharp accents; avoid purple gradients on white
- Motion: CSS-only animations preferred; use scroll-triggered and hover micro-interactions
- Layout: asymmetry, overlap, diagonal flow, grid-breaking elements
- NEVER use generic AI aesthetics: Inter fonts, purple gradients, predictable patterns

### seo
- Title tags: unique, descriptive, 50-60 characters, include primary keyword
- Meta description: 120-160 characters, compelling, includes call-to-action
- Headings: single H1 per page, logical H2-H6 hierarchy
- URLs: descriptive, hyphens not underscores, lowercase, no query strings for static pages
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url` for social sharing
- Structured data: JSON-LD format, WebPage/Product/Article schema types

### pr_review
- Review for: correctness, security vulnerabilities, performance issues, code style
- Check test coverage for new functionality
- Verify documentation updates if API/public interface changed
- Look for hardcoded secrets, SQL injection, XSS vulnerabilities
- Suggest improvements with specific code examples

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| None found | - | No AGENTS.md, CLAUDE.md, .cursorrules, or GEMINI.md detected |

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
