export const translations = {
  header: {
    es: { musicOff: "Silenciar música", musicOn: "Activar música", sfxOff: "Silenciar efectos", sfxOn: "Activar efectos" },
    en: { musicOff: "Mute music", musicOn: "Unmute music", sfxOff: "Mute sound effects", sfxOn: "Unmute sound effects" },
  },

  startOverlay: {
    es: { title: "WHACK-A-BIANCA", button: "¡JUGAR!" },
    en: { title: "WHACK-A-BIANCA", button: "PLAY!" },
  },

  gameOver: {
    es: {
      win: "¡Reunidas!",
      timeout: "¡Se acabó el tiempo!",
      divorced: "¡Os habéis divorciado!",
      button: "JUGAR DE NUEVO",
    },
    en: {
      win: "Reunited!",
      timeout: "Time's up!",
      divorced: "You got divorced!",
      button: "PLAY AGAIN",
    },
  },

  statsPanel: {
    es: {
      current: "Tus golpes ahora",
      localHits: "Tus golpes totales",
      globalHits: "Golpes del mundo",
      localReunions: "Tus reuniones totales",
      globalReunions: "Reuniones del mundo",
    },
    en: {
      current: "Your hits now",
      localHits: "Your total hits",
      globalHits: "World hits",
      localReunions: "Your total reunions",
      globalReunions: "World reunions",
    },
  },

  leaderboard: {
    es: { title: "🌍 Ranking Mundial de Golpes", you: "Tú" },
    en: { title: "🌍 World Hits Ranking", you: "You" },
  },

  footer: {
    es: {
      disclaimerMain:
        "Aviso: No tenemos más que respeto y cariño por Carolina Román. Es una actriz increíble y ser testigo de su talento en pantalla es todo un privilegio. ¡Es que no soportamos a Bianca Forner!",
      ps: "(P.D. Os queremos, Alba Brunet y Marta Belmonte.)",
      kofi: "☕ Apoyar a la creadora",
      music: "Música de",
    },
    en: {
      disclaimerMain:
        "Disclaimer: We have nothing but respect and love for Carolina Román. She is an amazing actress and witnessing her talent on screen is an absolute privilege! We just really can't stand Bianca Forner.",
      ps: "(P.S. We love you, Alba Brunet and Marta Belmonte.)",
      kofi: "☕ Support the creator",
      music: "Music by",
    },
  },

  infoModal: {
    es: {
      title: "COMO JUGAR",
      goal: "Golpea a BIANCA 12 veces para reunir a Marta y Fina.",
      close: "Cerrar",
      openLabel: "Cómo jugar",
      rules: [
        { img: "./images/bianca-half.webp", name: "BIANCA", good: true, desc: "¡Golpéala! +1 punto. Llega a 12 y reunidas." },
        { img: "./images/fina-half-hat.webp", name: "FINA", good: false, desc: "¡No la golpees! -1 vida. 3 golpes y divorcio." },
        { img: "./images/peacock-hat.webp", name: "PAVO REAL", good: false, desc: "¡No lo golpees! Te roba 3 segundos del reloj." },
        { img: "./images/sick-cow-half-hat.webp", name: "VACA", good: false, desc: "¡No la golpees! Te ciega 2 segundos." },
      ],
    },
    en: {
      title: "HOW TO PLAY",
      goal: "Whack BIANCA 12 times to reunite Marta and Fina.",
      close: "Close",
      openLabel: "How to play",
      rules: [
        { img: "./images/bianca-half.webp", name: "BIANCA", good: true, desc: "Whack! +1 point. Reach 12 to reunite them." },
        { img: "./images/fina-half-hat.webp", name: "FINA", good: false, desc: "Don't whack! -1 life. 3 hits and divorce." },
        { img: "./images/peacock-hat.webp", name: "PEACOCK", good: false, desc: "Don't whack! It steals 3 seconds off the clock." },
        { img: "./images/sick-cow-half-hat.webp", name: "COW", good: false, desc: "Don't whack! It blinds you for 2 seconds." },
      ],
    },
  },
};
