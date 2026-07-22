const SOUND_SOURCES = {
  whack: "./audios/audio-whack.mp3",
  bianca: "./audios/audio-esabianca.mp3",
  fina: "./audios/audio-amor.mp3",
};

const pool = {};
for (const [name, src] of Object.entries(SOUND_SOURCES)) {
  const audio = new Audio(src);
  audio.preload = "auto";
  pool[name] = audio;
}

let sfxMuted = false;
let musicMuted = false;

const music = new Audio("./audios/audio-8bit-theme.mp3");
music.loop = true;
music.volume = 0.25;
music.preload = "auto";
let musicStarted = false;

export function startMusic() {
  musicStarted = true;
  if (!musicMuted) music.play().catch(() => {});
}

export function setMusicMuted(value) {
  musicMuted = value;
  if (value) music.pause();
  else if (musicStarted) music.play().catch(() => {});
}

export function setSfxMuted(value) {
  sfxMuted = value;
}

export function playSound(name) {
  if (sfxMuted) return;
  const audio = pool[name];
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

// Pause the looping theme when the tab/app is backgrounded (phone lock,
// tab switch, minimise) and resume when it comes back — otherwise the
// music keeps playing behind other apps, which is what users complain about.
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      music.pause();
    } else if (musicStarted && !musicMuted) {
      music.play().catch(() => {});
    }
  });
}
