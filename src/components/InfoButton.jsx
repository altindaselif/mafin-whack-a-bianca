import { useState } from "react";
import { useT } from "../hooks/useT";
import InfoModal from "./InfoModal";

// Reusable "how to play" button + modal toggle. `className` is supplied by the
// host overlay so each keeps its own positioning styles.
function InfoButton({ className }) {
  const t = useT("infoModal");
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <button className={className} onClick={() => setShowInfo(true)} aria-label={t.openLabel}>
        i
      </button>

      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
    </>
  );
}

export default InfoButton;
