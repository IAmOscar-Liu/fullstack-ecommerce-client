import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  GetAllCategoryDocument,
  GetFavoriteByAccountIdDocument,
  GetMostCommentsPostsByProductIdDocument,
  GetMostLikePostsByProductIdDocument,
  GetNumberOfFavoriteByAccountIdDocument,
  GetNumberOfProductAllTypesDocument,
  GetNumOfPostAndBlogDocument,
  GetNumOfPostsByProductIdDocument,
  GetPostsByProductIdDocument,
  GetProductDetailDocument,
  GetProductDetailQuery,
  MeDocument,
  MeQuery,
  useCreateFavoriteProductMutation,
  useCreatePostMutation,
  useFreezeOrUnFreezeProductMutation,
  useGetNumOfPostsByProductIdQuery,
  useGetProductDetailQuery,
  useRateProductMutation,
} from "../../../generated/graphql";
import gridStyles from "../../../styles/ProductGrid.module.css";
import { PostSortType } from "../../../types";
import { useAccount } from "../../../utils/AccountProvider";
import { getDate } from "../../../utils/getDate";
import { Bar, PolarArea } from "./charts";
import ProductArticle from "./ProductArticle";
import RatingPopup from "./RatingPopup";
import styles from "./SingleProduct.module.css";
import SingleProductPost from "./SingleProductPost";

interface Props {
  product_id: number;
}

