# CLAUDE.md - AI Assistant Guide for Riniel Birthday Website

## Project Overview

This is a personal birthday website project built for Riniel. It's a simple, playful Node.js/Express web application featuring:
- A home page with birthday greetings
- A secret page with additional content
- Background audio (happy birthday song)
- Custom styling with Baljeet-themed imagery

**Purpose**: Personal birthday greeting website with interactive elements and auto-playing audio.

## Tech Stack

- **Runtime**: Node.js (ES Modules enabled)
- **Framework**: Express.js 4.19.2
- **Template Engine**: Express-Handlebars 7.1.2
- **Environment Variables**: dotenv 16.4.5
- **Dev Tools**: nodemon 3.1.0

## Directory Structure

```
riniel-birthday-website/
├── src/
│   ├── index.js              # Main application entry point
│   ├── routes/
│   │   ├── route-handler.js  # Central router configuration
│   │   ├── home.js           # Home page route
│   │   ├── secret.js         # Secret page route
│   │   └── error.js          # 404/catch-all error route
│   └── views/
│       ├── layouts/
│       │   └── main.hbs      # Main layout template
│       ├── home.hbs          # Home page template
│       ├── secret.hbs        # Secret page template
│       └── error.hbs         # Error page template
├── public/
│   ├── css/
│   │   ├── defaults.css      # Global default styles
│   │   ├── home.css          # Home page styles
│   │   └── secret.css        # Secret page styles
│   ├── js/
│   │   └── home.js           # Client-side JavaScript
│   ├── img/                  # Image assets (Baljeet themed)
│   └── audio/
│       └── happy-birthday-song.mp3
├── package.json
├── .gitignore
├── .env                      # Environment variables (gitignored)
└── README.md
```

## Key Architecture Patterns

### 1. ES Modules
- The project uses ES modules (`"type": "module"` in package.json)
- Use `import/export` syntax, not `require/module.exports`
- Access dirname via `import.meta.dirname`

### 2. Path Aliases (Import Maps)
The package.json defines custom import aliases for cleaner imports:

```json
"imports": {
  "#/*": "./*",
  "#src/*": "./src/*",
  "#helpers/*": "./src/helpers/*",
  "#middleware/*": "./src/middleware/*",
  "#routes/*": "./src/routes/*",
  "#views/*": "./src/views/*"
}
```

**Usage Example**:
```javascript
// Use this:
import routes from '#routes/route-handler.js';

// Instead of:
import routes from './routes/route-handler.js';
```

**IMPORTANT**: Always include `.js` extension in imports when using path aliases.

### 3. Router Organization
- **Route Handler Pattern**: Central `route-handler.js` imports and registers all route modules
- **Router Order Matters**: Error route (catch-all `/:any`) must be registered LAST
- Each route file exports an Express Router instance

**Router Registration Order**:
1. `home.js` - Specific routes (`/`, `/home`)
2. `secret.js` - Specific routes (`/secret`)
3. `error.js` - Catch-all route (`/:any`) - MUST BE LAST

### 4. View Engine Configuration
- **Engine**: Handlebars (`.hbs` extension)
- **View Cache**: Disabled (`app.set('view cache', false)`) for development
- **Layout**: `main.hbs` is the default layout
- **Static Files**: Served under `/static` prefix

## Development Workflow

### Environment Setup
1. Ensure `.env` file exists (gitignored)
2. Install dependencies: `npm install`

### Available Scripts
```bash
npm start      # Production mode - runs node src/index.js
npm run dev    # Development mode - runs nodemon with auto-reload
npm test       # Not configured (placeholder)
```

### Port Configuration
- Default port: **3000**
- Override via `PORT` environment variable in `.env`

### Adding New Routes
1. Create route file in `src/routes/` (e.g., `new-page.js`)
2. Export Express Router with route definitions
3. Import in `src/routes/route-handler.js`
4. Register BEFORE the error router
5. Create corresponding `.hbs` template in `src/views/`

**Example**:
```javascript
// src/routes/new-page.js
import { Router } from 'express';
const router = Router();

router.get('/new-page', (req, res) => {
    res.render('new-page');
});

export default router;
```

### Adding New Views
1. Create `.hbs` file in `src/views/`
2. Include page-specific CSS via `<link>` tag or inline styles
3. Templates automatically use `main.hbs` layout
4. Access body content via `{{{body}}}` in layout

### Static Assets
- **CSS**: Place in `public/css/`
- **JavaScript**: Place in `public/js/`
- **Images**: Place in `public/img/`
- **Audio**: Place in `public/audio/`
- **URL Prefix**: All static assets served under `/static/` path

**Example**:
```html
<!-- In .hbs template -->
<link rel="stylesheet" href="/static/css/home.css">
<script src="/static/js/home.js"></script>
<img src="/static/img/example.jpg">
```

## Code Conventions

