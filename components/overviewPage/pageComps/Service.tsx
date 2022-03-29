import styles from "./Service.module.css";

interface Props {}

const Service: React.FC<Props> = () => {
  return (
    <div className={styles["service-container"]}>
      <h1>Services</h1>

      <div className={styles.care}>
        <h5>Customer Care</h5>
        <div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
            nostrum itaque repellat! Accusantium quis natus tempora voluptatum,
            autem itaque numquam nesciunt illo, eum nemo harum!
          </p>
          <div className={styles.imgs}>
            <div className={styles.imgBx}>
              <img src="/Mercedes.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.privacy}>
        <h5>Privacy & Safety</h5>
        <div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
            perferendis inventore dolorum laudantium ipsa totam in maiores eum,
            neque, fuga est id, assumenda sed.
          </p>
          <div className={styles.imgs}>
            <div className={styles.imgBx}>
              <img src="/Rolex.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.wholesale}>
        <h5>Wholesale Inquiries</h5>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            commodi voluptas aperiam quo nisi magnam a accusamus alias molestias
            qui. Sunt architecto itaque blanditiis.
          </p>
          <div className={styles.imgs}>
            <div className={styles.imgBx}>
              <img src="/iphone.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
