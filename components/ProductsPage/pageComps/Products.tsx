import { ProductBrief } from "../../../generated/graphql";
import gridStyles from "../../../styles/ProductGrid.module.css";
import ProductArticle from "./ProductArticle";
import styles from "./Products.module.css";

interface Props {
  title: string;
  products: ProductBrief[];
}

const Products: React.FC<Props> = ({ title, products }) => {
  return (
    <section className={styles.products} id="products">
      <h1 className={styles["products-list-h1"]}>{title}</h1>
      <div className={gridStyles["products-grid"]}>
        {products.map((product, i) => (
          <ProductArticle key={i} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
