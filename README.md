# Wall Calendar — Interactive React Component

A polished, interactive wall calendar built with React. Inspired by a physical wall calendar aesthetic — complete with scenic hero images, date range selection, and a notes system.

---

## Features

- **Wall Calendar Aesthetic** — beautiful SVG landscape scenes (unique per month) with a physical calendar look including hanging rings
- **Month Navigation** — previous/next month buttons on the hero panel
- **Date Range Selector** — click a start date, hover to preview, click end date; clear with the ✕ button
- **Integrated Notes** — attach notes to a specific day, a date range, or the whole month; saved to localStorage so they persist across sessions
- **Note Indicators** — small dot on calendar cells that have saved notes
- **Fully Responsive** — side-by-side layout on desktop, stacked on mobile
- **Accessible** — keyboard navigation support, aria-labels

---

## Getting Started

### Prerequisites
- **Node.js** v16 or higher
- **npm** v7 or higher

Check your versions:
```bash
node --version
npm --version
```

### Install & Run

```bash
# 1. Navigate into the project folder
cd wall-calendar

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app opens automatically at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

The optimized build is output to the `build/` folder. You can deploy it to Vercel, Netlify, or GitHub Pages.

---

## Project Structure

```
wall-calendar/
├── public/
│   └── index.html              # HTML entry point (loads Google Fonts)
├── src/
│   ├── index.js                # React entry point
│   ├── App.js                  # Root app component
│   ├── hooks/
│   │   ├── useCalendar.js      # Calendar state: month, year, range selection
│   │   └── useNotes.js         # Notes state with localStorage persistence
│   ├── components/
│   │   ├── WallCalendar.js     # Main orchestrating component
│   │   ├── WallCalendar.css
│   │   ├── HeroPanel.js        # Top hero image (SVG scenes, month name, nav)
│   │   ├── HeroPanel.css
│   │   ├── CalendarGrid.js     # 7-column date grid with range highlighting
│   │   ├── CalendarGrid.css
│   │   ├── NotesPanel.js       # Notes input + saved notes list
│   │   ├── NotesPanel.css
│   │   ├── RangeInfo.js        # Banner showing current range selection
│   │   └── RangeInfo.css
│   └── styles/
│       └── global.css          # CSS variables, reset, body styles
└── package.json
```

---

## How to Use

| Action | Result |
|--------|--------|
| Click a date | Sets the range start |
| Hover after clicking | Previews the range in real time |
| Click a second date | Completes the range |
| Click the ✕ in the range bar | Clears the selection |
| Click the same date twice | Clears the selection |
| Type in the notes panel + Save | Attaches a note to range/day/month |
| ‹ / › buttons on hero | Navigate months |

**Keyboard shortcut**: `Ctrl+Enter` (or `Cmd+Enter`) in the notes textarea saves the note immediately.

---

## Tech Choices

- **React 18** with functional components and hooks only — no class components
- **CSS Modules approach** (per-component `.css` files) — no external CSS library needed
- **SVG scenes** — all hero imagery is hand-coded SVG (no external image assets required)
- **localStorage** — zero-backend notes persistence
- **Google Fonts** (DM Serif Display + DM Sans) — loaded from `public/index.html`

---

## Deployment (Vercel)

```bash
npm install -g vercel
npm run build
vercel --prod
```

Or connect your GitHub repository to [vercel.com](https://vercel.com) for automatic deploys on push.

---

Good luck!
