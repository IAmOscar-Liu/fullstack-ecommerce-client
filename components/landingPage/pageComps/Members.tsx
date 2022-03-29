import { useState, useRef, useEffect } from "react";
import styles from "./Members.module.css";
import { cardContents } from "../../../dummyData/members";

interface Props {}

const Members: React.FC<Props> = () => {
  const cardArticles = useRef<HTMLDivElement>(null);
  const [cardIdx, setCardIdx] = useState<number>(0);

  const updateCardContent = (i: number) => {
    if (i === cardIdx) return;

    if (cardArticles.current.classList.contains("card-transition")) return;

    cardArticles.current.classList.add("card-transition");
    setTimeout(() => setCardIdx(i), 500);
  };

  useEffect(() => {
    const cardElement = cardArticles.current;
    const removeCardTransition = () =>
      cardElement.classList.remove("card-transition");

    cardElement.addEventListener("animationend", removeCardTransition);

    return () =>
      cardElement.removeEventListener("animationend", removeCardTransition);
  }, []);

  return (
    <section className={styles.members} id="members">
      <div className={styles["circle"]}></div>
      <div className={styles["circle"]}></div>

      <h1 className={styles["members-h1"]}>Meet our best team</h1>
      <div className={styles["members-container"]}>
        <div className={styles["members-lists"]}>
          {cardContents.map((cardContent, i) => (
            <div
              key={cardContent.name}
              className={`${styles["member-lists-card"]} ${
                i === cardIdx ? styles.active : ""
              }`}
              onClick={() => updateCardContent(i)}
            >
              <b></b>
              <div className={styles["imgBox"]}>
                <img src={cardContent.front_img} alt="" />
              </div>
              <article>
                <h2>{cardContent.name}</h2>
                <p>{cardContent.profession}</p>
                <p>
                  <i className={styles["fas fa-phone"]}></i>
                  {cardContent.contact.phone}
                </p>
              </article>
            </div>
          ))}
        </div>
        <div className={styles["members-card"]}>
          <input id="card-checkbox" type="checkbox" />

          <div className={styles["members-card-articles"]} ref={cardArticles}>
            <article>
              <h3>
                About <span>{cardContents[cardIdx].name}</span>
              </h3>
              <p>{cardContents[cardIdx].description}</p>
              <div className="spacer-1"></div>
              <label htmlFor="card-checkbox">
                Flip Card<i className={`${styles.fas} fas fa-arrow-right`}></i>
              </label>
            </article>
            <article>
              <h3>
                About <span>{cardContents[cardIdx].name}</span>
              </h3>
              <h4>
                Profession: <br />
                <i className={styles["profession"]}>
                  {cardContents[cardIdx].profession}
                </i>
              </h4>
              <br />
              <h4>
                Contact: <br />
                <i className={`${styles.fas} fas fa-phone`}></i>
                <span id="contact-phone">
                  {cardContents[cardIdx].contact.phone}
                </span>
                <br />
                <i className={`${styles.fas} fas fa-envelope`}></i>
                <span id="contact-email">
                  {cardContents[cardIdx].contact.email}
                </span>
              </h4>
              <br />
              <div className={styles["social-icons"]}>
                <i className={`${styles.fab} fab fa-facebook`}></i>
                <i className={`${styles.fab} fab fa-twitter`}></i>
                <i className={`${styles.fab} fab fa-instagram`}></i>
                <i className={`${styles.fab} fab fa-linkedin"`}></i>
              </div>
              <div className="spacer-1"></div>
              <label htmlFor="card-checkbox">
                <i className={`${styles.fas} fas fa-arrow-left`}></i>Flip Card
              </label>
            </article>
            <div className={styles["img-container"]}>
              <label htmlFor="card-checkbox" className={styles["imgBox"]}>
                <div className={styles['front-img']}>
                  <img src={cardContents[cardIdx].front_img} alt="" />
                </div>
                <div className={styles['back-img']}>
                  <img src={cardContents[cardIdx].back_img} alt="" />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Members;

/*
          <div className="member-lists-card">
            <b></b>
            <div className="imgBox">
              <img
                src="https://images.unsplash.com/photo-1639502496516-95531e23e304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
                alt=""
              />
            </div>
            <article>
              <h2>Oscar Liu</h2>
              <p>Junior software engineer</p>
              <p>
                <i className="fas fa-phone"></i>555-555-5555
              </p>
            </article>
          </div>

          <div className="member-lists-card">
            <b></b>
            <div className="imgBox">
              <img
                src="https://images.unsplash.com/photo-1639642721772-8c7c8b69f5c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt=""
              />
            </div>
            <article>
              <h2>Jacky Ho</h2>
              <p>Senior software engineer</p>
              <p>
                <i className="fas fa-phone"></i>555-555-5555
              </p>
            </article>
          </div>

          <div className="member-lists-card">
            <b></b>
            <div className="imgBox">
              <img
                src="https://images.unsplash.com/photo-1639502006744-639779e784bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"
                alt=""
              />
            </div>
            <article>
              <h2>Kevin Chen</h2>
              <p>Intern</p>
              <p>
                <i className="fas fa-phone"></i>555-555-5555
              </p>
            </article>
          </div>
*/
