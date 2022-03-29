import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { CSSProperties } from "react";
import {
  GetFavoriteByAccountIdDocument,
  GetNumberOfFavoriteByAccountIdDocument,
  MeDocument,
  MeQuery,
  ProductBrief,
  useCreateFavoriteProductMutation,
} from "../../../generated/graphql";
import gridStyles from "../../../styles/ProductGrid.module.css";

interface CartProduct extends ProductBrief {
  quantity: number;
}

interface Props {
  product: CartProduct;
  articleStyle?: CSSProperties;
  removeProductFromCart: (id: string) => void;
  editProductQuantity: (id: string, change: 1 | -1) => void;
}

const CartArticle: React.FC<Props> = ({
  product,
  articleStyle,
  removeProductFromCart,
  editProductQuantity,
}) => {
  const router = useRouter();
  const client = useApolloClient();
  const meQuery = client.readQuery<MeQuery>({ query: MeDocument });
  const [createFavoriteProduct] = useCreateFavoriteProductMutation();

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

  const removeFromCart = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    removeProductFromCart(product.id);
  };

  return (
    <article key={product.name} style={articleStyle}>
      {product.isOnSale && <span className={gridStyles["ribbon"]}></span>}
      <div className={gridStyles["products-grid-imgBx"]} onClick={visitProduct}>
        <b>
          <i className="fas fa-eye"></i>
          <small>View</small>
        </b>

        <b onClick={addToFavs}>
          <i className="fab fa-gratipay"></i>
          <small>Add to Favs</small>
        </b>

        <b onClick={removeFromCart}>
          <i className="fas fa-trash"></i>
          <small>Remove from Cart</small>
        </b>
        <img src={product.img_url.split("<br/>")[0]} alt="" />
      </div>
      <h1>{product.name}</h1>

      <p className={gridStyles["price-each"]}>
        ${product.price.toFixed(2)} for each
      </p>

      <div className={gridStyles["edit-quantity"]}>
        <button onClick={() => editProductQuantity(product.id, 1)}>+</button>
        <b>{product.quantity}</b>
        <button onClick={() => editProductQuantity(product.id, -1)}>-</button>
      </div>

      <p className={gridStyles["price"]}>
        <small>$</small>
        {(product.price * product.quantity).toFixed(2)}
      </p>

      <div className={gridStyles["products-grid-btns"]}>
        <i onClick={visitProduct} className="fas fa-eye"></i>

        <i onClick={addToFavs} className="fab fa-gratipay"></i>

        <i onClick={removeFromCart} className="fas fa-trash"></i>
      </div>
    </article>
  );
};

export default CartArticle;
