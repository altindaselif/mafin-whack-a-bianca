import { useT } from "../hooks/useT";
import styles from "./Footer.module.css";

function Footer() {
  const t = useT("footer");

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        {t.disclaimerMain}
        <br />
        {t.ps}
      </p>

      <a className={styles.kofi} href="https://ko-fi.com/annadewitt125" target="_blank" rel="noopener noreferrer">
        {t.kofi}
      </a>

      <p className={styles.credit}>
        🎵 {t.music}{" "}
        <a className={styles.creditLink} href="https://x.com/NVillaneve_23" target="_blank" rel="noopener noreferrer">
          @NVillaneve_23
        </a>
      </p>
    </footer>
  );
}

export default Footer;
