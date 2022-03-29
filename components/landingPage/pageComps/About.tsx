import styles from "./About.module.css";
import { useRouter } from "next/router";
import { about } from "../../../dummyData/about";

interface Props {}

const About: React.FC<Props> = () => {
  const router = useRouter();

  const handleClick = (url: string) => {
    router.push(url);
  };

  return (
    <section className={styles.about} id="about">
      <h1 className={styles["about-h1"]}>What can we do for you?</h1>
      <p className={styles["about-p"]}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sed magni
        ea, harum eveniet animi.
      </p>
      {about.map((ab) => (
        <article key={ab.title}>
          <div className={styles["article-text"]}>
            <h1>{ab.title}</h1>
            <p>{ab.description}</p>
            <div className="spacer-1"></div>
            <button
              onClick={() => handleClick(`/main/more/overview${ab.pathname}`)}
            >
              <span>
                See More<i className="fas fa-arrow-right"></i>
              </span>
            </button>
          </div>
          <div className={styles["article-image"]}>
            <div
              onClick={() => handleClick(`/main/more/overview${ab.pathname}`)}
              className={styles["imgBox"]}
            >
              <img src={ab.img} alt="" />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default About;
