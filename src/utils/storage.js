// Device-local counters kept in localStorage.
const KEYS = {
  localHits: "wab_local_hits",
  localReunions: "wab_local_reunions",
};

export function getLocalHits() {
  return parseInt(localStorage.getItem(KEYS.localHits) || "0", 10);
}

export function getLocalReunions() {
  return parseInt(localStorage.getItem(KEYS.localReunions) || "0", 10);
}

export function addLocalHits(n) {
  const total = getLocalHits() + n;
  localStorage.setItem(KEYS.localHits, String(total));
  return total;
}

export function addLocalReunion() {
  const total = getLocalReunions() + 1;
  localStorage.setItem(KEYS.localReunions, String(total));
  return total;
}
