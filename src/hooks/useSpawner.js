import { useState, useRef, useEffect, useCallback } from "react";
import { GAME_CONFIG, WINDOW_POSITIONS } from "../utils/constants";
import { CHARACTERS } from "../game/characters";

export function useSpawner(isPlaying, getElapsed) {
  const [activeWindows, setActiveWindows] = useState({});

  const despawnTimeoutsRef = useRef({});
  const bagRef = useRef([]);
  const spawnRef = useRef(null);

  const clearDespawnTimeouts = useCallback(() => {
    Object.values(despawnTimeoutsRef.current).forEach(clearTimeout);
    despawnTimeoutsRef.current = {};
  }, []);

  const getDifficulty = useCallback(() => {
    const elapsed = getElapsed();
    const levels = GAME_CONFIG.DIFFICULTY;
    for (let i = levels.length - 1; i >= 0; i--) {
      if (elapsed >= levels[i].after) return levels[i];
    }
    return levels[0];
  }, [getElapsed]);

  const scheduleDespawn = useCallback((windowId, spawnedAt, lifetime) => {
    const exitMs = GAME_CONFIG.EXIT_DURATION;
    despawnTimeoutsRef.current[windowId] = setTimeout(
      () => {
        setActiveWindows((prev) => {
          const character = prev[windowId];
          if (!character || character.hit || character.spawnedAt !== spawnedAt) {
            return prev;
          }
          return { ...prev, [windowId]: { ...character, leaving: true } };
        });
        despawnTimeoutsRef.current[windowId] = setTimeout(() => {
          delete despawnTimeoutsRef.current[windowId];
          setActiveWindows((prev) => {
            const character = prev[windowId];
            if (!character || character.hit || character.spawnedAt !== spawnedAt) {
              return prev;
            }
            const updated = { ...prev };
            delete updated[windowId];
            return updated;
          });
        }, exitMs);
      },
      Math.max(lifetime - exitMs, 0),
    );
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    let cancelled = false;

    const refillBag = () => {
      const bag = [];
      Object.entries(CHARACTERS).forEach(([type, cfg]) => {
        for (let i = 0; i < cfg.spawnWeight / 10; i++) bag.push(type);
      });
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      bagRef.current = bag;
    };

    const pickCharacter = (seenTypes) => {
      if (bagRef.current.length === 0) refillBag();
      const bag = bagRef.current;
      let idx = bag.findIndex((t) => !seenTypes.includes(t));
      if (idx === -1) idx = 0;
      return bag.splice(idx, 1)[0];
    };

    const spawnRound = () => {
      if (cancelled) return;
      const difficulty = getDifficulty();

      setActiveWindows((prev) => {
        const emptyIds = WINDOW_POSITIONS.map((w) => w.id).filter((id) => !prev[id]);
        if (emptyIds.length === 0) return prev;

        // Occupancy cap
        const activeCount = WINDOW_POSITIONS.length - emptyIds.length;
        const room = difficulty.maxActive - activeCount;
        if (room <= 0) return prev;

        const span = difficulty.maxSimultaneous - difficulty.minSimultaneous + 1;
        const count = Math.min(difficulty.minSimultaneous + Math.floor(Math.random() * span), room, emptyIds.length);
        const updated = { ...prev };
        const seenTypes = Object.values(prev)
          .filter((c) => !c.hit && !c.leaving)
          .map((c) => c.type);

        for (let i = 0; i < count; i++) {
          const idx = Math.floor(Math.random() * emptyIds.length);
          const windowId = emptyIds.splice(idx, 1)[0];
          const spawnedAt = Date.now();
          const fakeOut = difficulty.fakeOut && Math.random() < GAME_CONFIG.FAKEOUT_CHANCE;
          const lifetime = fakeOut ? GAME_CONFIG.FAKEOUT_LIFETIME : difficulty.lifetime * (0.85 + Math.random() * 0.3);
          const type = pickCharacter(seenTypes);
          seenTypes.push(type);
          updated[windowId] = { type, fakeOut, spawnedAt };
          scheduleDespawn(windowId, spawnedAt, lifetime);
        }
        return updated;
      });

      const nextIn = difficulty.spawnInterval * (0.7 + Math.random() * 0.6);
      spawnRef.current = setTimeout(spawnRound, nextIn);
    };

    spawnRef.current = setTimeout(spawnRound, GAME_CONFIG.INITIAL_SPAWN_DELAY);

    return () => {
      cancelled = true;
      clearTimeout(spawnRef.current);
      clearDespawnTimeouts();
    };
  }, [isPlaying, getDifficulty, scheduleDespawn, clearDespawnTimeouts]);

  const resetWindows = useCallback(() => {
    clearDespawnTimeouts();
    bagRef.current = [];
    setActiveWindows({});
  }, [clearDespawnTimeouts]);

  const resolveHit = (windowId) => {
    const character = activeWindows[windowId];
    if (!character || character.hit) return null;

    clearTimeout(despawnTimeoutsRef.current[windowId]);
    delete despawnTimeoutsRef.current[windowId];

    setActiveWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], hit: true },
    }));

    const spawnedAt = character.spawnedAt;
    setTimeout(() => {
      setActiveWindows((prev) => {
        const char = prev[windowId];
        if (char && char.spawnedAt === spawnedAt) {
          const updated = { ...prev };
          delete updated[windowId];
          return updated;
        }
        return prev;
      });
    }, GAME_CONFIG.HIT_REMOVE_DELAY);

    return character;
  };

  return { activeWindows, resetWindows, resolveHit };
}
