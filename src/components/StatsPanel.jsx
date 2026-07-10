import { useState, memo } from "react";
import { useFirebaseStats } from "../hooks/useFirebaseStats";
import { useLang } from "../hooks/useLang";
import { useT } from "../hooks/useT";
import CountryLeaderboard from "./CountryLeaderboard";
import styles from "./StatsPanel.module.css";

function StatsPanel({ sessionHits, localHits, localReunions }) {
  const { lang } = useLang();
  const t = useT("statsPanel");
  const [flipped, setFlipped] = useState(false);

  const { globalStats, countryRanking, userCountryData } = useFirebaseStats(lang);
  const fmt = (n) => n.toLocaleString();

  return (
    <div className={`${styles.panel} ${flipped ? styles.flipped : ""}`}>
      <button className={styles.flipButton} onClick={() => setFlipped((f) => !f)} aria-label="ranking">
        {flipped ? "✕" : "🏆"}
      </button>

      <div className={styles.viewport}>
        <div className={styles.flipper}>
          {/* FRONT */}
          <div className={styles.cardFace}>
            <div className={styles.statsColumn}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>{t.current}</span>
                <span className={styles.statValue}>{fmt(sessionHits)}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>{t.localHits}</span>
                <span className={styles.statValue}>{fmt(localHits)}</span>
              </div>
              <div className={`${styles.stat} ${styles.globalStat} ${styles.beforeDivider}`}>
                <span className={styles.statLabel}>{t.globalHits}</span>
                <span className={styles.statValue}>{fmt(globalStats.hits)}</span>
              </div>
              <div className={styles.sectionDivider} />
              <div className={styles.stat}>
                <span className={styles.statLabel}>{t.localReunions}</span>
                <span className={styles.statValue}>{fmt(localReunions)}</span>
              </div>
              <div className={`${styles.stat} ${styles.globalStat}`}>
                <span className={styles.statLabel}>{t.globalReunions}</span>
                <span className={styles.statValue}>{fmt(globalStats.reunions)}</span>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className={`${styles.cardFace} ${styles.cardBack}`}>
            <CountryLeaderboard countryRanking={countryRanking} userCountryData={userCountryData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(StatsPanel);
