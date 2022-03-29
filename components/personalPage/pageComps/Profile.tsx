import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { Loading } from "..";
import { OrderStatus } from "../../../dummyData/recentOrders";
import {
  GetNumOfUserProductOrderBlogDocument,
  MeDocument,
  MeQuery,
  OrderDetail,
  useGetNumOfPostAndBlogQuery,
  useGetOrdersByAccountIdQuery,
  useGetProductByCreatedByQuery,
  useLogoutMutation,
  useMeQuery,
  useUpdateUserMutation,
} from "../../../generated/graphql";
import gridStyles from "../../../styles/ProductGrid.module.css";
import { ProfileForm } from "../../../types";
import { useAccount } from "../../../utils/AccountProvider";
import { getDate } from "../../../utils/getDate";
import { setUserUpdateData } from "../../../utils/setUserUpdateData";
import { validateUpdateUserData } from "../../../utils/validateUpdateUserData";
import { ProductArticle } from "../../ProductsPage";
import styles from "./Profile.module.css";

interface Props {}

const Profile: React.FC<Props> = () => {
  const [editing, toggleEditing] = useState<boolean>(false);
  const [viewDescription, toggleViewDescription] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProfileForm>(null);
  const [isLoading, toggleIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const client = useApolloClient();
  const { data: meQuery, loading } = useMeQuery();
  const { data: productByCreatedByQuery, fetchMore: fetchMoreUserProducts } =
    useGetProductByCreatedByQuery({
      skip: !meQuery?.me.account?.id,
      variables: {
        createdBy: parseInt(meQuery?.me.account?.id ?? "0"),
        limit: 3,
      },
    });
  const { data: orderByAccountID, fetchMore: fetchMoreOrders } =
    useGetOrdersByAccountIdQuery({
      skip: !meQuery?.me.account?.id,
      variables: {
        account_id: parseInt(meQuery?.me.account?.id ?? "0"),
        limit: 3,
      },
    });
  const { data: NumOfPostAndBlogQuery } = useGetNumOfPostAndBlogQuery({
    skip: !meQuery?.me.account?.id,
    variables: { account_id: meQuery?.me.account?.id ?? "0" },
  });
  const [logout] = useLogoutMutation();
  const [updateUser] = useUpdateUserMutation();
  const { deleteDataFromLocalStorage } = useAccount();

  useEffect(() => {
    if (meQuery?.me.account) {
      const { name, email, phone, address, description, img_url } =
        meQuery.me.account;
      setFormData({
        name,
        email,
        phone: phone ?? "",
        address: address ?? "",
        description: description ?? "",
        img_url,
      });
    }
  }, [meQuery?.me.account]);

  useEffect(() => {
    // console.log("image change");
    if (!formData?.image) return;

    const reader = new FileReader();

    reader.onloadend = (e) => {
      setFormData((prev) => ({
        ...prev,
        img_src: e.target.result as string,
      }));
    };

    reader.onerror = () => {
      window.alert("Sorry! Your image cannot be accepted.");
      setFormData((prev) => ({ ...prev, img_src: "", image: null }));
    };

    reader.readAsDataURL(formData.image);
  }, [formData?.image]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    if (!validateUpdateUserData(formData, meQuery.me.account))
      return window.alert("Nothing chang! No need to update");

    if (!window.confirm("Are you sure you want to update your profile?"))
      return;

    const userUpdateData = setUserUpdateData(formData, meQuery.me.account);

    // console.log("userUpdateData - ", userUpdateData);
    // console.log("user_img - ", formData.image || null);

    toggleIsLoading(true);
    await updateUser({
      variables: {
        account_id: meQuery?.me.account?.id,
        userUpdateData,
        user_img: formData.image || null,
      },
      refetchQueries: [{ query: GetNumOfUserProductOrderBlogDocument }],
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data?.updateUser,
          },
        });
        window.alert("Your profile has been updated successfully!");
        toggleEditing(false);
        setFormData(null);
      },
      onError: (err) => {
        console.log("failed to update user - ", err);
        if (err.message.startsWith("Access denied")) {
          if (
            window.confirm("You have been logged out. Please log in again.")
          ) {
            const cache = client.cache;
            cache.evict({ id: cache.identify(meQuery.me) });
            router.replace("/login");
          }
        } else if (err.message.startsWith("Duplicate entry")) {
          window.alert("Username has been taken. Please try another one!");
        } else {
          window.alert("Something went wrong. Please try again!");
        }
      },
    });
    toggleIsLoading(false);
  };

  const handleLogOut = async () => {
    try {
      await logout();
      localStorage.removeItem("ecommerce_access_token");
      client.resetStore();
      deleteDataFromLocalStorage();
    } catch (e) {
      console.log(e);
    }
  };

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
          <h2>{user.name}</h2>
          <h5>
            Account {user.createdAt === user.updateAt ? "created" : "updated"}{" "}
            on{" "}
            {getDate(
              parseInt(
                user.createdAt === user.updateAt
                  ? user.createdAt
                  : user.updateAt
              ),
              true
            )}
          </h5>
          <button className={styles["logout"]} onClick={handleLogOut}>
            Logout
          </button>
        </div>

        <div className={styles["top"]}>
          {isLoading && <Loading />}
          <div className={styles["imgBx"]}>
            <img src={formData?.img_src || user.img_url} alt="" />
          </div>
          <div className={styles["profile-info"]}>
            <h3>
              <i className="fas fa-user"></i>
              <span>User Profile</span>
              <button onClick={() => toggleViewDescription((prev) => !prev)}>
                {viewDescription ? "Overview" : "About me"}
              </button>
            </h3>
            {!editing && (
              <div className={styles["infoBx"]}>
                {!viewDescription ? (
                  <>
                    <p className={styles["name"]}>
                      <span>Name</span>
                      <b>{user.name}</b>
                    </p>
                    <p className={styles["email"]}>
                      <span>Email</span>
                      <b>{user.email}</b>
                    </p>
                    <p className={styles["phone"]}>
                      <span>Phone</span>
                      <b>{user.phone || "Not set"}</b>
                    </p>
                    <p className={styles["address"]}>
                      <span>Address</span>
                      <b>{user.address || "Not set"}</b>
                    </p>{" "}
                  </>
                ) : (
                  <p className={styles["description"]}>
                    <span>About me</span>
                    <b>
                      {user.description ||
                        "You don't have your personal description. Click 'Edit Profile' to write something about yourself"}
                    </b>
                  </p>
                )}
              </div>
            )}
            {editing && (
              <form onSubmit={handleSubmit} className={styles["infoBx"]}>
                {!viewDescription ? (
                  <>
                    <p className={styles["name"]}>
                      <span>Name</span>
                      <input
                        placeholder="username"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </p>
                    <p className={styles["email"]}>
                      <span>Email</span>
                      <input
                        placeholder="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </p>
                    <p className={styles["phone"]}>
                      <span>Phone</span>
                      <input
                        placeholder="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                      />
                    </p>
                    <p className={styles["address"]}>
                      <span>Address</span>
                      <textarea
                        placeholder="address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        rows={2}
                      />
                    </p>
                  </>
                ) : (
                  <p className={styles["description"]}>
                    <span>About me</span>
                    <textarea
                      placeholder="Write something about you..."
                      required
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={6}
                    />
                  </p>
                )}
                {editing && (
                  <>
                    <div
                      className="spacer-1"
                      style={{
                        minHeight: 8,
                        borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                      }}
                    ></div>
                    <div className={styles["edit-btns"]}>
                      <label>
                        <input
                          type="file"
                          accept="image/jpg, image/jpeg, image/png, image/tiff"
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              image: e.target.files[0],
                            }))
                          }
                        />
                        <i className="fas fa-plus"></i>Choose your profile image
                      </label>
                      <p>
                        <label>
                          <input type="submit" value="Submit" />
                          <i className="fas fa-check"></i>
                          Submit
                        </label>
                        <button onClick={() => toggleEditing((p) => !p)}>
                          <i className="fas fa-times"></i>Cancel
                        </button>
                      </p>
                    </div>
                  </>
                )}
              </form>
            )}
            {!editing && (
              <>
                <div
                  className="spacer-1"
                  style={{
                    minHeight: 8,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                  }}
                ></div>
                <button onClick={() => toggleEditing((p) => !p)}>
                  <i className="far fa-edit"></i>Edit Profile
                </button>
              </>
            )}
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
              <span>Your Products</span>
              {productByCreatedByQuery && (
                <b>{productByCreatedByQuery.getProductByCreatedBy.total}</b>
              )}
              {meQuery?.me.account?.id &&
                productByCreatedByQuery?.getProductByCreatedBy.hasMore && (
                  <button
                    onClick={() =>
                      fetchMoreUserProducts({
                        variables: {
                          createdBy: parseInt(meQuery.me.account.id),
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
            {!productByCreatedByQuery && <div>Loading your products...</div>}
            {productByCreatedByQuery?.getProductByCreatedBy.products &&
              productByCreatedByQuery.getProductByCreatedBy.products.length ===
                0 && (
                <div>
                  <h5>You haven't created any products yet</h5>
                  <button
                    onClick={() => router.push("/main/personal/add_product")}
                  >
                    Create your product
                  </button>
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
                          account_id: parseInt(meQuery.me.account.id),
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
            {!orderByAccountID && <div>Loading your orders...</div>}
            {orderByAccountID?.getOrdersByAccountID.orders &&
              orderByAccountID.getOrdersByAccountID.orders.length === 0 && (
                <div>
                  <h5>You haven't ordered anything yet</h5>
                  <button onClick={() => router.push("/main/products/popular")}>
                    View our popular products
                  </button>
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

export default Profile;
