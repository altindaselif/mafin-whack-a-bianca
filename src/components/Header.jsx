import { useSound } from "../hooks/useSound";
import { useLang } from "../hooks/useLang";
import { useT } from "../hooks/useT";
import styles from "./Header.module.css";

const iconProps = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function MusicIcon() {
  return (
    <svg {...iconProps}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg {...iconProps}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function Header() {
  const { sfxMuted, musicMuted, toggleSfx, toggleMusic } = useSound();
  const { lang, setLang } = useLang();
  const t = useT("header");

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src="/images/favicon.webp" alt="Mafin" />
        <h1 className={styles.title}>#MAFIN</h1>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.soundButton} ${musicMuted ? styles.soundOff : ""}`}
          onClick={toggleMusic}
          aria-label={musicMuted ? t.musicOn : t.musicOff}
          title={musicMuted ? t.musicOn : t.musicOff}
        >
          <MusicIcon />
        </button>

        <span className={styles.divider}>|</span>

        <button
          className={`${styles.soundButton} ${sfxMuted ? styles.soundOff : ""}`}
          onClick={toggleSfx}
          aria-label={sfxMuted ? t.sfxOn : t.sfxOff}
          title={sfxMuted ? t.sfxOn : t.sfxOff}
        >
          <SoundIcon />
        </button>

        <span className={styles.divider}>|</span>

        <button className={lang === "es" ? styles.langButtonActive : styles.langButton} onClick={() => setLang("es")}>
          ES
        </button>
        <span className={styles.divider}>|</span>
        <button className={lang === "en" ? styles.langButtonActive : styles.langButton} onClick={() => setLang("en")}>
          EN
        </button>
      </div>
    </header>
  );
}

export default Header;
