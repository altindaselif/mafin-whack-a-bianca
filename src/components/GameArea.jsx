import { useMemo } from "react";
import Barn from "./Barn";
import GameHUD from "./GameHUD";
import StartOverlay from "./StartOverlay";
import GameOverOverlay from "./GameOverOverlay";
import styles from "./GameArea.module.css";

function GameArea({ game }) {
  const { gameState, score, lives, timeLeft, gameResult, activeWindows, flashbangActive, flashbangOrigin, startGame, hitWindow } = game;

  const isGameScreen = gameState === "playing";

  const smokeStyle = useMemo(
    () => ({
      left: `${flashbangOrigin?.x ?? 50}%`,
      top: `${flashbangOrigin?.y ?? 50}%`,
    }),
    [flashbangOrigin?.x, flashbangOrigin?.y],
  );

  const renderOverlay = () => {
    switch (gameState) {
      case "idle":
        return <StartOverlay onStart={startGame} />;
      case "playing":
        return <GameHUD score={score} lives={lives} timeLeft={timeLeft} />;
      case "gameover":
        return <GameOverOverlay result={gameResult} onRestart={startGame} />;
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.gameArea} ${isGameScreen ? styles.playing : ""}`} role="group" aria-label="Whack-a-Bianca">
      <Barn
        image={isGameScreen ? "./images/barn-game.webp" : "./images/barn-start-score.webp"}
        showWindows={isGameScreen}
        activeWindows={activeWindows}
        onHit={hitWindow}
      />

      {renderOverlay()}

      {flashbangActive && <div className={styles.smoke} style={smokeStyle} />}
    </div>
  );
}

export default GameArea;
