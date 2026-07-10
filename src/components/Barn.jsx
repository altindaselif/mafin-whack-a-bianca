import { WINDOW_POSITIONS } from "../utils/constants";
import BarnWindow from "./BarnWindow";
import styles from "./Barn.module.css";

function Barn({ image, showWindows, activeWindows, onHit }) {
  return (
    <div className={styles.barn}>
      {showWindows && (
        <div className={styles.windowLayer}>
          {WINDOW_POSITIONS.map((win) => (
            <BarnWindow key={win.id} position={win} character={activeWindows[win.id]} onHit={onHit} />
          ))}
        </div>
      )}

      <img className={styles.barnImage} src={image} alt="Barn" draggable={false} />
    </div>
  );
}

export default Barn;
