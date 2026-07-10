import { useEffect, useState, memo } from "react";
import { GAME_CONFIG } from "../utils/constants";
import styles from "./ReunionBar.module.css";

function ReunionBar({ score }) {
  const clamped = Math.min(score, GAME_CONFIG.WIN_SCORE);
  const progress = clamped / GAME_CONFIG.WIN_SCORE;
  const isReunited = score >= GAME_CONFIG.WIN_SCORE;
  const happy = score >= GAME_CONFIG.HAPPY_THRESHOLD;

  const fillPercent = progress * 100;

  const [phase, setPhase] = useState(0);
  const [prevScore, setPrevScore] = useState(score);

  if (score !== prevScore) {
    setPrevScore(score);
    if (score === 0) {
      setPhase(0);
    }
  }

  useEffect(() => {
    if (score >= GAME_CONFIG.WIN_SCORE) {
      const t1 = setTimeout(() => setPhase(1), GAME_CONFIG.REUNION_SLIDE_DELAY);
      const t2 = setTimeout(() => setPhase(2), GAME_CONFIG.REUNION_HEARTS_DELAY);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [score]);

  const showHeartFaces = isReunited && phase >= 2;
  const slid = isReunited && phase >= 1;

  let martaSprite;
  let finaSprite;

  if (showHeartFaces) {
    martaSprite = "./images/marta-head-heart.webp";
    finaSprite = "./images/fina-head-heart.webp";
  } else if (happy) {
    martaSprite = "./images/marta-head-happy.webp";
    finaSprite = "./images/fina-head-happy.webp";
  } else {
    martaSprite = "./images/marta-head-sad.webp";
    finaSprite = "./images/fina-head-sad.webp";
  }

  return (
    <div className={styles.card}>
      <div className={styles.stage}>
        <img
          className={`${styles.face} ${styles.martaFace} ${slid ? styles.slideRight : ""}`}
          src={martaSprite}
          alt="Marta"
          draggable={false}
        />

        <div className={`${styles.middle} ${isReunited ? styles.middleFade : ""}`}>
          <div className={styles.vein}>
            <div className={styles.veinFill} style={{ width: `${fillPercent}%` }} />
          </div>

          <div className={`${styles.heart} ${progress > 0 && !isReunited ? styles.heartPumping : ""}`}>
            <span className={styles.heartBase}>♥</span>
            <span className={styles.heartFill} style={{ clipPath: `inset(${100 - fillPercent}% 0 0 0)` }}>
              ♥
            </span>
          </div>

          <div className={styles.vein}>
            <div className={`${styles.veinFill} ${styles.veinFillRight}`} style={{ width: `${fillPercent}%` }} />
          </div>
        </div>

        <img className={`${styles.face} ${slid ? styles.slideLeft : ""}`} src={finaSprite} alt="Fina" draggable={false} />
      </div>
    </div>
  );
}

export default memo(ReunionBar);
