// Detects the visitor's country via a chain of free IP-geolocation APIs
const COUNTRY_KEY = "wab_user_country";

const GEO_APIS = [
  () =>
    fetch("https://1.1.1.1/cdn-cgi/trace")
      .then((r) => r.text())
      .then((d) => {
        const loc = d.split("\n").find((l) => l.startsWith("loc="));
        return loc ? loc.split("=")[1].trim() : null;
      }),
  () => fetch("https://ipapi.co/country/").then((r) => (r.ok ? r.text() : null)),
  () =>
    fetch("https://api.country.is/")
      .then((r) => r.json())
      .then((d) => d.country),
  () =>
    fetch("https://freeipapi.com/api/json")
      .then((r) => r.json())
      .then((d) => d.countryCode),
];

let countryPromise = null;

export function fetchAndSaveCountry() {
  const saved = localStorage.getItem(COUNTRY_KEY);
  if (saved && saved !== "XX") return Promise.resolve(saved);

  if (countryPromise) return countryPromise;

  countryPromise = (async () => {
    for (const api of GEO_APIS) {
      try {
        const code = await api();
        if (code && code.trim().length === 2) {
          const cc = code.trim().toUpperCase();
          localStorage.setItem(COUNTRY_KEY, cc);
          return cc;
        }
      } catch {
        continue;
      }
    }
    return "XX";
  })();

  return countryPromise;
}

export function getFlagEmoji(code) {
  if (!code || code === "XX") return "🌍";
  return code.toUpperCase().replace(/./g, (c) => String.fromCodePoint(c.charCodeAt(0) + 127397));
}

export function getCountryName(code, lang) {
  if (code === "XX") return lang === "en" ? "Unknown" : "Desconocido";
  const locale = lang === "en" ? "en-US" : "es-ES";
  return new Intl.DisplayNames([locale], { type: "region" }).of(code) || code;
}