const Product: React.FC<Props> = ({ product_id }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [showPosts, toggleShowPosts] = useState<boolean>(false);
  const [postSortType, setPostSortType] = useState<string>(PostSortType[0]);
  const [addPostContent, setAddPostContent] = useState<string>("");
  const [isRating, toggleIsRating] = useState<boolean>(false);
  const [productImgIdx, setProductImgIdx] = useState<number>(0);
  const postTypeSelectMenu = useRef<HTMLLabelElement>(null);
  const commentTypeSelectMenu = useRef<(HTMLLabelElement | undefined)[]>([]);
  const router = useRouter();
  const client = useApolloClient();
  const meQuery = client.readQuery<MeQuery>({ query: MeDocument });
  const {
    data: productDetailData,
    loading: productDetailLoading,
    error: productDetailError,
  } = useGetProductDetailQuery({
    variables: { product_id },
  });
  const { data: numOfProductQuery } = useGetNumOfPostsByProductIdQuery({
    variables: { product_id },
  });
  const [createPost] = useCreatePostMutation();
  const [rateProduct] = useRateProductMutation();
  const [createFavoriteProduct] = useCreateFavoriteProductMutation();
  const [freezeOrUnFreezeProduct] = useFreezeOrUnFreezeProductMutation();
  const { accountValue, setAccountValue } = useAccount();

  const handlePostSortTypeClick = (type: string) => {
    setPostSortType(type);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const elTarget = e.target as HTMLElement;

      // console.log(e.target);
      // console.log((typeSelectMenu.current).contains(elTarget));

      if (
        !postTypeSelectMenu?.current ||
        !commentTypeSelectMenu?.current ||
        postTypeSelectMenu.current.contains(elTarget) ||
        commentTypeSelectMenu.current.some((c) => c && c.contains(elTarget)) ||
        elTarget.id === "posts-sort-type-checkbox" ||
        /comments-[0-9]+-sort-type-checkbox/.test(elTarget.id)
      )
        return;

      (
        document.getElementById("posts-sort-type-checkbox") as HTMLInputElement
      ).checked = false;
      (
        document.querySelectorAll(
          "input[type='checkbox'].comments-sort-type-checkbox"
        ) as NodeListOf<HTMLInputElement>
      ).forEach((el) => (el.checked = false));
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const goToUser = (user_id: string) => {
    if (!user_id || !meQuery?.me.account?.id) return;

    if (meQuery.me.account.id === user_id) {
      router.push(`/main/personal/profile`);
    } else {
      router.push(`/main/personal/profile?account_id=${user_id}`);
    }
  };

  const clearMeQuery = () => {
    const cache = client.cache;
    // cache.evict({ id: cache.identify(meQuery.me) });

    cache.writeQuery<MeQuery>({
      query: MeDocument,
      data: {
        __typename: "Query",
        me: {},
      },
    });
  };

  const handleSetQuantity = (operator: number) => {
    if (operator === -1 && quantity === 1) return;
    if (operator === 1 && quantity === 10) return;
    setQuantity((prev) => (prev += operator));
  };

  const createDescription = (description: string) => {
    const paragraphes = description.split(/<br\s*\/>/);

    if (paragraphes.length === 1) return <>{description}</>;
    return (
      <ul>
        {paragraphes.map((para, paraIdx) => (
          <li key={paraIdx}>
            <b>{paraIdx + 1}.</b>
            {para}
          </li>
        ))}
      </ul>
    );
  };

  const handleRateProduct = async (score: number) => {
    console.log("Your score: ", score);
    if (score === 0) return;

    const account_id = meQuery?.me.account?.id;
    if (!account_id) {
      if (window.confirm("You are not logging in. \nLogin in now?")) {
        router.push("/login");
        return;
      }
      return;
    }

    await rateProduct({
      variables: {
        rateInput: {
          product_id: productDetailData.getProductDetail?.id,
          account_id,
          score,
        },
      },
      update: (cache, { data }) => {
        window.alert("Thanks for your rating!");
        cache.writeQuery<GetProductDetailQuery, { product_id: number }>({
          query: GetProductDetailDocument,
          variables: { product_id },
          data: {
            ...productDetailData,
            getProductDetail: {
              ...productDetailData.getProductDetail,
              avg_rating: data.rateProduct.avg_rating,
              rating_times: data.rateProduct.rating_times,
            },
          },
        });
      },
      onError: (err) => {
        console.log("Fail to rate this product - ", err.message);
        if (err.message.startsWith("Access denied")) {
          if (
            window.confirm("You have been logged out. Please log in again.")
          ) {
            clearMeQuery();
            router.push("/login");
          }
        } else if (err.message.startsWith("Duplicate entry")) {
          window.alert("You have already rated this product.");
        } else window.alert("Something went wrong. Please try again!");
      },
    });
  };

  const handleAddPost = async () => {
    const account_id = meQuery?.me.account?.id;
    if (!account_id) {
      if (window.confirm("You are not logging in. \nLogin in now?")) {
        return router.push("/login");
      }
      return;
    }

    if (!addPostContent) {
      return window.alert("Comment can't be empty");
    }

    await createPost({
      variables: {
        postInput: {
          account_id,
          product_id: productDetailData.getProductDetail?.id,
          content: addPostContent,
        },
      },
      refetchQueries: [
        { query: GetNumOfPostsByProductIdDocument, variables: { product_id } },
        { query: GetPostsByProductIdDocument, variables: { product_id } },
        {
          query: GetMostCommentsPostsByProductIdDocument,
          variables: { product_id },
        },
        {
          query: GetMostLikePostsByProductIdDocument,
          variables: { product_id },
        },
        {
          query: GetNumOfPostAndBlogDocument,
          variables: { account_id: meQuery?.me.account?.id ?? "0" },
        },
      ],
      update: () => {
        // window.alert("Your blog is created successfully!");
        setAddPostContent("");
      },
      onError: (err) => {
        console.log("Fail to create post - ", err.message);
        if (err.message.startsWith("Access denied")) {
          if (
            window.confirm("You have been logged out. Please log in again.")
          ) {
            clearMeQuery();
            router.push("/login");
          }
        } else window.alert("Something went wrong. Please try again!");
      },
    });
  };

  const handleAddToCart = () => {
    if (!productDetailData.getProductDetail?.isAvailable)
      return window.alert("Sorry! This product has been frozen");

    const account_id = meQuery?.me.account?.id;
    if (!account_id) {
      if (window.confirm("You are not logging in. \nLogin in now?")) {
        return router.push("/login");
      }
      return;
    }

    if (accountValue.carts.find((cart) => cart.id === product_id + "")) return;

    setAccountValue((prev) => ({
      ...prev,
      carts: [
        ...prev.carts,
        {
          id: product_id + "",
          quantity: 1,
        },
      ],
    }));

    window.alert("Product has been added to your cart.");
  };

  const handleImageMove = (move: number) => {
    const numOfImg =
      productDetailData.getProductDetail?.img_url.split("<br/>").length;

    if (productImgIdx + move < 0 || productImgIdx + move >= numOfImg) return;

    setProductImgIdx((prev) => prev + move);
  };

  const addToFavs = () => {
    if (!productDetailData.getProductDetail?.isAvailable)
      return window.alert("Sorry! This product has been frozen");

    const account_id = parseInt(meQuery?.me.account?.id);
    if (!account_id) {
      if (window.confirm("You are not logging in. \nLogin in now?")) {
        return router.push("/login");
      }
      return;
    }

    createFavoriteProduct({
      variables: {
        account_id,
        product_id,
      },
      update: () =>
        window.alert("Product has been successfully added to your favorites"),
      refetchQueries: [
        { query: GetFavoriteByAccountIdDocument, variables: { account_id } },
        {
          query: GetNumberOfFavoriteByAccountIdDocument,
          variables: { account_id },
        },
      ],
      onError: (err) => {
        console.log("Fail to add this product to my favorites - ", err.message);
        if (err.message.startsWith("Access denied")) {
          if (
            window.confirm("You have been logged out. Please log in again.")
          ) {
            clearMeQuery();
            router.push("/login");
          }
        } else if (err.message.startsWith("Duplicate entry")) {
          window.alert("You have already added this product to my Favorites.");
        } else {
          window.alert("Something went wrong. Please try again.");
        }
      },
    });
  };

  const handleFreezeOrUnfreezeProduct = async (isAvailable: boolean) => {
    if (
      !isAvailable &&
      !window.confirm(
        "Your product will not be seen anywhere if you Freeze it.\nAre you sure you want to do it?"
      )
    )
      return;
    if (
      isAvailable &&
      !window.confirm(
        "Your product will be seen if you unfreeze it.\nAre you sure you want to do it?"
      )
    )
      return;

    await freezeOrUnFreezeProduct({
      variables: {
        account_id: meQuery?.me.account?.id,
        product_id: productDetailData.getProductDetail.id,
        isAvailable,
      },
      refetchQueries: [
        { query: GetNumberOfProductAllTypesDocument },
        { query: GetAllCategoryDocument },
      ],
      update: (cache, { data }) => {
        window.alert(
          `Your product has been successfully ${
            data.freezeOrUnFreezeProduct.isAvailable ? "unfrozen" : "frozen"
          }`
        );
        cache.writeQuery<GetProductDetailQuery, { product_id: number }>({
          query: GetProductDetailDocument,
          variables: { product_id },
          data: {
            ...productDetailData,
            getProductDetail: {
              ...productDetailData.getProductDetail,
              isAvailable: data.freezeOrUnFreezeProduct.isAvailable,
            },
          },
        });
      },
      onError: (err) => {
        console.log("Fail to Freeze or Unfreeze this product - ", err.message);
        if (err.message.startsWith("Access denied")) {
          if (
            window.confirm("You have been logged out. Please log in again.")
          ) {
            clearMeQuery();
            router.push("/login");
          }
        } else window.alert("Something went wrong. Please try again!");
      },
    });
  };

  const returnJSX = () => {
    if (productDetailLoading) {
      return <div>Loading... product_id = {product_id}</div>;
    } else if (productDetailError) {
      return <div>Something went wrong - {productDetailError.message}</div>;
    } else {
      return (
        <div className={styles["single-container"]}>
          <h2>
            <p>
              <img
                src={
                  productDetailData.getProductDetail?.account_img_url ||
                  "/images/default_user.png"
                }
                alt=""
                className="go-to-user"
                onClick={() =>
                  goToUser(productDetailData?.getProductDetail?.account_id)
                }
              />
              <strong
                className="go-to-user"
                onClick={() =>
                  goToUser(productDetailData?.getProductDetail?.account_id)
                }
              >
                {meQuery?.me.account?.id &&
                productDetailData?.getProductDetail?.account_id &&
                meQuery.me.account.id ===
                  productDetailData.getProductDetail.account_id
                  ? "You"
                  : productDetailData.getProductDetail?.account_name}
              </strong>{" "}
              &nbsp;
              {parseInt(productDetailData.getProductDetail?.updateAt) -
                parseInt(productDetailData.getProductDetail?.addedAt) >
              30000
                ? `updated it on ${getDate(
                    parseInt(productDetailData.getProductDetail?.updateAt),
                    true
                  )}`
                : `created it on ${getDate(
                    parseInt(productDetailData.getProductDetail?.addedAt),
                    true
                  )}`}
            </p>

            {meQuery?.me.account?.id ===
              productDetailData.getProductDetail?.createdBy && (
              <button
                onClick={() => {
                  if (!window.confirm("Do you want to update this product?"))
                    return;
                  router.push(`/main/products/editProduct/${product_id}`);
                }}
              >
                <i className="fas fa-edit"></i>Edit
              </button>
            )}
            {meQuery?.me.account?.id ===
              productDetailData.getProductDetail?.createdBy && (
              <button
                onClick={() =>
                  handleFreezeOrUnfreezeProduct(
                    !productDetailData.getProductDetail?.isAvailable
                  )
                }
              >
                {productDetailData.getProductDetail?.isAvailable
                  ? "Freeze"
                  : "Unfreeze"}
              </button>
            )}
            <button onClick={() => router.back()}>Go back</button>
          </h2>

          <div className={styles["top"]}>
            <div
              style={{ "--product-img-cur-idx": productImgIdx } as any}
              className={styles["imgBx"]}
            >
              {productDetailData.getProductDetail?.img_url
                .split("<br/>")
                .map((img_url, img_idx) => (
                  <img
                    key={img_idx}
                    style={{ "--img-idx": img_idx } as any}
                    src={img_url}
                    alt=""
                  />
                ))}
              <p className={styles["imgBx-control"]}>
                <i
                  className="fas fa-angle-left"
                  onClick={() => handleImageMove(-1)}
                ></i>
                <span>
                  image <b>{productImgIdx + 1}</b>/
                  {
                    productDetailData.getProductDetail?.img_url.split("<br/>")
                      .length
                  }
                </span>
                <i
                  className="fas fa-angle-right"
                  onClick={() => handleImageMove(1)}
                ></i>
              </p>
            </div>
            <div className={styles["product-info"]}>
              <h3 className={styles["product-name"]}>
                {productDetailData.getProductDetail?.name}
              </h3>
              <div className={styles["product-rating"]}>
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <b
                      key={i}
                      className={
                        i + 1 <=
                        Math.round(
                          productDetailData.getProductDetail?.avg_rating ?? 0
                        )
                          ? styles["rate"]
                          : ""
                      }
                    ></b>
                  ))}
                <strong className={styles["avg"]}>
                  {"avg "}
                  {(
                    productDetailData.getProductDetail?.avg_rating ?? 0
                  ).toFixed(2)}
                </strong>
                <strong className={styles["vote"]}>
                  {productDetailData.getProductDetail?.rating_times}
                  {productDetailData.getProductDetail?.rating_times <= 1
                    ? " vote"
                    : " votes"}
                </strong>
              </div>
              <h4 className={styles["product-price"]}>
                <small>$</small>
                {productDetailData.getProductDetail?.price.toFixed(2)}
                {!productDetailData.getProductDetail?.isAvailable && (
                  <small>Unavailable</small>
                )}
                {productDetailData.getProductDetail?.isAvailable &&
                  productDetailData.getProductDetail?.isOnSale && (
                    <small>On Sale</small>
                  )}
                <b>
                  {productDetailData.getProductDetail?.total_order_count ?? 0}{" "}
                  sold
                </b>
              </h4>

              <div className={styles["rate-and-fav"]}>
                <button onClick={() => toggleIsRating((prev) => !prev)}>
                  <i className="fas fa-star"></i>
                  Rate this
                </button>
                <button onClick={() => addToFavs()}>
                  <i className="fas fa-heart"></i>Add to my Favs
                </button>
              </div>

              <div className="spacer-1" style={{ minHeight: 8 }}></div>

              <div className={styles["quantity-and-total"]}>
                <p className={styles["quantity"]}>
                  <span>Quantity&nbsp;&nbsp;</span>
                  <button onClick={() => handleSetQuantity(1)}>+</button>
                  <b>{quantity}</b>
                  <button onClick={() => handleSetQuantity(-1)}>-</button>
                </p>
                <p className={styles["total"]}>
                  <span>Total&nbsp;&nbsp;</span>
                  <small>$</small>
                  {(
                    productDetailData.getProductDetail?.price * quantity
                  ).toFixed(2)}
                </p>
              </div>

              <button onClick={handleAddToCart}>
                <i className="fas fa-shopping-cart"></i>Add to my Cart
              </button>
            </div>
          </div>

          <div className={styles["bottom"]}>
            <div className={styles["categories"]}>
              <h5>Categories</h5>
              <div className={styles["category-lists"]}>
                <ul>
                  {productDetailData.getProductDetail?.categories.map(
                    (c, i) => (
                      <li
                        key={i}
                        onClick={() =>
                          router.push(
                            `/main/categories/${c.id}_${c.name
                              .split(" ")
                              .join("_")}`
                          )
                        }
                      >
                        <div className={styles["imgBx"]}>
                          <img src={c.img_url} alt="" />
                        </div>
                        <p>{c.name}</p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className={styles["sales"]}>
              <h5>Sales & Marketing</h5>
              <div className={styles["sales-charts"]}>
                <div className={styles["polar-chart"]}>
                  <div className={styles["chart"]}>
                    <PolarArea />
                  </div>
                </div>
                <div className={styles["bar-chart"]}>
                  <div className={styles["chart"]}>
                    <Bar />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles["description"]}>
              <h5>Description</h5>
              <div>
                {createDescription(
                  productDetailData.getProductDetail?.description
                )}
              </div>
            </div>

            <div className={styles["similar"]}>
              <h5>Similar Products</h5>
              <div
                className={gridStyles["products-grid"]}
                style={{ marginTop: "1em" }}
              >
                {productDetailData.getProductDetail?.simularProducts.map(
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

            <div className={styles["posts"]}>
              <h5>
                <span>
                  Comments
                  <b>{numOfProductQuery?.getNumOfPostsByProductID ?? 0}</b>
                </span>
                {(numOfProductQuery?.getNumOfPostsByProductID ?? 0) > 0 &&
                  !showPosts && (
                    <button onClick={() => toggleShowPosts((prev) => !prev)}>
                      Show comments
                    </button>
                  )}
                {(numOfProductQuery?.getNumOfPostsByProductID ?? 0) > 0 &&
                  showPosts && (
                    <div className={styles["post-type-menu"]}>
                      <input
                        type="checkbox"
                        className="posts-sort-type-checkbox"
                        id="posts-sort-type-checkbox"
                      />
                      <label
                        ref={postTypeSelectMenu}
                        htmlFor="posts-sort-type-checkbox"
                      >
                        <span>{postSortType}</span>
                        <b></b>
                      </label>

                      <ul>
                        {PostSortType.map((b) => (
                          <li
                            key={b}
                            onClick={() => handlePostSortTypeClick(b)}
                          >
                            {b}
                          </li>
                        ))}
                        <li
                          style={{ background: "#f33e3e", color: "#eee" }}
                          onClick={() => toggleShowPosts((prev) => !prev)}
                        >
                          Close comments
                        </li>
                      </ul>
                    </div>
                  )}
              </h5>
              <div className={styles["add-my-post"]}>
                <div className={styles["imgBx"]}>
                  <img
                    src={
                      meQuery?.me.account?.img_url || "/images/default_user.png"
                    }
                    alt=""
                  />
                </div>
                <div className={styles["input-comment"]}>
                  <textarea
                    placeholder="Add a comment..."
                    rows={3}
                    value={addPostContent}
                    onChange={(e) => setAddPostContent(e.target.value)}
                  ></textarea>
                </div>
                <i className="fas fa-plus" onClick={() => handleAddPost()}></i>
              </div>

              <SingleProductPost
                product_id={product_id}
                account_id={meQuery?.me.account?.id}
                account_img_url={
                  meQuery?.me.account?.img_url || "/images/default_user.png"
                }
                showPosts={showPosts}
                postSortType={postSortType}
                commentTypeSelectMenu={commentTypeSelectMenu}
                clearMeQuery={clearMeQuery}
                goToUser={goToUser}
              />
            </div>
          </div>
        </div>
      );
    }
  };

  const getProductName = productDetailLoading
    ? "Loading..."
    : productDetailError
    ? "Error"
    : productDetailData.getProductDetail.name;

  return (
    <section className={styles.single} id="single-product">
      <h1 className={styles["single-list-h1"]}>{getProductName}</h1>
      <RatingPopup
        open={isRating}
        toggleOpen={toggleIsRating}
        cb={handleRateProduct}
      />
      {returnJSX()}
    </section>
  );
};

export default Product;
