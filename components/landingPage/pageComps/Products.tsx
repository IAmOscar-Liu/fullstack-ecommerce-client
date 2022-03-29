import Link from "next/link";
import { popularProducts } from "../../../dummyData/popularProducts";
import {
  ProductBrief,
  useGetPopularProductsQuery
} from "../../../generated/graphql";
import gridStyles from "../../../styles/ProductGrid.module.css";
import { ProductArticle } from "../../ProductsPage";
import styles from "./Products.module.css";

interface Props {}

const Products: React.FC<Props> = () => {
  const { data } = useGetPopularProductsQuery({ variables: { limit: 6 } });

  const products: ProductBrief[] =
    data?.getPopularProducts.products || popularProducts;

  return (
    <section className={styles.products} id="products">
      <h1 className={styles["products-h1"]}>Check our best-selling products</h1>
      <div
        className={gridStyles["products-grid"]}
        style={{ width: "90%", maxWidth: 1100 }}
      >
        {products.map((product, i) => (
          <ProductArticle key={i} product={product} />
        ))}
      </div>
      <p className={styles["products-go"]}>
        Want to see all of our products?{" "}
        <Link href="/main/products/all">
          <a>Let's go</a>
        </Link>
      </p>
    </section>
  );
};

export default Products;
