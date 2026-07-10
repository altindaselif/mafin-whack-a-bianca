import { useT } from "../hooks/useT";
import InfoButton from "./InfoButton";
import styles from "./GameOverOverlay.module.css";

function GameOverOverlay({ result, onRestart }) {
  const t = useT("gameOver");

  return (
    <>
      <InfoButton className={styles.infoButton} />

      <div className={styles.overlay}>
        <h2 className={result === "win" ? styles.titleWin : styles.title}>{t[result]}</h2>
        <button className={styles.button} onClick={onRestart}>
          {t.button}
        </button>
      </div>
    </>
  );
}

export default GameOverOverlay;
