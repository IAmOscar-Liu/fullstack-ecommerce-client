import { ReactElement } from "react";
import styles from "./css/OverviewLayout.module.css";
import { getLayout as getProductsLayout } from "./ProductsLayout";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  children: JSX.Element;
}

const OverviewLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <main className="spacer-1 main-products">
      <section style={{ display: "flex", flexDirection: "column" }}>
        <h1 className={styles["overview-h1"]}>Overview</h1>
        <nav className={styles["overview-nav"]}>
          <ul>
            <li
              className={
                router.pathname.endsWith("/more/overview/about_us")
                  ? styles.active
                  : ""
              }
            >
              <Link href="/main/more/overview/about_us">
                <a>
                  <i className="fas fa-id-card"></i>
                  <span>About Us</span>
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname.endsWith("/more/overview/services")
                  ? styles.active
                  : ""
              }
            >
              <Link href="/main/more/overview/services">
                <a>
                  <i className="fas fa-hands-helping"></i>
                  <span>Services</span>
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname.endsWith("/more/overview/shipping_and_returns")
                  ? styles.active
                  : ""
              }
            >
              <Link href="/main/more/overview/shipping_and_returns">
                <a>
                  <i className="fas fa-shipping-fast"></i>
                  <span>Shipping & Returns</span>
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname.endsWith("/more/overview/payment_methods")
                  ? styles.active
                  : ""
              }
            >
              <Link href="/main/more/overview/payment_methods">
                <a>
                  <i className="fas fa-comment-dollar"></i>
                  <span>Payment Methods</span>
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname.includes("/more/overview/notice")
                  ? styles.active
                  : ""
              }
            >
              <Link href="/main/more/overview/notice">
                <a>
                  <i className="fas fa-newspaper"></i>
                  <span>Notice</span>
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname.endsWith("/more/overview/contact")
                  ? styles.active
                  : ""
              }
            >
              <Link href="/main/more/overview/contact">
                <a>
                  <i className="fas fa-phone"></i>
                  <span>Contact</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="spacer-1">{children}</div>
      </section>
    </main>
  );
};

export const getLayout = (page: ReactElement) =>
  getProductsLayout(<OverviewLayout>{page}</OverviewLayout>);

export default OverviewLayout;
