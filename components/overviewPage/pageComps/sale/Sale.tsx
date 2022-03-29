import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import {
  useGetNumOfUserProductOrderBlogQuery,
  useGetRecentAccountQuery,
  useGetRecentOrderProductsQuery,
  useMeQuery,
} from "../../../../generated/graphql";
import { getDate } from "../../../../utils/getDate";
import { Bar, PolarArea } from "./charts";
import styles from "./Sale.module.css";
dayjs.extend(relativeTime);

interface Props {}

const Sale: React.FC<Props> = () => {
  const { data: numOfAllQuery } = useGetNumOfUserProductOrderBlogQuery();
  const { data: recentOrderQuery, fetchMore: fetchMoreRecentOrder } =
    useGetRecentOrderProductsQuery();
  const { data: recentAccountQuery } = useGetRecentAccountQuery();
  const { data: meQuery } = useMeQuery();
  const router = useRouter();

  return (
    <section className={styles.sale}>
      <h1 className={styles["sale-list-h1"]}>Sales and Marketing</h1>

      <div className={styles["sale-container"]}>
        <div className={styles["sale-stats"]}>
          <article>
            <div className={styles["num"]}>
              <h3>
                {numOfAllQuery?.getNumOfUserProductOrderBlog.total_user || 0}
              </h3>
              <p>Users</p>
            </div>
            <div className={styles["icon"]}>
              <i className="far fa-user"></i>
            </div>
          </article>

          <article>
            <div className={styles["num"]}>
              <h3>
                {numOfAllQuery?.getNumOfUserProductOrderBlog.total_product || 0}
              </h3>
              <p>Products</p>
            </div>
            <div className={styles["icon"]}>
              <i className="fas fa-shopping-cart"></i>
            </div>
          </article>

          <article>
            <div className={styles["num"]}>
              <h3>
                {numOfAllQuery?.getNumOfUserProductOrderBlog.total_order || 0}
              </h3>
              <p>Orders</p>
            </div>
            <div className={styles["icon"]}>
              <i className="fas fa-shopping-bag"></i>
            </div>
          </article>

          <article>
            <div className={styles["num"]}>
              <h3>
                {numOfAllQuery?.getNumOfUserProductOrderBlog.total_blog || 0}
              </h3>
              <p>Blogs</p>
            </div>
            <div className={styles["icon"]}>
              <i className="fas fa-comments"></i>
            </div>
          </article>
        </div>

        <div className={styles["charts"]}>
          <div className={styles["polar-chart"]}>
            <div className={styles["chartBx"]}>
              <PolarArea />
            </div>
          </div>
          <div className={styles["bar-chart"]}>
            <div className={styles["chartBx"]}>
              <Bar />
            </div>
          </div>
        </div>

        <div className={styles["sale-and-customers"]}>
          <div className={styles["orders"]}>
            <h2>
              <span>Recent Orders</span>
              {recentOrderQuery &&
                recentOrderQuery.getRecentOrderProducts.hasMore && (
                  <button
                    onClick={() =>
                      fetchMoreRecentOrder({
                        variables: {
                          offset:
                            recentOrderQuery.getRecentOrderProducts.recentOrder
                              .length,
                        },
                        updateQuery: (
                          previousQueryResult,
                          { fetchMoreResult }
                        ) => {
                          return {
                            ...fetchMoreResult,
                            getRecentOrderProducts: {
                              ...fetchMoreResult.getRecentOrderProducts,
                              recentOrder: [
                                ...previousQueryResult.getRecentOrderProducts
                                  .recentOrder,
                                ...fetchMoreResult.getRecentOrderProducts
                                  .recentOrder,
                              ],
                            },
                          };
                        },
                      })
                    }
                  >
                    View more
                  </button>
                )}
            </h2>
            <div className={styles["order-container"]}>
              <ul>
                <li>
                  <p className={styles["name"]}>Name</p>
                  <p className={styles["price"]}>Price</p>
                  <p className={styles["payment"]}>Payment</p>
                  <p className={styles["status"]}>status</p>
                </li>
                {recentOrderQuery &&
                  recentOrderQuery.getRecentOrderProducts.recentOrder.length >
                    0 &&
                  recentOrderQuery.getRecentOrderProducts.recentOrder.map(
                    (order, i) => (
                      <li
                        key={i}
                        onClick={() =>
                          router.push(
                            `/main/products/singleProduct/${order.product_id}`
                          )
                        }
                      >
                        <p className={styles["name"]}>
                          <img src={order.product_img_url} alt="" />
                          <span>{order.product_name}</span>
                        </p>
                        <p className={styles["price"]}>
                          <small>$</small>
                          {order.product_price.toFixed(2)}
                        </p>
                        <p
                          className={`${styles["payment"]} ${
                            styles[order.payment.toLocaleLowerCase()]
                          }`}
                        >
                          <span>{order.payment}</span>
                        </p>
                        <p
                          className={`${styles["status"]} ${
                            styles[
                              order.status
                                .toLocaleLowerCase()
                                .replaceAll(" ", "-")
                            ]
                          }`}
                        >
                          <span>{order.status}</span>
                        </p>
                      </li>
                    )
                  )}
              </ul>
            </div>
          </div>

          <div className={styles["customers"]}>
            <h2>
              <span>Recent Customers</span>
            </h2>
            <div className={styles["user-container"]}>
              <ul>
                {recentAccountQuery &&
                  recentAccountQuery.getRecentAccount.accounts.length > 0 &&
                  recentAccountQuery.getRecentAccount.accounts.map(
                    (user, i) => (
                      <li
                        key={i}
                        onClick={() => {
                          if (meQuery?.me.account?.id === user.id)
                            router.push("/main/personal/profile");
                          else
                            router.push(
                              `/main/personal/profile?account_id=${user.id}`
                            );
                        }}
                      >
                        <div className={styles["imgBx"]}>
                          <img src={user.img_url} alt="" />
                        </div>
                        <div className={styles["user-info"]}>
                          <h4>{user.name}</h4>
                          <p>
                            {dayjs(
                              getDate(parseInt(user.createdAt), true)
                            ).fromNow()}
                          </p>
                        </div>
                      </li>
                    )
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sale;
