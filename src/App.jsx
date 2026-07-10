import useGameLogic from "./hooks/useGameLogic";
import Header from "./components/Header";
import GameArea from "./components/GameArea";
import ReunionBar from "./components/ReunionBar";
import StatsPanel from "./components/StatsPanel";
import Footer from "./components/Footer";
import styles from "./App.module.css";

function App() {
  const game = useGameLogic();

  return (
    <>
      <Header />

      <main className={styles.main}>
        {/* Left column — the game */}
        <div className={styles.gameColumn}>
          <GameArea game={game} />
        </div>

        {/* Right column — reunion bar on top, stats below */}
        <div className={styles.sideColumn}>
          <ReunionBar score={game.score} />
          <StatsPanel sessionHits={game.sessionHits} localHits={game.localHits} localReunions={game.localReunions} />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
