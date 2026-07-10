import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { GAME_CONFIG, WINDOW_POSITIONS } from "../utils/constants";
import { CHARACTERS } from "../game/characters";
import { getLocalHits, getLocalReunions, addLocalHits, addLocalReunion } from "../utils/storage";
import { commitGameToFirebase } from "../services/firebaseStats";
import { playSound, startMusic } from "../utils/audio";
import { useCountdown } from "./useCountdown";
import { useSpawner } from "./useSpawner";

function useGameLogic() {
  const [gameState, setGameState] = useState("idle"); // idle | playing | gameover
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(GAME_CONFIG.MAX_LIVES);
  const [gameResult, setGameResult] = useState(null); // "win" | "timeout" | "divorced"
  const [flashbangActive, setFlashbangActive] = useState(false);
  const [flashbangOrigin, setFlashbangOrigin] = useState(null);
  const [sessionHits, setSessionHits] = useState(0);
  const [sessionReunions, setSessionReunions] = useState(0);
  const [localHits, setLocalHits] = useState(getLocalHits);
  const [localReunions, setLocalReunions] = useState(getLocalReunions);

  const hitsThisGameRef = useRef(0);
  const isGameOverRef = useRef(false);

  const isPlaying = gameState === "playing";

  const endGame = useCallback((result) => {
    if (isGameOverRef.current) return;
    isGameOverRef.current = true;
    setGameState("gameover");
    setGameResult(result);

    const won = result === "win";
    if (won) {
      setLocalReunions(addLocalReunion());
      setSessionReunions((r) => r + 1);
    }
    commitGameToFirebase({ hits: hitsThisGameRef.current, won });
    hitsThisGameRef.current = 0;
  }, []);

  const { timeLeft, resetCountdown, subtractTime, getElapsed } = useCountdown(isPlaying, () => endGame("timeout"));
  const { activeWindows, resetWindows, resolveHit } = useSpawner(isPlaying, getElapsed);

  const startGame = useCallback(() => {
    startMusic();
    setScore(0);
    setLives(GAME_CONFIG.MAX_LIVES);
    setGameResult(null);
    setFlashbangActive(false);
    setFlashbangOrigin(null);
    setSessionHits(0);
    hitsThisGameRef.current = 0;
    isGameOverRef.current = false;
    resetCountdown();
    resetWindows();
    setGameState("playing");
  }, [resetCountdown, resetWindows]);

  useEffect(() => {
    if (gameState !== "playing") return;
    const result = score >= GAME_CONFIG.WIN_SCORE ? "win" : lives <= 0 ? "divorced" : null;
    if (!result) return;
    const timer = setTimeout(() => endGame(result), GAME_CONFIG.GAME_OVER_DELAY);
    return () => clearTimeout(timer);
  }, [score, lives, gameState, endGame]);

  const actions = useMemo(
    () => ({
      scorePoint() {
        setScore((prev) => prev + 1);
        setSessionHits((h) => h + 1);
        hitsThisGameRef.current += 1;
        setLocalHits(addLocalHits(1));
      },
      loseLife() {
        setLives((prev) => prev - 1);
      },
      stealTime() {
        subtractTime(GAME_CONFIG.PEACOCK_TIME_PENALTY);
      },
      flashbang(windowId) {
        const win = WINDOW_POSITIONS.find((w) => w.id === windowId);
        if (win) {
          setFlashbangOrigin({ x: win.left + win.width / 2, y: win.top + win.height / 2 });
        }
        setFlashbangActive(true);
        setTimeout(() => setFlashbangActive(false), GAME_CONFIG.FLASHBANG_DURATION);
      },
    }),
    [subtractTime],
  );

  const hitWindow = (windowId) => {
    if (gameState !== "playing" || flashbangActive) return;

    const character = resolveHit(windowId);
    if (!character) return;

    const config = CHARACTERS[character.type];
    if (!config) return;

    playSound("whack");
    if (config.hitSound) {
      setTimeout(() => playSound(config.hitSound), GAME_CONFIG.HIT_SOUND_DELAY);
    }

    config.onHit(actions, windowId);
  };

  return {
    gameState,
    score,
    lives,
    timeLeft,
    gameResult,
    activeWindows,
    flashbangActive,
    flashbangOrigin,
    sessionHits,
    sessionReunions,
    localHits,
    localReunions,
    startGame,
    hitWindow,
  };
}

export default useGameLogic;
