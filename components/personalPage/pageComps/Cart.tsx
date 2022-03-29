import { useApolloClient } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js/pure";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, useEffect, useState } from "react";
import {
  GetOrdersByAccountIdDocument,
  MeDocument,
  MeQuery,
  useCancelOrderMutation,
  useCreateFavoriteProductMutation,
  useCreateOrderMutation,
  useGetProductsByIDsQuery,
  useMeQuery
} from "../../../generated/graphql";
import gridStyles from "../../../styles/ProductGrid.module.css";
import { useAccount } from "../../../utils/AccountProvider";
import styles from "./Cart.module.css";
import CartArticle from "./CartArticle";

interface Props {}

const h1Style: CSSProperties = {
  margin: "auto",
  width: "80%",
  textAlign: "center",
  color: "rgb(94, 88, 88)",
};

const aStyle: CSSProperties = {
  fontSize: "1.1em",
  color: "green",
};

const Cart: React.FC<Props> = () => {
  const router = useRouter();
  const { data: meQuery, loading } = useMeQuery();
  const [createFavoriteProduct] = useCreateFavoriteProductMutation();
  const client = useApolloClient();
  const { accountValue, setAccountValue } = useAccount();
  const { data: cartQuery } = useGetProductsByIDsQuery({
    skip: !accountValue.carts || accountValue.carts.length === 0,
    variables: { product_ids: accountValue.carts.map((cart) => cart.id) },
  });
  const [createOrder] = useCreateOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();
  const [isCreatingOrder, toggleIsCreatingOrder] = useState<boolean>(false);

  const editProductQuantity = (id: string, change: 1 | -1) => {
    setAccountValue((prev) => {
      const targetProduct = prev.carts.find((p) => p.id === id);

      if (targetProduct.quantity === 1 && change === -1) return prev;
      if (targetProduct.quantity === 10 && change === 1) return prev;

      return {
        ...prev,
        carts: prev.carts.map((p) =>
          p.id !== id ? p : { ...p, quantity: p.quantity + change }
        ),
      };
    });
  };

  const removeProductFromCart = (id: string) => {
    setAccountValue((prev) => ({
      ...prev,
      carts: prev.carts.filter((p) => p.id !== id),
    }));
  };

  const addAllToFavorite = async () => {
    if (
      !window.confirm(
        "Are you sure you want to add all of them to your Favorites?"
      )
    )
      return;

    const unAvailableProduct = cartQuery.getProductsByIDs.products.find(
      (cart) => !cart.isAvailable
    );
    if (unAvailableProduct)
      return window.alert(
        `Sorry! Product "${unAvailableProduct.name}" is unavailable now. Please remove it.`
      );

    const account_id = parseInt(meQuery.me.account.id);

    //const results =
    await Promise.allSettled(
      accountValue.carts.map(
        (cart) =>
          new Promise<string>((resolve, reject) =>
            createFavoriteProduct({
              variables: { account_id, product_id: parseInt(cart.id) },
              update: () =>
                resolve(
                  `product_id:${cart.id} has been added to Favorites successfully`
                ),
              onError: () => reject(`Fail to add to my Favorite`),
            })
          )
      )
    );

    // console.log(results);

    client.refetchQueries({
      updateCache(cache) {
        cache.evict({
          fieldName: `getFavoriteByAccountID({"account_id":${account_id}})`,
        });
        cache.evict({
          fieldName: `getNumberOfFavoriteByAccountID({"account_id":${account_id}})`,
        });
      },
    });
  };

  const getQuantityByProductID = (product_id: string) =>
    accountValue.carts.find((c) => c.id === product_id)?.quantity ?? 0;

  const calcSubtotal = () =>
    cartQuery.getProductsByIDs.products
      .reduce((acc, cur) => {
        acc += cur.price * getQuantityByProductID(cur.id);
        return acc;
      }, 0)
      .toFixed(2);

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

  const handleCheckout = async () => {
    if (
      accountValue.carts.length === 0 ||
      isCreatingOrder ||
      !window.confirm("Do you want to submit your order?")
    )
      return;
    toggleIsCreatingOrder(true);

    await createOrder({
      variables: {
        orderInput: {
          account_id: meQuery?.me.account?.id,
          products: accountValue.carts.map((c) => ({
            product_id: c.id,
            quantity: c.quantity,
          })),
        },
      },
      refetchQueries: [
        {
          query: GetOrdersByAccountIdDocument,
          variables: {
            account_id: parseInt(meQuery?.me.account?.id ?? "0"),
            limit: 3,
          },
        },
      ],
      update: async (_, { data }) => {
        const stripe = await loadStripe(
          `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
        );
        const result = await stripe.redirectToCheckout({
          sessionId: data.createOrder.session_id,
        });
        if (result.error) {
          console.log("Transaction failed: " + result.error.message);
          window.alert("Transaction failed: " + result.error.message);
          router.replace(
            `/main/personal/cart?cancel_session_id=${data.createOrder.session_id}&failed=true`
          );
        }
      },
      onError: (err) => {
        console.log("Fail to create checkout session - ", err.message);
        if (err.message.startsWith("Access denied")) {
          if (
            window.confirm("You have been logged out. Please log in again.")
          ) {
            clearMeQuery();
            router.push("/login");
          }
        } else if (
          err.message.startsWith("At least one") ||
          err.message.startsWith("Products are")
        ) {
          window.alert(err.message);
        } else window.alert("Something went wrong. Please try again!");
      },
    });
    toggleIsCreatingOrder(false);
  };

  useEffect(() => {
    if (router.query.cancel_session_id && meQuery?.me.account?.id)
      cancelOrder({
        variables: {
          account_id: meQuery.me.account.id,
          session_id: router.query.cancel_session_id as string,
          payment: router.query.failed ? "Failed" : "Incomplete",
        },
        onError: (err) =>
          console.log("Fail to cancel order by session_id - ", err.message),
      });
  }, [
    router.query.cancel_session_id,
    router.query.failed,
    meQuery?.me.account?.id,
  ]);

  const returnJSX = () => {
    if (loading) return <div>Loading...</div>;
    const user = meQuery?.me.account;
    if (!user) {
      router.replace("/login");
      return null;
    }
    return (
      <>
        {accountValue.carts.length === 0 && (
          <h1 style={h1Style}>
            Your cart is empty. Click{" "}
            <Link href="/main/products/all">
              <a style={aStyle}>here</a>
            </Link>{" "}
            to see all of our products
          </h1>
        )}
        {cartQuery?.getProductsByIDs.products &&
          cartQuery.getProductsByIDs.products.length > 0 && (
            <>
              <div className={styles["cart-header-btns"]}>
                <button onClick={addAllToFavorite}>
                  <i className="fas fa-heart"></i>Add all to my Favs
                </button>
                <p>Total items: {accountValue.carts.length}</p>
              </div>
              <div className={gridStyles["products-grid"]}>
                {cartQuery.getProductsByIDs.products.map((product, i) => (
                  <CartArticle
                    key={i}
                    product={{
                      ...product,
                      quantity: getQuantityByProductID(product.id),
                    }}
                    articleStyle={{
                      background: "transparent",
                      boxShadow: "3px 8px 16px 3px rgb(0 0 0 / 70%)",
                    }}
                    removeProductFromCart={removeProductFromCart}
                    editProductQuantity={editProductQuantity}
                  />
                ))}
              </div>
              <div className={styles["cart-utils"]}>
                <div className={styles["detail"]}>
                  <b>Order Summary</b>
                  <ul>
                    {cartQuery.getProductsByIDs.products.map((product, i) => (
                      <li key={i}>
                        <span>
                          <b>{product.name}</b>
                          <small>
                            Price: ${product.price.toFixed(2)}, Quantity:{" "}
                            {getQuantityByProductID(product.id)}
                          </small>
                        </span>
                        <span>
                          <small>$</small>
                          {(
                            product.price * getQuantityByProductID(product.id)
                          ).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles["cart-btns"]}>
                  <p>
                    Total: <small>$</small>
                    {calcSubtotal()}
                  </p>
                  <div>
                    <button onClick={handleCheckout}>
                      <i className="fas fa-check"></i>Checkout
                    </button>
                    <button
                      onClick={() =>
                        setAccountValue((prev) => ({ ...prev, carts: [] }))
                      }
                    >
                      <i className="fas fa-eraser"></i>Empty cart
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
      </>
    );
  };

  return (
    <section className={styles.cart} id="cart">
      <h1 className={styles["cart-list-h1"]}>Your Shopping Cart</h1>
      {returnJSX()}
    </section>
  );
};

export default Cart;
