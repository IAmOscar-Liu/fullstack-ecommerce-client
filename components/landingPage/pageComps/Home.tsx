import styles from "./Home.module.css";
import { HTMLAttributes, useState } from "react";
import { useRouter } from "next/router";

interface Props {}

const Home: React.FC<Props> = () => {
  const images_src = ["/Mercedes.png", "/Rolex.png", "/iphone.png"];
  const [imgIdx, setImgIdx] = useState<number>(0);
  const router = useRouter();

  const shiftImg = (direction: number) => {
    if (
      (direction === -1 && imgIdx > 0) ||
      (direction === 1 && imgIdx < images_src.length - 1)
    )
      setImgIdx((prev) => prev + direction);
  };

  return (
    <section className={styles.home} id="home">
      <div className={styles.circle + " " + styles["circle-top-left"]}></div>
      <div className={styles.circle + " " + styles["circle-top-right"]}></div>
      <div className={styles["home-text"]}>
        <h1>The best shopping website in the world</h1>
        <h2>Find whatever you want here</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sed
          magni ea, harum eveniet animi, veritatis quaerat natus quibusdam sequi
          odit debitis temporibus vitae.
        </p>
        <div className={styles["home-text-btns"]}>
          <button onClick={() => router.push("/main/products/popular")}>
            Get Started
          </button>
          <button onClick={() => router.push("/login")}>Sign Up</button>
        </div>
      </div>
      <div className={styles["home-image"]}>
        <div
          className={styles["imageBox"]}
          style={{ "--cur-idx": imgIdx } as any}
        >
          {images_src.map((imgSrc, i) => (
            <img
              key={i}
              style={{ "--i": i } as HTMLAttributes<HTMLImageElement>}
              src={imgSrc}
              alt=""
            />
          ))}
        </div>
        <div className={styles["home-image-btns"]}>
          <button onClick={() => shiftImg(-1)}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <b>
            {imgIdx + 1}/{images_src.length}
          </b>
          <button onClick={() => shiftImg(1)}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
