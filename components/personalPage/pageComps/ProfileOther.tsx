import { useRouter } from "next/router";
import React, { useState } from "react";
import { OrderStatus } from "../../../dummyData/recentOrders";
import {
  OrderDetail,
  useGetNumOfPostAndBlogQuery,
  useGetOrdersByAccountIdQuery,
  useGetProductByCreatedByQuery,
  useMeQuery,
  useOtherUserQuery,
} from "../../../generated/graphql";
import gridStyles from "../../../styles/ProductGrid.module.css";
import { getDate } from "../../../utils/getDate";
import { ProductArticle } from "../../ProductsPage";
import styles from "./Profile.module.css";

interface Props {
  account_id: string;
}

const ProfileOther: React.FC<Props> = ({ account_id }) => {
  const [viewDescription, toggleViewDescription] = useState<boolean>(false);
  const router = useRouter();
  const { data: meQuery, loading } = useMeQuery();
  const { data: otherUserQuery } = useOtherUserQuery({
    skip: !meQuery?.me.account?.id,
    variables: { account_id },
  });
  const { data: productByCreatedByQuery, fetchMore: fetchMoreUserProducts } =
    useGetProductByCreatedByQuery({
      skip: !meQuery?.me.account?.id,
      variables: {
        createdBy: parseInt(account_id),
        limit: 3,
      },
    });
  const { data: orderByAccountID, fetchMore: fetchMoreOrders } =
    useGetOrdersByAccountIdQuery({
      skip: !meQuery?.me.account?.id,
      variables: {
        account_id: parseInt(account_id),
        limit: 3,
      },
    });
  const { data: NumOfPostAndBlogQuery } = useGetNumOfPostAndBlogQuery({
    skip: !meQuery?.me.account?.id,
    variables: { account_id },
  });

  const calcHistoryStatus = (orders: OrderDetail[]) => {
    const statusCount: Record<OrderStatus, number> = {
      Pending: 0,
      "In Progress": 0,
      Cancel: 0,
      Delievered: 0,
      Return: 0,
    };

    orders.forEach((order) => {
      order.products.forEach(({ status }) => statusCount[status]++);
    });

    return Object.keys(statusCount).map((s) => ({
      status: s,
      count: statusCount[s],
    }));
  };

  const viewProductPage = (product_id: string) =>
    router.replace(`/main/products/singleProduct/${product_id}`);

  const getStatusClassName = (status: string) =>
    "status-" +
    status
      .split(" ")
      .map((str) => str.toLocaleLowerCase())
      .join("-") +
    "-background";

  const returnJSX = () => {
    if (loading) return <div>Loading...</div>;
    const user = meQuery.me.account;
    if (!user) {
      router.replace("/login");
      return null;
    }
    return (
      <div className={styles["profile-container"]}>
        <div className={styles["profile-header"]}>
          <h2>{otherUserQuery?.otherUser.account?.name ?? "Not found"}</h2>
          {otherUserQuery?.otherUser.account && (
            <h5>
              Account{" "}
              {otherUserQuery?.otherUser.account?.createdAt ===
              otherUserQuery?.otherUser.account?.updateAt
                ? "created"
                : "updated"}{" "}
              on{" "}
              {getDate(
                parseInt(
                  otherUserQuery?.otherUser.account?.createdAt ===
                    otherUserQuery?.otherUser.account?.updateAt
                    ? otherUserQuery?.otherUser.account?.createdAt
                    : otherUserQuery?.otherUser.account?.updateAt
                ),
                true
              )}
            </h5>
          )}
          <button className={styles["logout"]} onClick={() => router.back()}>
            Go back
          </button>
        </div>

        <div className={styles["top"]}>
          <div className={styles["imgBx"]}>
            <img
              src={
                otherUserQuery?.otherUser.account?.img_url ??
                "/images/default_user.png"
              }
              alt=""
            />
          </div>
          <div className={styles["profile-info"]}>
            <h3>
              <i className="fas fa-user"></i>
              <span>User Profile</span>
              <button onClick={() => toggleViewDescription((prev) => !prev)}>
                {viewDescription ? "Overview" : "About me"}
              </button>
            </h3>

            <div className={styles["infoBx"]}>
              {!viewDescription ? (
                <>
                  <p className={styles["name"]}>
                    <span>Name</span>
                    <b>
                      {otherUserQuery?.otherUser.account?.name || "Not found"}
                    </b>
                  </p>
                  <p className={styles["email"]}>
                    <span>Email</span>
                    <b>
                      {otherUserQuery?.otherUser.account?.email || "Not found"}
                    </b>
                  </p>
                  <p className={styles["phone"]}>
                    <span>Phone</span>
                    <b>
                      {otherUserQuery?.otherUser.account?.phone || "Not set"}
                    </b>
                  </p>
                  <p className={styles["address"]}>
                    <span>Address</span>
                    <b>
                      {otherUserQuery?.otherUser.account?.address || "Not set"}
                    </b>
                  </p>{" "}
                </>
              ) : (
                <p className={styles["description"]}>
                  <span>About me</span>
                  <b>
                    {otherUserQuery?.otherUser.account?.description ||
                      "User doesn't have personal description."}
                  </b>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={styles["sale-stats"]}>
          <article>
            <div className={styles["num"]}>
              <h3>{orderByAccountID?.getOrdersByAccountID.total || 0}</h3>
              <p>Orders</p>
            </div>
            <div className={styles["icon"]}>
              <i className="fas fa-shopping-bag"></i>
            </div>
          </article>

          <article>
            <div className={styles["num"]}>
              <h3>
                {NumOfPostAndBlogQuery?.getNumOfPostAndBlog.total_post || 0}
              </h3>
              <p>Posts</p>
            </div>
            <div className={styles["icon"]}>
              <i className="fas fa-comment-alt"></i>
            </div>
          </article>

          <article>
            <div className={styles["num"]}>
              <h3>
                {NumOfPostAndBlogQuery?.getNumOfPostAndBlog.total_blog || 0}
              </h3>
              <p>Blogs</p>
            </div>
            <div className={styles["icon"]}>
              <i className="fas fa-comments"></i>
            </div>
          </article>

          <article>
            <div className={styles["num"]}>
              <h3>
                {productByCreatedByQuery?.getProductByCreatedBy.total || 0}
              </h3>
              <p>Added Products</p>
            </div>
            <div className={styles["icon"]}>
              <i className="fas fa-calendar-plus"></i>{" "}
            </div>
          </article>
        </div>

        <div className={styles["added-products"]}>
          <div className={styles["added-products-header"]}>
            <h2>
              <span>User's Products</span>
              {productByCreatedByQuery && (
                <b>{productByCreatedByQuery.getProductByCreatedBy.total}</b>
              )}
              {meQuery?.me.account?.id &&
                productByCreatedByQuery?.getProductByCreatedBy.hasMore && (
                  <button
                    onClick={() =>
                      fetchMoreUserProducts({
                        variables: {
                          createdBy: parseInt(account_id),
                          offset:
                            productByCreatedByQuery?.getProductByCreatedBy
                              .products.length,
                          limit: 20,
                        },
                        updateQuery: (
                          previousQueryResult,
                          { fetchMoreResult }
                        ) => ({
                          ...fetchMoreResult,
                          getProductByCreatedBy: {
                            ...fetchMoreResult.getProductByCreatedBy,
                            products: [
                              ...previousQueryResult.getProductByCreatedBy
                                .products,
                              ...fetchMoreResult.getProductByCreatedBy.products,
                            ],
                          },
                        }),
                      })
                    }
                  >
                    View more
                  </button>
                )}
            </h2>
          </div>
          <div
            className={gridStyles["products-grid"]}
            style={{ marginTop: "1em" }}
          >
            {!productByCreatedByQuery && <div>Loading user's products...</div>}
            {productByCreatedByQuery?.getProductByCreatedBy.products &&
              productByCreatedByQuery.getProductByCreatedBy.products.length ===
                0 && (
                <div>
                  <h5>User haven't created any products yet</h5>
                </div>
              )}
            {productByCreatedByQuery?.getProductByCreatedBy.products &&
              productByCreatedByQuery?.getProductByCreatedBy.products.map(
                (product, pI) => (
                  <ProductArticle
                    key={pI}
                    product={product}
                    articleStyle={{
                      background: "transparent",
                      boxShadow: "3px 8px 16px 3px rgb(0 0 0 / 70%)",
                    }}
                  />
                )
              )}
          </div>
        </div>

        <div className={styles["orders"]}>
          <div className={styles["orders-header"]}>
            <h2>
              <span>Order History</span>
              {orderByAccountID && (
                <b>{orderByAccountID.getOrdersByAccountID.total}</b>
              )}
              {meQuery?.me.account?.id &&
                orderByAccountID?.getOrdersByAccountID.hasMore && (
                  <button
                    onClick={() =>
                      fetchMoreOrders({
                        variables: {
                          account_id: parseInt(account_id),
                          offset:
                            orderByAccountID.getOrdersByAccountID.orders.length,
                          limit: 20,
                        },
                        updateQuery: (
                          previousQueryResult,
                          { fetchMoreResult }
                        ) => ({
                          ...fetchMoreResult,
                          getOrdersByAccountID: {
                            ...fetchMoreResult.getOrdersByAccountID,
                            orders: [
                              ...previousQueryResult.getOrdersByAccountID
                                .orders,
                              ...fetchMoreResult.getOrdersByAccountID.orders,
                            ],
                          },
                        }),
                      })
                    }
                  >
                    View more
                  </button>
                )}
            </h2>
            {orderByAccountID?.getOrdersByAccountID.orders &&
              orderByAccountID?.getOrdersByAccountID.orders.length > 0 && (
                <div className={styles["orders-status-lists"]}>
                  <ul>
                    {calcHistoryStatus(
                      orderByAccountID.getOrdersByAccountID.orders
                    ).map(({ status, count }, i) => (
                      <li
                        className={styles[getStatusClassName(status)]}
                        key={i}
                      >
                        <span>{status}</span>
                        <b>{count}</b>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          <div className={styles["orders-body"]}>
            {!orderByAccountID && <div>Loading user's orders...</div>}
            {orderByAccountID?.getOrdersByAccountID.orders &&
              orderByAccountID.getOrdersByAccountID.orders.length === 0 && (
                <div>
                  <h5>User haven't ordered anything yet</h5>
                </div>
              )}
            {orderByAccountID?.getOrdersByAccountID.orders &&
              orderByAccountID.getOrdersByAccountID.orders.length > 0 &&
              orderByAccountID.getOrdersByAccountID.orders.map(
                ({ updateAt, products }, i) => (
                  <article key={i}>
                    <h4>
                      <i className="far fa-clock"></i>{" "}
                      {getDate(parseInt(updateAt), true)}
                      <span>
                        Items: {products.length} Total: <small>$</small>
                        {products
                          .reduce((acc, cur) => {
                            acc += cur.product_price * cur.quantity;
                            return acc;
                          }, 0)
                          .toFixed(2)}
                      </span>
                    </h4>

                    <div className={styles["history-lists"]}>
                      {products.map((product, pI) => (
                        <div key={pI} className={styles["history"]}>
                          <div
                            onClick={() => viewProductPage(product.product_id)}
                            className={styles["imgBx"]}
                          >
                            <img
                              src={product.product_img_url.split("<br/>")[0]}
                              alt=""
                            />
                          </div>
                          <div className={styles["info"]}>
                            <div className={styles["left-info"]}>
                              <p
                                onClick={() =>
                                  viewProductPage(product.product_id)
                                }
                              >
                                {product.product_name}
                              </p>
                              <span>Quantity: {product.quantity}</span>
                            </div>
                            <div className={styles["right-info"]}>
                              <p>
                                <small>$</small>
                                {product.product_price.toFixed(2)}
                              </p>
                              <span>
                                <i className="fas fa-credit-card"></i>{" "}
                                {product.payment}{" "}
                                <b
                                  className={
                                    styles[getStatusClassName(product.status)]
                                  }
                                >
                                  {product.status}
                                </b>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                )
              )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.profile} id="single-product">
      <h1 className={styles["profile-list-h1"]}>Profile</h1>
      {returnJSX()}
    </section>
  );
};

export default ProfileOther;
