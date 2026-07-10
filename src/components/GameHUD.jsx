import { memo } from "react";
import { GAME_CONFIG } from "../utils/constants";
import styles from "./GameHUD.module.css";

const LIVES_ARRAY = Array.from({ length: GAME_CONFIG.MAX_LIVES });

function GameHUD({ score, lives, timeLeft }) {
  return (
    <div className={styles.hud}>
      <div className={styles.lives}>
        {LIVES_ARRAY.map((_, i) => (
          <img
            key={i}
            className={`${styles.lifeIcon} ${i >= lives ? styles.lifeLost : ""}`}
            src="./images/marta-head-heart.webp"
            alt="Life"
            draggable={false}
          />
        ))}
      </div>

      <span className={styles.timer}>{timeLeft}</span>

      <span className={styles.score}>
        {score}/{GAME_CONFIG.WIN_SCORE}
      </span>
    </div>
  );
}

export default memo(GameHUD);
