import { useState, useMemo } from "react";
import { getFlagEmoji } from "../services/geolocation";
import { useT } from "../hooks/useT";
import styles from "./CountryLeaderboard.module.css";

const PAGE_SIZE = 5;

function CountryLeaderboard({ countryRanking, userCountryData }) {
  const t = useT("leaderboard");
  const [page, setPage] = useState(0);
  const fmt = (n) => n.toLocaleString();

  const totalPages = Math.max(1, Math.ceil(countryRanking.length / PAGE_SIZE));
  const validPage = Math.min(page, totalPages - 1);

  const pageItems = useMemo(() => {
    return countryRanking.slice(validPage * PAGE_SIZE, validPage * PAGE_SIZE + PAGE_SIZE);
  }, [countryRanking, validPage]);

  const { userRank, userHits } = useMemo(() => {
    const index = countryRanking.findIndex((c) => c.code === userCountryData.code);
    return {
      userRank: index >= 0 ? index + 1 : "—",
      userHits: index >= 0 ? countryRanking[index].hits : 0,
    };
  }, [countryRanking, userCountryData.code]);

  const emptyRowCount = Math.max(0, PAGE_SIZE - pageItems.length);
  const emptyRows = Array.from({ length: emptyRowCount }).map((_, i) => <li key={`empty${i}`} className={styles.item} />);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t.title}</h3>

      <ul className={styles.list}>
        {pageItems.map((c, i) => {
          const rank = validPage * PAGE_SIZE + i + 1;
          const isUser = c.code === userCountryData.code;
          return (
            <li key={c.code} className={`${styles.item} ${isUser ? styles.userItem : ""}`}>
              <span className={styles.rank}>{rank}</span>
              <span className={styles.country}>
                {getFlagEmoji(c.code)} {c.name}
              </span>
              <span className={styles.count}>{fmt(c.hits)}</span>
            </li>
          );
        })}
        {emptyRows}
      </ul>

      <div className={styles.pagination}>
        <button className={styles.pageButton} onClick={() => setPage(validPage - 1)} disabled={validPage === 0} aria-label="prev">
          ‹
        </button>
        <span className={styles.pageIndicator}>
          {validPage + 1} / {totalPages}
        </span>
        <button
          className={styles.pageButton}
          onClick={() => setPage(validPage + 1)}
          disabled={validPage >= totalPages - 1}
          aria-label="next"
        >
          ›
        </button>
      </div>

      <div className={styles.userBox}>
        <span className={styles.userName}>
          {userRank}. {getFlagEmoji(userCountryData.code)} {userCountryData.name} ({t.you})
        </span>
        <span className={styles.userScore}>{fmt(userHits)}</span>
      </div>
    </div>
  );
}

export default CountryLeaderboard;
