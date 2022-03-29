import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import {
  MeDocument,
  MeQuery,
  useGetAllCategoryQuery,
  useGetNumberOfFavoriteByAccountIdQuery,
  useGetNumberOfProductAllTypesQuery,
  useGetNumOfBlogsQuery,
} from "../../../generated/graphql";
import { useAccount } from "../../../utils/AccountProvider";
import { isServer } from "../../../utils/isServer";
import styles from "./Aside.module.css";

interface Props {
  sidebarOpen: boolean;
}

const Aside: React.FC<Props> = ({ sidebarOpen }) => {
  const router = useRouter();
  const urlBeforeOverviewRef = useRef<string>("/main/products/popular");
  const { data: allTypes } = useGetNumberOfProductAllTypesQuery();
  const { data: allCategories } = useGetAllCategoryQuery();
  const client = useApolloClient();
  const meQuery = client.readQuery<MeQuery>({ query: MeDocument });
  const { data: numOfFav } = useGetNumberOfFavoriteByAccountIdQuery({
    variables: { account_id: parseInt(meQuery?.me.account?.id || "0") },
    skip: isServer() || !meQuery?.me.account?.id,
  });
  const { data: numOfBlog } = useGetNumOfBlogsQuery();
  const { accountValue, setDataFromLocalStorage } = useAccount();

  useEffect(() => {
    // console.log("aside, ", router.asPath);
    if (!router.asPath.startsWith("/main/more/overview")) {
      // console.log("prev non-overview url: ", urlBeforeOverviewRef.current);
      urlBeforeOverviewRef.current = router.asPath;
    }
  }, [router.pathname]);

  // console.log(router);

  useEffect(() => {
    if (!isServer() && meQuery?.me.account?.id) {
      setDataFromLocalStorage(meQuery.me.account.id);
    }
  }, [meQuery?.me.account?.id]);

  return (
    <aside className={`${styles.aside} ${sidebarOpen ? styles.open : ""}`}>
      {!router.pathname.includes("/overview") ? (
        <>
          <section id="aside-products">
            <h4>Products</h4>
            <ul>
              <li
                className={
                  router.pathname.endsWith("/products/popular")
                    ? styles.active
                    : ""
                }
              >
                <Link href="/main/products/popular">
                  <a>
                    <i className="fas fa-fire"></i>
                    <span>Popular</span>
                    {allTypes?.getNumberOfProductAllTypes.popular && (
                      <b>{allTypes.getNumberOfProductAllTypes.popular}</b>
                    )}
                  </a>
                </Link>
              </li>
              <li
                className={
                  router.pathname.endsWith("/products/on_sale")
                    ? styles.active
                    : ""
                }
              >
                <Link href="/main/products/on_sale">
                  <a>
                    <i className="fas fa-star"></i>
                    <span>On sale</span>
                    {allTypes?.getNumberOfProductAllTypes.onSale && (
                      <b>{allTypes.getNumberOfProductAllTypes.onSale}</b>
                    )}
                  </a>
                </Link>
              </li>
              <li
                className={
                  router.pathname.endsWith("/products/top_rated")
                    ? styles.active
                    : ""
                }
              >
                <Link href="/main/products/top_rated">
                  <a>
                    <i className="fas fa-thumbs-up"></i>
                    <span>Top rated</span>
                    {allTypes?.getNumberOfProductAllTypes.topRated && (
                      <b>{allTypes.getNumberOfProductAllTypes.topRated}</b>
                    )}
                  </a>
                </Link>
              </li>
              <li
                className={
                  router.pathname.endsWith("products/all") ? styles.active : ""
                }
              >
                <Link href="/main/products/all">
                  <a>
                    <i className="fas fa-globe"></i>
                    <span>All</span>
                    {allTypes?.getNumberOfProductAllTypes.all && (
                      <b>{allTypes.getNumberOfProductAllTypes.all}</b>
                    )}
                  </a>
                </Link>
              </li>
            </ul>
          </section>

          <section id="aside-personal">
            <h4>Customer</h4>
            <ul>
              <li
                className={
                  router.pathname.endsWith("/personal/cart")
                    ? styles.active
                    : ""
                }
              >
                <Link href="/main/personal/cart">
                  <a>
                    <i className="fas fa-shopping-cart"></i>
                    <span>Cart</span>
                    {meQuery?.me.account?.id && (
                      <b>{accountValue.carts.length ?? 0}</b>
                    )}
                  </a>
                </Link>
              </li>
              <li
                className={
                  router.pathname.endsWith("/personal/favorite")
                    ? styles.active
                    : ""
                }
              >
                <Link href="/main/personal/favorite">
                  <a>
                    <i className="fas fa-heart"></i>
                    <span>Favorite</span>
                    {(numOfFav?.getNumberOfFavoriteByAccountID ?? -1) >= 0 && (
                      <b>{numOfFav.getNumberOfFavoriteByAccountID}</b>
                    )}
                  </a>
                </Link>
              </li>
              <li
                className={
                  router.pathname.endsWith("/personal/profile")
                    ? styles.active
                    : ""
                }
              >
                <Link href="/main/personal/profile">
                  <a>
                    <i className="fas fa-user"></i>
                    <span>Profile</span>
                  </a>
                </Link>
              </li>
              <li
                className={
                  router.pathname.endsWith("/personal/add_product")
                    ? styles.active
                    : ""
                }
              >
                <Link href="/main/personal/add_product">
                  <a>
                    <i className="fas fa-plus"></i>
                    <span>Add Product</span>
                  </a>
                </Link>
              </li>
            </ul>
          </section>

          <section id="aside-personal">
            <h4>Categories</h4>
            <ul>
              {allCategories?.getAllCategory &&
                allCategories.getAllCategory.categories.map((category) => (
                  <li
                    key={category.name}
                    className={
                      router.asPath.endsWith(
                        `/categories/${category.name.split(" ").join("_")}`
                      )
                        ? styles.active
                        : ""
                    }
                  >
                    <Link
                      href={`/main/categories/${category.id}_${category.name
                        .split(" ")
                        .join("_")}`}
                    >
                      <a>
                        <img src={category.img_url} alt={category.name} />
                        <span>{category.name}</span>
                        <b>{category.number_of_product}</b>
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>

          <section id="aside-more">
            <h4>More about us</h4>
            <ul>
              <li
                className={
                  router.pathname.includes(`/more/overview`)
                    ? styles.active
                    : ""
                }
              >
                <Link href={`/main/more/overview/about_us`}>
                  <a>
                    <i className="fas fa-network-wired"></i>
                    <span>Overview</span>
                  </a>
                </Link>
              </li>
              <li
                className={
                  router.pathname.endsWith(`/more/sales_and_marketing`)
                    ? styles.active
                    : ""
                }
              >
                <Link href={`/main/more/sales_and_marketing`}>
                  <a>
                    <i className="fas fa-poll"></i>
                    <span>Sales & Marketing</span>
                  </a>
                </Link>
              </li>
              <li
                className={
                  router.pathname.endsWith(`/more/forum`) ? styles.active : ""
                }
              >
                <Link href={`/main/more/forum`}>
                  <a>
                    <i className="fab fa-wpforms"></i>
                    <span>Forum</span>
                    <b>{numOfBlog?.getNumOfBlogs ?? 0}</b>
                  </a>
                </Link>
              </li>
              <li
                className={
                  router.pathname.endsWith(`/more/faq`) ? styles.active : ""
                }
              >
                <Link href={`/main/more/faq`}>
                  <a>
                    <i className="fas fa-question-circle"></i>
                    <span>FAQ</span>
                  </a>
                </Link>
              </li>
            </ul>
          </section>
        </>
      ) : (
        <>
          <Link href={urlBeforeOverviewRef.current}>
            <a>
              <i className="fas fa-arrow-left"></i>
              <span>Go back</span>
            </a>
          </Link>

          <section className={styles["aside-overview"]} id="aside-overview">
            <h4>Overview</h4>
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
                  router.pathname.endsWith(
                    "/more/overview/shipping_and_returns"
                  )
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
          </section>
        </>
      )}
      <div className="spacer-1"></div>

      <section className={styles["aside-footer"]} id="aside-footer">
        <h1>
          <i className="fas fa-pepper-hot"></i>
          Banana
        </h1>
        <p>
          548 Market Street #87043
          <br />
          San Francisco, CA 94104
          <br />
          (855) 432-8623
        </p>
        <div className={styles["aside-footer-icons"]}>
          <i className={`${styles.fab} fab fa-facebook`}></i>
          <i className={`${styles.fab} fab fa-twitter`}></i>
          <i className={`${styles.fab} fab fa-instagram`}></i>
        </div>
      </section>
    </aside>
  );
};

export default Aside;
