import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../utils/firebase";
import { fetchAndSaveCountry, getCountryName } from "../services/geolocation";

export function useFirebaseStats(lang = "es") {
  const [globalStats, setGlobalStats] = useState({ hits: 0, reunions: 0 });
  const [rawCountryData, setRawCountryData] = useState([]);
  const [userCountryCode, setUserCountryCode] = useState("XX");

  useEffect(() => {
    fetchAndSaveCountry().then((code) => setUserCountryCode(code));

    const unsubGlobal = onValue(ref(db, "global_stats"), (snapshot) => {
      const data = snapshot.val();
      setGlobalStats({ hits: data?.hits || 0, reunions: data?.reunions || 0 });
    });

    const unsubCountry = onValue(ref(db, "country_stats"), (snapshot) => {
      const data = snapshot.val();
      const sorted = Object.entries(data || {})
        .map(([code, hits]) => ({ code, hits }))
        .sort((a, b) => b.hits - a.hits);
      setRawCountryData(sorted);
    });

    return () => {
      unsubGlobal();
      unsubCountry();
    };
  }, []);

  const countryRanking = rawCountryData.map((c) => ({
    ...c,
    name: getCountryName(c.code, lang),
  }));

  const userCountryData = {
    code: userCountryCode,
    name: getCountryName(userCountryCode, lang),
  };

  return { globalStats, countryRanking, userCountryData };
}
