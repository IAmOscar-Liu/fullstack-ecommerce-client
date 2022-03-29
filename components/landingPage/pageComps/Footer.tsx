import styles from "./Footer.module.css";
import { useRouter } from "next/router";

interface Props {}

const Footer: React.FC<Props> = () => {
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <div className={styles["footer-get-started"]}>
        <h1>
          Ready to <b>get started?</b>
        </h1>
        <div className={styles["get-started-btns"]}>
          <button onClick={() => router.push("/main/products/popular")}>
            Start Now
          </button>
          <button onClick={() => router.push("/login")}>Sign Up</button>
        </div>
      </div>
      <div className={styles["footer-main"]}>
        <h1>
          <i className={`${styles.fas} fas fa-pepper-hot`}></i>
          Banana
        </h1>
        <p>
          548 Market Street #87043
          <br />
          San Francisco, CA 94104
          <br />
          (855) 432-8623
        </p>
        <div className={styles["footer-icons"]}>
          <i className={`${styles.fab} fab fa-facebook`}></i>
          <i className={`${styles.fab} fab fa-twitter`}></i>
          <i className={`${styles.fab} fab fa-instagram`}></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
