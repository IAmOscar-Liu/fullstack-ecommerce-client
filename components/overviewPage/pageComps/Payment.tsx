import styles from "./Payment.module.css";

interface Props {}

const Payment: React.FC<Props> = () => {
  return (
    <div className={styles["payment-container"]}>
      <h1>Payment Methods</h1>

      <div className={styles.credit}>
        <h5>Credit / Debit Cards</h5>
        <div>
          <p>
            <span>
              <i className="fas fa-arrow-right"></i>The most common way to pay
            </span>
            <span>
              <i className="fas fa-arrow-right"></i>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </p>
          <div className={styles.imgs}>
            <div className={styles.imgBx}>
              <img src="/credit_card.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.paypal}>
        <h5>PAYPAL</h5>
        <div>
          <p>
            <span>
              <i className="fas fa-arrow-right"></i>The easiest way to pay
            </span>
            <span>
              <i className="fas fa-arrow-right"></i>Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
            </span>
          </p>
          <div className={styles.imgs}>
            <div className={styles.imgBx}>
              <img src="/paypal.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.offline}>
        <h5>Offline Payments</h5>
        <div>
          <p>
            <span>
              <i className="fas fa-arrow-right"></i>Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </span>
          </p>
          <div className={styles.imgs}>
            <div className={styles.imgBx}>
              <img src="/offline.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
