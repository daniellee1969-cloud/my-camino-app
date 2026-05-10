# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/` locally
- `npm run lint` — run ESLint over the repo (flat config)

There is no test runner configured.

## Architecture

This is a **single-page React 19 + Vite app** that serves as a personal trip companion for a Camino de Santiago itinerary (May 2026). The UI is in Traditional Chinese.

The entire app is one component, [src/App.jsx](src/App.jsx). There is no router and no component split — left column is a day picker, right column shows weather/elevation/lodging/highlights for the selected day.

### Where the trip data lives

All itinerary content is a hardcoded `ITINERARY` constant at the top of [src/App.jsx](src/App.jsx). Each day object has: `date`, `city`, `lat`/`lon`, `accommodation`, `phone`, `address`, `mapUrl`, `walkingDist`, `ascent`, `descent`, `elevation`, `desc`, `attractions[]`. **To add or edit days, edit this array** — there is no CMS or data file. `lat`/`lon` drives the weather fetch, so keep them accurate.

### Live weather

`fetchWeather` calls Open-Meteo's public API (`https://api.open-meteo.com/v1/forecast`) with no key. It runs on every `selectedDay` change and caches results in the `weatherData` state object keyed by day index. The endpoint returns *current* weather at those coordinates, not a forecast for the trip date — keep that in mind before "fixing" what looks like wrong dates.

`getWeatherDesc(code)` maps Open-Meteo's WMO weather codes to Chinese labels in coarse buckets.

## Stack notes

- **Tailwind v4** via `@tailwindcss/postcss` (see [postcss.config.js](postcss.config.js)). The most recent commit (`fix: tailwind v4 config`) was specifically a v4 setup fix — be careful about reintroducing v3 patterns. [tailwind.config.js](tailwind.config.js) is still present but v4 reads config from CSS by default.
- **Icons**: `lucide-react`. Import named icons from the package root.
- **JS, not TS**, despite `@types/react*` being in devDependencies.
- **ESLint flat config** ([eslint.config.js](eslint.config.js)) with `react-hooks` and `react-refresh/vite` plugins; `dist` is globally ignored.
