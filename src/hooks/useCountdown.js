import { useState, useRef, useEffect, useCallback } from "react";
import { GAME_CONFIG } from "../utils/constants";

export function useCountdown(isPlaying, onExpire) {
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.GAME_DURATION);

  const timeLeftRef = useRef(timeLeft);
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, GAME_CONFIG.COUNTDOWN_TICK);
    return () => clearInterval(id);
  }, [isPlaying]);

  const resetCountdown = useCallback(() => setTimeLeft(GAME_CONFIG.GAME_DURATION), []);
  const subtractTime = useCallback((n) => setTimeLeft((prev) => Math.max(1, prev - n)), []);
  const getElapsed = useCallback(() => GAME_CONFIG.GAME_DURATION - timeLeftRef.current, []);

  return { timeLeft, resetCountdown, subtractTime, getElapsed };
}
