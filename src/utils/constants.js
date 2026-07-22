export const WINDOW_POSITIONS = [
  // Top row
  { id: 0, left: 22.1, top: 24.3, width: 13.2, height: 15.4 },
  { id: 1, left: 43.3, top: 24.3, width: 13.1, height: 15.4 },
  { id: 2, left: 64.3, top: 24.3, width: 13.2, height: 15.4 },
  // Middle row
  { id: 3, left: 22.1, top: 47.1, width: 13.2, height: 15.2 },
  { id: 4, left: 43.3, top: 47.1, width: 13.1, height: 15.2 },
  { id: 5, left: 64.3, top: 47.1, width: 13.2, height: 15.2 },
  // Bottom row
  { id: 6, left: 22.1, top: 69.0, width: 13.2, height: 15.2 },
  { id: 7, left: 43.3, top: 69.0, width: 13.1, height: 15.1 },
  { id: 8, left: 64.3, top: 69.0, width: 13.2, height: 15.1 },
];

export const GAME_CONFIG = {
  GAME_DURATION: 45,
  WIN_SCORE: 12,
  MAX_LIVES: 3,
  PEACOCK_TIME_PENALTY: 3,
  FLASHBANG_DURATION: 2000,
  HAPPY_THRESHOLD: 6, // reunion faces turn happy at this score

  EXIT_DURATION: 160,

  // Timing (ms). HIT_REMOVE_DELAY, GAME_OVER_DELAY and REUNION_HEARTS_DELAY are
  // tied to CSS animation durations — change both together.
  COUNTDOWN_TICK: 1000,
  INITIAL_SPAWN_DELAY: 100,
  FAKEOUT_LIFETIME: 750,
  FAKEOUT_CHANCE: 0.25,
  HIT_SOUND_DELAY: 150,
  HIT_REMOVE_DELAY: 600,
  GAME_OVER_DELAY: 650,
  REUNION_SLIDE_DELAY: 50,
  REUNION_HEARTS_DELAY: 850,

  // Time-based difficulty stages
  DIFFICULTY: [
    { after: 0, spawnInterval: 545, minSimultaneous: 1, maxSimultaneous: 2, maxActive: 3, lifetime: 960, fakeOut: false },
    { after: 12, spawnInterval: 475, minSimultaneous: 1, maxSimultaneous: 3, maxActive: 4, lifetime: 880, fakeOut: true },
    { after: 25, spawnInterval: 450, minSimultaneous: 1, maxSimultaneous: 3, maxActive: 4, lifetime: 850, fakeOut: true },
  ],

};
