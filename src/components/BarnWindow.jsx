import { CHARACTERS } from "../game/characters";
import styles from "./BarnWindow.module.css";

function BarnWindow({ position, character, onHit }) {
  const style = {
    left: `${position.left}%`,
    top: `${position.top}%`,
    width: `${position.width}%`,
    height: `${position.height}%`,
  };

  // Fire on pointer-DOWN, not click: on touch screens a click needs a clean
  // press+release on the same spot with no movement, which a fast tapping
  // player rarely gives — so taps get silently dropped ("had to tap 2-3
  // times"). pointerdown fires the instant the finger lands, for mouse and
  // touch alike. The whole window cell is the target, not just the sprite,
  // so grazing the edge still counts.
  const handlePointerDown = (e) => {
    e.preventDefault();
    if (onHit) onHit(position.id);
  };

  if (!character) {
    return (
      <div className={styles.window} style={style} onPointerDown={handlePointerDown}>
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
    <div className={styles.window} style={style} onPointerDown={handlePointerDown}>
      <div className={styles.clip}>
        <img className={`${styles.character} ${animClass}`} src={sprite} alt="" draggable={false} />
        {isHit && <img className={styles.hammer} src="./images/hammer.webp" alt="" draggable={false} />}
      </div>
    </div>
  );
}

export default BarnWindow;
