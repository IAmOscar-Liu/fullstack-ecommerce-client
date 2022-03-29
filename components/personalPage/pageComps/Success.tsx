import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  GetNumOfUserProductOrderBlogDocument,
  GetRecentOrderProductsDocument,
  MeDocument,
  MeQuery,
  useConfirmOrderMutation,
  useMeQuery,
} from "../../../generated/graphql";
import { useAccount } from "../../../utils/AccountProvider";
import styles from "./Success.module.css";

interface Props {}

const useOrder = (session_id: string, account_id: string) => {
  const router = useRouter();
  const [order, setOrder] =
    useState<{ session_id: string; amount_total: number }>(null);
  const [isConfirming, toggleIsConfirming] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const client = useApolloClient();
  const [confirmOrder] = useConfirmOrderMutation();
  const { setAccountValue } = useAccount();

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

  useEffect(() => {
    const fetchOrder = async () => {
      toggleIsConfirming(true);
      await confirmOrder({
        variables: {
          session_id,
          account_id,
        },
        refetchQueries: [
          { query: GetNumOfUserProductOrderBlogDocument },
          { query: GetRecentOrderProductsDocument },
        ],
        update: (_, { data }) => {
          setOrder({
            session_id: data.confirmOrder.session_id ?? "",
            amount_total: data.confirmOrder.amount_total ?? 0,
          });
          setAccountValue((prev) => ({ ...prev, carts: [] }));
        },
        onError: (err) => {
          console.log("Fail to confirm checkout session - ", err.message);
          setError(err.message);
          if (err.message.startsWith("Access denied")) {
            if (
              window.confirm("You have been logged out. Please log in again.")
            ) {
              clearMeQuery();
              router.push("/login");
            }
          } else if (
            err.message.startsWith("Checkout session") ||
            err.message.startsWith("The payment")
          ) {
            window.alert(err.message);
          } else window.alert("Something went wrong. Please try again!");
        },
      });
      toggleIsConfirming(false);
    };

    if (session_id && account_id) fetchOrder();
  }, [session_id, account_id]);

  return { order, isConfirming, error };
};

const Success: React.FC<Props> = () => {
  const router = useRouter();
  const { data: meQuery, loading } = useMeQuery();
  const { session_id } = router.query;

  const { order, isConfirming, error } = useOrder(
    session_id as string,
    meQuery?.me.account?.id ?? ""
  );

  const returnJSX = () => {
    if (loading) return <div>Loading...</div>;
    const user = meQuery?.me.account;
    if (!user) {
      router.replace("/login");
      return null;
    }
    if (!session_id) {
      router.back();
      return null;
    }

    return (
      <div className={styles["success-container"]}>
        {isConfirming && <div>Loading...</div>}
        {error && <div>Fail to confirm checkout session - {error}</div>}
        {order && (
          <>
            <h3>Your order is confirmed</h3>
            <p>
              <span>Order number:</span> <span>{order.session_id}</span>
            </p>
            <p>
              <span>Amount total:</span>
              <span> ${(order.amount_total / 100).toFixed(2)}</span>
            </p>
            <button onClick={() => router.replace("/main/personal/cart")}>
              Go back
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <section className={styles.success} id="success">
      <h1 className={styles["success-list-h1"]}>
        Thank you for your purchase!
      </h1>
      {returnJSX()}
    </section>
  );
};

export default Success;
