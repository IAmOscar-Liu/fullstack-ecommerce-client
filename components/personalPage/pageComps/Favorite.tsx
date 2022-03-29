import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties } from "react";
import {
  ProductBrief,
  useGetFavoriteByAccountIdQuery,
  useMeQuery
} from "../../../generated/graphql";
import gridStyles from "../../../styles/ProductGrid.module.css";
import { ProductArticle } from "../../ProductsPage";
import styles from "./Favorite.module.css";

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

const FavoriteProducts: React.FC<{ account_id: number }> = ({ account_id }) => {
  const { data, loading } = useGetFavoriteByAccountIdQuery({
    variables: { account_id },
  });

  if (loading) return <div>Loading</div>;

  // const favorites = data.getFavoriteByAccountID.favorites as FavoriteDetail[];
  return (
    <>
      {!data?.getFavoriteByAccountID.favorites ||
        (data.getFavoriteByAccountID.favorites.length === 0 && (
          <h1 style={h1Style}>
            You don't have any favorite products. Click{" "}
            <Link href="/main/products/all">
              <a style={aStyle}>here</a>
            </Link>{" "}
            to see all of our products
          </h1>
        ))}
      {data.getFavoriteByAccountID.favorites.length > 0 && (
        <div className={gridStyles["products-grid"]}>
          {data.getFavoriteByAccountID.favorites.map((fav, i) => {
            const product: ProductBrief = {
              avg_rating: fav.product_avg_rating ?? 0,
              id: fav.product_id,
              img_url: fav.product_img_url,
              isOnSale: fav.product_isOnSale,
              name: fav.product_name,
              price: fav.product_price,
              isAvailable: fav.product_is_available,
            };

            return (
              <ProductArticle
                key={i}
                product={product}
                articleStyle={{
                  background: "transparent",
                  boxShadow: "3px 8px 16px 3px rgb(0 0 0 / 70%)",
                }}
                isMyFav={true}
                addFavTime={fav.addedAt}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

const Favorite: React.FC<Props> = () => {
  const { data: meQuery, loading } = useMeQuery();
  const router = useRouter();

  const returnJSX = () => {
    if (loading) return <div>Loading...</div>;
    const user = meQuery?.me.account;
    if (!user) {
      router.replace("/login");
      return null;
    }
    return <FavoriteProducts account_id={parseInt(user.id)} />;
  };

  return (
    <section className={styles.favorite} id="favorite">
      <h1 className={styles["favorite-list-h1"]}>Favorite Products</h1>
      {returnJSX()}
    </section>
  );
};

export default Favorite;
