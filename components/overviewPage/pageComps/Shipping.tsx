import styles from "./Shipping.module.css";

interface Props {}

const Shipping: React.FC<Props> = () => {
  return (
    <div className={styles["shipping-container"]}>
      <h1>Shipping and Returns</h1>

      <div className={styles.shipping}>
        <h5>Shipping Policy</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sint
          nihil, quibusdam deleniti nulla repudiandae fugit, incidunt dolore
          quidem molestiae non aliquam ab omnis ipsam asperiores laborum
          voluptatum accusamus vitae odit commodi placeat autem officia!
          Excepturi.
        </p>
      </div>

      <div className={styles.returns}>
        <h5>Return & Exchange Policy</h5>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque sunt
          natus aspernatur fugit dolor error cum! Nesciunt dolorem nihil
          laboriosam magni provident. Ipsam atque natus numquam ut dolor?
        </p>
      </div>
    </div>
  );
};

export default Shipping;
