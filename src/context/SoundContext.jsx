import { useState, useEffect, useMemo } from "react";
import { SoundContext } from "./soundContextObject";
import { setSfxMuted, setMusicMuted } from "../utils/audio";

const KEYS = { sfx: "wab_sfx_muted", music: "wab_music_muted" };
const readMuted = (key) => localStorage.getItem(key) === "true";

export function SoundProvider({ children }) {
  // Persisted so a user's choice sticks across visits
  const [sfxMuted, setSfx] = useState(() => readMuted(KEYS.sfx));
  const [musicMuted, setMusic] = useState(() => readMuted(KEYS.music));

  useEffect(() => {
    setSfxMuted(sfxMuted);
    localStorage.setItem(KEYS.sfx, String(sfxMuted));
  }, [sfxMuted]);

  useEffect(() => {
    setMusicMuted(musicMuted);
    localStorage.setItem(KEYS.music, String(musicMuted));
  }, [musicMuted]);

  const value = useMemo(
    () => ({
      sfxMuted,
      musicMuted,
      toggleSfx: () => setSfx((m) => !m),
      toggleMusic: () => setMusic((m) => !m),
    }),
    [sfxMuted, musicMuted],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}