### Import Organization
Follow this order in all files:
1. Built-in Node.js modules
2. Third-party library imports
3. Local file imports using path aliases

**Example** (from `src/index.js:1-10`):
```javascript
// Builtin imports
import path from 'path';

// Library imports
import 'dotenv/config';
import express from 'express';
import exphbs from 'express-handlebars';

// Local file imports
import routes from '#routes/route-handler.js';
```

### File Naming
- **Routes**: Lowercase, hyphenated (e.g., `route-handler.js`)
- **Views**: Lowercase, `.hbs` extension
- **CSS**: Lowercase, hyphenated
- **JavaScript**: Lowercase, camelCase for variables

### Router Pattern
Each route file should:
1. Import `Router` from Express
2. Create router instance
3. Define route handlers
4. Export router as default

## Important Notes for AI Assistants

### 1. Personal Project Context
This is a **personal birthday website** with playful, informal content. The tone is casual and fun, not professional/corporate.

### 2. Audio Feature
- Main layout includes auto-playing background audio (`src/views/layouts/main.hbs:10-13`)
- Users are advised to turn on audio (per README)
- Consider browser autoplay policies when modifying audio features

### 3. Route Order Critical
The error route in `src/routes/error.js` catches ALL unmatched routes (`/:any`). It MUST be registered last in `route-handler.js`, otherwise it will intercept other routes.

### 4. No Middleware Directory Yet
While path aliases include `#middleware/*`, no middleware directory currently exists. Consider this when adding authentication or other middleware.

### 5. No Testing Setup
Tests are not configured. The test script is a placeholder that exits with error.

### 6. Environment Variables
- `.env` file is gitignored
- Only `PORT` is currently used
- Always check for `.env` existence when troubleshooting environment issues

### 7. Static Path Prefix
All static assets MUST use `/static/` prefix (configured in `src/index.js:24`):
```javascript
app.use('/static', express.static(publicDirectoryPath));
```

### 8. Handlebars Triple Braces
The layout uses `{{{body}}}` (triple braces) to render unescaped HTML from child templates. This is intentional for proper HTML rendering.

### 9. Development Mode
For development work, always use `npm run dev` to enable nodemon auto-reload functionality.

### 10. Image Assets Theme
The project uses Baljeet-themed images (character from Phineas and Ferb). This is intentional and part of the personal nature of the site.

## Common Tasks

### Add a New Page
1. Create route: `src/routes/my-page.js`
2. Create view: `src/views/my-page.hbs`
3. (Optional) Create styles: `public/css/my-page.css`
4. Register route in `src/routes/route-handler.js` BEFORE error route
5. Test with `npm run dev`

### Modify Styling
1. Global styles: Edit `public/css/defaults.css`
2. Page-specific: Edit corresponding CSS file in `public/css/`
3. Layout modifications: Edit `src/views/layouts/main.hbs`

### Change Audio
1. Replace `public/audio/happy-birthday-song.mp3`
2. Or modify `src/views/layouts/main.hbs` to reference new audio file

### Add Client-Side Interactivity
1. Create/edit JavaScript in `public/js/`
2. Reference in view template with `/static/js/` prefix
3. Ensure proper DOM ready state handling

## Git Workflow

### Branch Strategy
- Development work done on feature branches prefixed with `claude/`
- Branch naming: `claude/claude-md-{sessionId}`
- Always push to designated branch, never directly to main

### Commit Guidelines
- Write clear, descriptive commit messages
- Focus on "why" rather than "what"
- Keep commits atomic and focused

### Important Git Notes
- `.env` is gitignored - never commit environment files
- `node_modules/` is gitignored - never commit dependencies
- Always verify what's staged before committing

## Debugging Tips

### Server Won't Start
1. Check if port 3000 is already in use
2. Verify `.env` file exists (if using custom PORT)
3. Ensure `node_modules` is installed (`npm install`)
4. Check for syntax errors in recent changes

### Route Not Working
1. Verify route is registered in `route-handler.js`
2. Check route order (error route must be last)
3. Ensure template file exists in `src/views/`
4. Check for typos in route path

### Static Assets 404
1. Verify `/static/` prefix in template URLs
2. Check file exists in `public/` directory
3. Ensure path case matches exactly (Linux is case-sensitive)

### Template Not Rendering
1. Check template syntax (Handlebars)
2. Verify `.hbs` extension
3. Ensure template is in `src/views/` directory
4. Check for errors in layout file

## Version Information

- **Node.js**: Requires ES modules support (Node 14+)
- **Current Version**: 1.0.0
- **Last Updated**: November 2025

---

## Questions or Issues?

When making changes:
1. Always test locally with `npm run dev`
2. Verify all routes still work
3. Check browser console for JavaScript errors
4. Ensure audio still plays (if that feature is important)
5. Test the error page by visiting invalid routes

This is a simple, personal project - keep changes lightweight and maintain the playful tone!
