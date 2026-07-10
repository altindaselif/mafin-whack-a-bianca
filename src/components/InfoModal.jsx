import { useT } from "../hooks/useT";
import styles from "./InfoModal.module.css";

function InfoModal({ onClose }) {
  const t = useT("infoModal");

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className={styles.closeX} onClick={onClose} aria-label={t.close}>
          ×
        </button>

        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.goal}>{t.goal}</p>

        <ul className={styles.rules}>
          {t.rules.map((rule) => (
            <li key={rule.name} className={styles.rule}>
              <div className={styles.thumb}>
                <img src={rule.img} alt={rule.name} />
              </div>
              <div className={styles.ruleText}>
                <span className={`${styles.name} ${rule.good ? styles.good : styles.bad}`}>
                  {rule.good ? "✓ " : "✗ "}
                  {rule.name}
                </span>
                <span className={styles.desc}>{rule.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InfoModal;
