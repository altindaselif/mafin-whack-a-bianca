# 👋 #MAFIN — Whack A Bianca

> _Whack Bianca 12 times to reunite Marta and Fina — if the peacock, the cow, and Fina herself don't ruin it first._  
> A fan-made whack-a-mole for the _Sueños de Libertad_ fandom, with a live global hit counter, a real-time country leaderboard, and a fully data-driven game engine built on React 19.

---

## 🔗 Links

- **Live Site:** [View Live Demo](https://mafinesabianca.netlify.app/)
- **Code:** [View GitHub Repository](https://github.com/altindaselif/31-mafin-whack-a-bianca)

---

## 📸 Screenshots

- [View Desktop Version](./desktop-screenshot.png)
- [View Mobile Version](./mobile-screenshot.png)

---

## 🎭 What Is This?

A fan-made whack-a-mole where _Sueños de Libertad_ viewers whack the fictional villain **Bianca Forner** as she pops out of a barn window. Land **12 hits** and the estranged couple **Marta and Fina** finally reunite — but the barn is a trap. Hit **Fina** by mistake and you lose a life (three mistakes and they divorce), hit the **peacock** and it steals 3 seconds off the clock, hit the **sick cow** and it flashbangs the whole screen for 2 seconds. Every legitimate hit is counted, attributed to the player's country, and aggregated into a live global leaderboard. Fully playable in Spanish and English.

---

## 💡 Key Features

- **🐄 Data-Driven Game Engine:** Every character is a single entry in one config object (`game/characters.js`) — its sprites, spawn weight, hit sound, and on-hit effect. Adding a whole new enemy is one object literal, no branching logic anywhere else. Bianca scores a point, Fina costs a life, the peacock steals time, the cow triggers a flashbang — each is just a one-line `onHit` handler wired to a React-free `actions` facade.
- **🌍 Live Country Leaderboard:** Every hit is attributed to the player's country and synced to Firebase in real time. A paginated top-5 leaderboard — flippable via a 3D CSS card flip — shows which country is whacking the hardest, with flag emojis rendered from Unicode regional-indicator code points and country names localized on the fly through the `Intl.DisplayNames` API.
- **💞 The Reunion Meter:** A twin-vein progress meter fills toward a shared heart as you land hits, driven purely by CSS (`width` + `clip-path: inset()`), with the couple's faces swapping from sad → happy → in-love across score thresholds. On the 12th hit a phased animation slides Marta and Fina together for the reunion.
- **📈 Adaptive Difficulty & Shuffle-Bag Spawner:** Spawns ramp through time-based difficulty stages (faster intervals, shorter lifetimes, more simultaneous targets, occasional 750ms "fake-outs"). Character selection uses a Fisher-Yates **shuffle bag** so the mix stays fair instead of clumping, and an occupancy cap keeps the board readable.
- **📍 Geolocation with Fallback Chain:** Country detection runs through four independent APIs (Cloudflare trace, ipapi.co, country.is, freeipapi.com) in sequence, stopping at the first valid two-letter code. The result is cached in `localStorage` so return visits skip the chain entirely, and concurrent callers share a single in-flight promise.
- **🌐 Bilingual i18n (ES / EN):** Full Spanish and English support through a central `translations` module served by a React `LanguageContext`. Components pull copy with a tiny `useT("section")` hook and the active language with `useLang()` — no prop drilling, and leaderboard country names re-localize instantly on language switch.
- **🔒 Bot Protection:** Firebase App Check with reCAPTCHA Enterprise guards every database write, and all counter updates run as atomic transactions so concurrent players can never overwrite each other.
- **🔊 Zero-Lag Audio:** Sounds are managed in a plain-JavaScript `HTMLAudioElement` pool created once outside React and rewound on each play — so rapid-fire whacks never spawn `<audio>` elements or drop frames.
- **♿ Accessibility:** `aria-label`s on every interactive control, a labeled game region, and decorative sprites marked appropriately.

---

## 🛠️ Technical Implementation

### Composable Game Logic (Custom Hooks)

The game loop is split into three focused hooks instead of one monolith. `useCountdown` owns the clock (tick, reset, the peacock's time penalty, and elapsed-time for difficulty scaling). `useSpawner` owns the barn windows (the shuffle-bag spawn schedule, auto-despawn timers, and hit resolution). `useGameLogic` is a thin orchestrator that wires the two together, owns score/lives/status, and decides what each hit does. Each piece can be read — and reasoned about — on its own.

### Data-Driven Characters

`game/characters.js` is the single source of truth for the roster. The spawner builds its bag from each character's `spawnWeight`, `BarnWindow` reads sprites straight from the config, and a hit dispatches `CHARACTERS[type].onHit(actions, windowId)`. The `actions` facade (`scorePoint`, `loseLife`, `stealTime`, `flashbang`) lives inside the hook and closes over the state setters, which keeps `characters.js` completely free of React so it stays pure and portable.

### Per-Country & Global Firebase Transactions

At the end of a game the run is committed in one batch: `runTransaction(ref(db, "global_stats/hits"), v => (v || 0) + hits)` fires alongside a matching per-country transaction. Using transactions instead of `set()` means concurrent finishes from players in the same country retry automatically and never clobber one another.

### CSS 3D Card Flip for the Stats Panel

The stats panel flips between the personal counters and the global leaderboard using `transform-style: preserve-3d` and `rotateY(180deg)` with `backface-visibility: hidden` on each face. No JavaScript geometry — just a class toggle on the container.

### Declarative Win / Lose Detection

Hit handlers stay pure: they only bump score/lives. Win ("reunited") and loss ("divorced") are derived in an effect that watches those values, with a short delay so the final hit animation finishes before the overlay appears — keeping side effects out of state updaters.

### Bilingual i18n via React Context

Translations are grouped by UI section and served through `LanguageContext`. `useT(section)` returns the active-language slice as a stable module reference (no per-render object churn), and `useLang()` exposes `lang` / `setLang` for the language toggle.

### Geolocation Fallback Chain

Four geo APIs are tried in sequence inside a `for...of` loop with `try/catch`; each returns a two-letter country code or throws, and the loop breaks on the first valid response. The resolved code is cached in `localStorage`, so no visit after the first pays the lookup cost.

---

## 🧰 Built With

- **React 19** — composable custom hooks, Context for state
- **Vite** — dev server & build
- **CSS Modules** — scoped styles, 3D transforms, keyframe animations
- **Firebase Realtime Database** — atomic per-country and global hit counters
- **Firebase App Check** (reCAPTCHA Enterprise) — bot protection on writes
- **Intl.DisplayNames API** — zero-dependency localized country names
- **HTMLAudioElement pool** — lag-free game audio outside the React tree
- **ESLint** (flat config, react-hooks)

---

## 🎵 Credits

- **8-bit Mafin theme music:** by [@NVillaneve_23](https://x.com/NVillaneve_23) — a fan and piano teacher who made the chiptune arrangement herself. 💛

---

## ✍️ Author

- **LinkedIn:** [Elif Altındaş](https://www.linkedin.com/in/elifaltindas/)
- **Frontend Mentor:** [@altindaselif](https://www.frontendmentor.io/profile/altindaselif)
- **GitHub:** [@altindaselif](https://github.com/altindaselif)

---

_Disclaimer: This page is aimed solely at the fictional character Bianca Forner, not the actress Carolina Román._
