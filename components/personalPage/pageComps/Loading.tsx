import styles from "./Loading.module.css";

interface Props {}

const Loading: React.FC<Props> = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles["loading"]}>
        {Array(20)
          .fill(null)
          .map((_, i) => (
            <span key={i} style={{ "--i": i + 1 } as any}></span>
          ))}
      </div>
    </div>
  );
};

export default Loading;
