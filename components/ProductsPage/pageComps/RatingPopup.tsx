import { Dispatch, SetStateAction, useState } from "react";
import Popup from "reactjs-popup";
import styles from "./RatingPopup.module.css";

interface Props {
  open: boolean;
  toggleOpen: Dispatch<SetStateAction<boolean>>;
  cb: (score: number) => Promise<void>;
}

const RatingPop: React.FC<Props> = ({ open, toggleOpen, cb }) => {
  const [score, setScore] = useState<number>(0);
  const closeModal = () => {
    toggleOpen(false);
    setScore(0);
  };

  const handleSubmit = async () => {
    await cb(score);
    closeModal();
  };

  // console.log("popup is open ? ", open);

  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
      <div className={styles["modal"]}>
        <i className={styles["close"]} onClick={closeModal}>
          &times;
        </i>

        <div className={styles["rating-area"]}>
          <h2>Rate this product</h2>
          <div className={styles["product-rating"]}>
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <b
                  key={i}
                  className={i + 1 <= score ? styles["rate"] : ""}
                  onClick={() => setScore(i + 1)}
                ></b>
              ))}
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </Popup>
  );
};

export default RatingPop;
