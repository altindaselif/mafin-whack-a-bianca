import { useT } from "../hooks/useT";
import InfoButton from "./InfoButton";
import styles from "./StartOverlay.module.css";

function StartOverlay({ onStart }) {
  const t = useT("startOverlay");

  return (
    <>
      <InfoButton className={styles.infoButton} />

      <div className={styles.overlay}>
        <h2 className={styles.title}>{t.title}</h2>
        <button className={styles.button} onClick={onStart}>
          {t.button}
        </button>
      </div>
    </>
  );
}

export default StartOverlay;
