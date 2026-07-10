import { ref, runTransaction } from "firebase/database";
import { db } from "../utils/firebase";
import { fetchAndSaveCountry } from "./geolocation";

// One batched write at the end of a game: global hits, the player's country bucket, and (on a win) the global reunion counter.
export async function commitGameToFirebase({ hits, won }) {
  try {
    if (hits > 0) {
      runTransaction(ref(db, "global_stats/hits"), (current) => (current || 0) + hits);

      const country = await fetchAndSaveCountry();
      if (country && country !== "XX") {
        runTransaction(ref(db, `country_stats/${country}`), (current) => (current || 0) + hits);
      }
    }

    if (won) {
      runTransaction(ref(db, "global_stats/reunions"), (current) => (current || 0) + 1);
    }
  } catch {
    // Best-effort: stats failures should never break gameplay.
  }
}
