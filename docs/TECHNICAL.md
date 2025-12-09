# Technical Documentation

> **For AI Agents**: Check this file when working on dependencies, build configuration, performance, or platform requirements. Update this file when technical stack or requirements change.

## Technology Stack

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.2.0 | UI framework |
| react-dom | 19.2.0 | React DOM renderer |
| react-router-dom | 7.10.1 | Client-side routing |
| zustand | 5.0.9 | State management |
| tone | 15.1.22 | Web audio synthesis |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| vite | latest | Build tool (via rolldown-vite override) |
| typescript | 5.9.3 | Type checking |
| tailwindcss | 4.1.17 | CSS framework |
| eslint | 9.39.1 | Code linting |
| prettier | 3.7.4 | Code formatting |
| gh-pages | 6.2.0 | GitHub Pages deployment |

### Build Configuration

**Vite** (`vite.config.ts`)
- React plugin with Babel/oxc for Fast Refresh
- Tailwind CSS via `@tailwindcss/vite` plugin
- Base path: `/tonedoku/` for GitHub Pages

**TypeScript** (`tsconfig.app.json`)
- Target: ES2022
- Module: ESNext with bundler resolution
- Strict mode enabled
- No unused locals/parameters

**ESLint** (`eslint.config.js`)
- TypeScript ESLint recommended rules
- React Hooks plugin
- React Refresh plugin

## Platform Requirements

### Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### Device Support
- Desktop: Full support
- Tablet: Full support with touch
- Mobile: Touch-friendly interface

## Performance Requirements

| Metric | Target |
|--------|--------|
| Initial load | < 3 seconds |
| Audio latency | < 100ms |
| Animation FPS | 60 FPS |
| Bundle size | Minimize via Vite tree-shaking |

## Audio Requirements

### Tone.js Configuration

```typescript
// Piano Sampler
- Source: Tone.js Salamander piano samples
- Notes: C3-C5 range (2 octaves)
- Format: MP3

// Playback Timing
- Single note: 1-2 second sustained
- Scale sequence: 0.4 second per note (3.2s total for 8 notes)
- Error sound: 0.3 second duration
```

### Audio Context
- Lazy initialization on first user interaction
- Required for browser autoplay policy compliance
- Volume range: 0.0 to 1.0

## Data Storage

### localStorage Keys

| Key | Type | Purpose |
|-----|------|---------|
| `tonedoku-settings` | JSON | User preferences (audio, notation) |

### Storage Utilities
- `safeParseJSON()` - Parse with error handling
- `safeSetItem()` - Set with error handling
- Located in `src/utils/storage.ts`

## Deployment

### GitHub Pages

```bash
npm run deploy  # Builds and deploys to gh-pages branch
```

- Base URL: `https://[username].github.io/tonedoku/`
- Branch: `gh-pages`
- Build output: `dist/`

### Environment Configuration
- Development: `npm run dev` (Vite HMR on localhost)
- Production: `npm run build` (TypeScript + Vite production build)
- Preview: `npm run preview` (local production preview)

## TypeScript Configuration

### Strict Mode Settings
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true,
  "noUncheckedSideEffectImports": true
}
```

### Module Resolution
- Mode: `bundler`
- Allows `.ts` and `.tsx` extensions
- Path aliases: None configured (use relative imports)

## API Dependencies

### External Resources
- **Tone.js Samples**: Piano samples from `https://tonejs.github.io/audio/salamander/`
- No other external APIs

### Future API Considerations
- User accounts: Would require backend
- Cloud sync: Would require database
- Leaderboards: Would require backend

## Security Considerations

- No sensitive data stored
- No external API calls (except audio samples)
- localStorage only for user preferences
- No authentication in MVP
