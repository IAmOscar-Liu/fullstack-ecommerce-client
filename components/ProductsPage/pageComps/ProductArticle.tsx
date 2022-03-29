import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { CSSProperties } from "react";
import {
  GetFavoriteByAccountIdDocument,
  GetFavoriteByAccountIdQuery,
  GetNumberOfFavoriteByAccountIdDocument,
  MeDocument,
  MeQuery,
  ProductBrief,
  useCreateFavoriteProductMutation,
  useDeleteFavoriteProductMutation,
} from "../../../generated/graphql";
import gridStyles from "../../../styles/ProductGrid.module.css";
import { useAccount } from "../../../utils/AccountProvider";
import { getDate } from "../../../utils/getDate";

interface Props {
  product: ProductBrief;
  articleStyle?: CSSProperties;
  isMyFav?: boolean;
  addFavTime?: string;
}

const ProductArticle: React.FC<Props> = ({
  product,
  articleStyle,
  isMyFav = false,
  addFavTime = "",
}) => {
  const router = useRouter();
  const client = useApolloClient();
  const meQuery = client.readQuery<MeQuery>({ query: MeDocument });
  const [createFavoriteProduct] = useCreateFavoriteProductMutation();
  const [deleteFavoriteProduct] = useDeleteFavoriteProductMutation();
  const { accountValue, setAccountValue } = useAccount();

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

  const visitProduct = () => {
    router.push(`/main/products/singleProduct/${product.id}`);
  };

  const addToFavs = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();

    if (!product.isAvailable)
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
        product_id: parseInt(product.id),
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

  const removeFromFavs = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const account_id = parseInt(meQuery?.me.account?.id);
    if (!account_id) {
      if (window.confirm("You are not logging in. \nLogin in now?")) {
        return router.push("/login");
      }
      return;
    }

    await deleteFavoriteProduct({
      variables: {
        account_id,
        product_id: parseInt(product.id),
      },
      refetchQueries: [
        {
          query: GetNumberOfFavoriteByAccountIdDocument,
          variables: { account_id },
        },
      ],
      update: (cache, { data }) => {
        if (!data.deleteFavoriteProduct) return;
        const oldFavs = cache.readQuery<
          GetFavoriteByAccountIdQuery,
          { account_id: number }
        >({
          query: GetFavoriteByAccountIdDocument,
          variables: { account_id },
        });
        cache.writeQuery<GetFavoriteByAccountIdQuery, { account_id: number }>({
          query: GetFavoriteByAccountIdDocument,
          variables: { account_id },
          data: {
            ...oldFavs,
            getFavoriteByAccountID: {
              ...oldFavs.getFavoriteByAccountID,
              favorites: oldFavs.getFavoriteByAccountID.favorites.filter(
                (f) => f.product_id != product.id
              ),
            },
          },
        });
      },
      onError: (err) => {
        console.log(
          "Fail to delete this product from my favorites - ",
          err.message
        );
        if (err.message.startsWith("Access denied")) {
          if (
            window.confirm("You have been logged out. Please log in again.")
          ) {
            clearMeQuery();
            router.push("/login");
          }
        } else {
          window.alert("Something went wrong. Please try again.");
        }
      },
    });
  };

  const addToCart = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();

    if (!product.isAvailable)
      return window.alert("Sorry! This product has been frozen");

    const account_id = meQuery?.me.account?.id;
    if (!account_id) {
      if (window.confirm("You are not logging in. \nLogin in now?")) {
        return router.push("/login");
      }
      return;
    }

    if (accountValue.carts.find((cart) => cart.id === product.id)) return;

    setAccountValue((prev) => ({
      ...prev,
      carts: [...prev.carts, { id: product.id, quantity: 1 }],
    }));

    window.alert("Product has been added to your cart.");
  };

  return (
    <article key={product.name} style={articleStyle}>
      {product.isOnSale && <span className={gridStyles["ribbon"]}></span>}
      <div className={gridStyles["products-grid-imgBx"]} onClick={visitProduct}>
        <b>
          <i className="fas fa-eye"></i>
          <small>View</small>
        </b>
        {isMyFav ? (
          <b onClick={removeFromFavs}>
            <i className="fas fa-trash"></i>
            <small>Remove from Favs</small>
          </b>
        ) : (
          <b onClick={addToFavs}>
            <i className="fab fa-gratipay"></i>
            <small>Add to Favs</small>
          </b>
        )}
        <b onClick={addToCart}>
          <i className="fas fa-shopping-cart"></i>
          <small>Add to cart</small>
        </b>
        <img src={product.img_url.split("<br/>")[0]} alt="" />
      </div>
      <h1>{product.name}</h1>
      {addFavTime && (
        <p className={gridStyles["fav-time"]}>
          <i className="fas fa-heart"></i>Added on{" "}
          {getDate(parseInt(addFavTime))}
        </p>
      )}
      <div className={gridStyles["products-grid-rating"]}>
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <b
              key={i}
              className={
                i + 1 <= Math.round(product.avg_rating ?? 0)
                  ? gridStyles.rate
                  : ""
              }
            ></b>
          ))}
        {!isMyFav && <span>{product.total_order_count ?? 0} sold</span>}
      </div>
      <div className="spacer-1"></div>
      <p className={gridStyles["price"]}>
        <small>$</small>
        {product.price.toFixed(2)}
      </p>
      <div className={gridStyles["products-grid-btns"]}>
        <i onClick={visitProduct} className="fas fa-eye"></i>
        {isMyFav ? (
          <i onClick={removeFromFavs} className="fas fa-trash"></i>
        ) : (
          <i onClick={addToFavs} className="fab fa-gratipay"></i>
        )}
        <i onClick={addToCart} className="fas fa-shopping-cart"></i>
      </div>
    </article>
  );
};

export default ProductArticle;
