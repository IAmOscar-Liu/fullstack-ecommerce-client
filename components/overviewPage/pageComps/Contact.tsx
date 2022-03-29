import styles from "./Contact.module.css";
import { useRouter } from "next/router";

interface Props {}

const Contact: React.FC<Props> = () => {
  const router = useRouter();

  return (
    <div className={styles["contact-container"]}>
      <h1>Contact Us</h1>

      <div className={styles["contact-info-map"]}>
        <div className={styles["contact-info"]}>
          <p>
            <b>
              <i className="fas fa-map-marker-alt"></i>
              <strong>Address:</strong>
            </b>
            <span>
              548 Market Street #87043
              <br />
              San Francisco, CA <br />
              94104
            </span>
          </p>
          <p>
            <b>
              <i className="fas fa-envelope"></i>
              <strong>Email:</strong>
            </b>
            <span>gofasthorse@gmail.com</span>
          </p>
          <p>
            <b>
              <i className="fas fa-phone-volume"></i>
              <strong>Phone:</strong>
            </b>
            <span>(855) 432-8623</span>
          </p>

          <div className={styles["social-icons"]}>
            <i className={`${styles.fab} fab fa-facebook`}></i>
            <i className={`${styles.fab} fab fa-twitter`}></i>
            <i className={`${styles.fab} fab fa-instagram`}></i>
            <i className={`${styles.fab} fab fa-linkedin`}></i>
            <button
              onClick={() =>
                router.push({
                  pathname: "/",
                  query: { contact_us: true },
                })
              }
            >
              Leave a Message
            </button>
          </div>
        </div>

        <div className={styles["contact-map"]}>
          <iframe
            title="google map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4459.001263195949!2d-122.40436175322881!3d37.79027340673078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580627b5ea1d1%3A0x60fd99496057cf74!2s548%20Market%20St%2C%20San%20Francisco%2C%20CA%2094104%2C%20USA!5e0!3m2!1sen!2stw!4v1639717004491!5m2!1sen!2stw"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
