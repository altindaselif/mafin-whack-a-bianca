import { useState, useMemo } from "react";
import { LanguageContext } from "./languageContextObject";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("es");

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
