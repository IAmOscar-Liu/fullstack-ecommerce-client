import styles from "./Contact.module.css";

interface Props {}

const Contact: React.FC<Props> = () => {
  return (
    <section className={styles.contact} id="contact">
      <h1 className={styles["contact-h1"]}>Contact Us</h1>
      <p className={styles["contact-p"]}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
      <div className={styles["contact-container"]}>
        <article>
          <form action="">
            <h2>Send a Message</h2>
            <div className={styles["name"]}>
              <p>
                <input id="input-first-name" type="text" required />
                <label htmlFor="input-first-name">First name</label>
              </p>
              <p>
                <input id="input-last-name" type="text" required />
                <label htmlFor="input-last-name">Last name</label>
              </p>
            </div>
            <div className={styles["email-and-phone"]}>
              <p>
                <input id="input-email" type="text" required />
                <label htmlFor="input-email">Email</label>
              </p>
              <p>
                <input id="input-phone" type="text" required />
                <label htmlFor="input-phone">Phone</label>
              </p>
            </div>
            <div className={styles["message"]}>
              <p>
                <textarea id="input-message" rows={4} required></textarea>
                <label htmlFor="input-message">
                  Write your message here...
                </label>
              </p>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </article>
        <div className={styles["map-container"]}>
          <div className={styles["mapBox"]}>
            <input id="gmap-checkbox" type="checkbox" />

            <div className={styles["contact-toggle-btns"]}>
              <label htmlFor="gmap-checkbox">Info</label>
              <label htmlFor="gmap-checkbox">Map</label>
            </div>

            <iframe
              title="google map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4459.001263195949!2d-122.40436175322881!3d37.79027340673078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580627b5ea1d1%3A0x60fd99496057cf74!2s548%20Market%20St%2C%20San%20Francisco%2C%20CA%2094104%2C%20USA!5e0!3m2!1sen!2stw!4v1639717004491!5m2!1sen!2stw"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>

            <h3>Contact Info</h3>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              <span>
                548 Market Street #87043
                <br />
                San Francisco, CA <br />
                94104
              </span>
            </p>
            <p>
              <i className="fas fa-envelope"></i>
              <span>gofasthorse@gmail.com</span>
            </p>
            <p>
              <i className="fas fa-phone-volume"></i>
              <span>(855) 432-8623</span>
            </p>
            <div className="spacer-1"></div>
            <div className={styles["social-icons"]}>
              <i className={`${styles.fab} fab fa-facebook`}></i>
              <i className={`${styles.fab} fab fa-twitter`}></i>
              <i className={`${styles.fab} fab fa-instagram`}></i>
              <i className={`${styles.fab} fab fa-linkedin`}></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
