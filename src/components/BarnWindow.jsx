import { CHARACTERS } from "../game/characters";
import styles from "./BarnWindow.module.css";

function BarnWindow({ position, character, onHit }) {
  const style = {
    left: `${position.left}%`,
    top: `${position.top}%`,
    width: `${position.width}%`,
    height: `${position.height}%`,
  };

  const handleClick = () => {
    if (onHit) onHit(position.id);
  };

  if (!character) {
    return (
      <div className={styles.window} style={style}>
        <div className={styles.clip} />
      </div>
    );
  }

  const isHit = character.hit;
  const config = CHARACTERS[character.type];
  const sprite = isHit ? config.dizzy : config.sprite;
  const animClass = isHit
    ? styles.hitState
    : character.fakeOut
      ? styles.fakeOut
      : character.leaving
        ? styles.leave
        : styles.rise;

  return (
    <div className={styles.window} style={style}>
      <div className={styles.clip}>
        <img className={`${styles.character} ${animClass}`} src={sprite} alt="" onClick={handleClick} draggable={false} />
        {isHit && <img className={styles.hammer} src="./images/hammer.webp" alt="" draggable={false} />}
      </div>
    </div>
  );
}

export default BarnWindow;
