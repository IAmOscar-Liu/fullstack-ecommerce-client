import styles from "./AboutUs.module.css";

interface Props {}

const AboutUs: React.FC<Props> = () => {
  return (
    <div className={styles["about-us-container"]}>
      <h1>About Us</h1>
      <div className={styles["container-description"]}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
          ratione dolorem soluta repudiandae eligendi optio nesciunt eos cumque
          qui porro repellat officiis nihil facere nobis? Et magni eum ducimus
          aliquid sapiente doloribus unde inventore cupiditate quis, minima
          rerum vero ad labore aut praesentium assumenda porro deserunt
          veritatis illum.
        </p>
        <div className={styles["imgs"]}>
          <div className={styles["imgBx"]}>
            <img
              src={
                "https://images.unsplash.com/photo-1633114128729-0a8dc13406b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              }
              alt=""
            />
          </div>
        </div>
      </div>

      <div className={styles["container-description"]}>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet quaerat
          sequi temporibus, accusamus dolore aspernatur quas placeat aut
          molestias enim natus, provident voluptas iusto aliquam ducimus
          voluptatibus. Eos sit dicta ratione voluptates est ducimus eveniet
          quo?
        </p>
        <div className={styles["imgs"]}>
          <div className={styles["imgBx"]}>
            <img
              src={
                "https://images.unsplash.com/photo-1633113216120-53ca0a7be5bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
