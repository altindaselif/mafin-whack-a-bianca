import { useLang } from "./useLang";
import { translations } from "../i18n/translations";

export function useT(section) {
  const { lang } = useLang();
  const dict = translations[section] || {};
  return dict[lang] || dict.es || {};
}
