import { useRouter } from "next/router";
import {
  PaginationBtn,
  ProductArticle,
} from "../../../components/ProductsPage";
import styles from "../../../components/ProductsPage/pageComps/Products.module.css";
import { withProductsLayout } from "../../../layouts/ProductsLayout";
import gridStyles from "../../../styles/ProductGrid.module.css";
import { useAccount } from "../../../utils/AccountProvider";

const pagePerLimit = parseInt(process.env.PRODUCT_PER_PAGE_LIMIT) || 10;

interface PaginationProps {
  pathname: string;
  page: number;
  searchTerm: string;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pathname,
  searchTerm,
}) => {
  const { accountValue } = useAccount();
  const allResults = accountValue.searchResult.map((p) => p.data);

  const offset = (page - 1) * pagePerLimit;
  const pageResult = allResults.slice(offset, offset + pagePerLimit);

  const totalPage = Math.ceil(allResults.length / pagePerLimit) || 1;

  return (
    <section className={styles.products} id="products">
      <h1
        className={styles["products-list-h1"]}
        style={{ fontSize: "2.2em", textTransform: "initial" }}
      >
        Search Result for "{searchTerm}"
      </h1>
      <PaginationBtn
        pathname={pathname}
        currentPage={page}
        totalPage={totalPage}
        searchTerm={searchTerm}
      />
      {pageResult.length === 0 && (
        <h1
          style={{
            margin: "auto",
            width: "80%",
            textAlign: "center",
            color: "rgb(94, 88, 88)",
          }}
        >
          No result for "{searchTerm}"
        </h1>
      )}
      {pageResult.length > 0 && (
        <div className={gridStyles["products-grid"]}>
          {pageResult.map((product, i) => (
            <ProductArticle key={i} product={product} />
          ))}
        </div>
      )}

      {pageResult.length > 0 && (
        <PaginationBtn
          pathname={pathname}
          currentPage={page}
          totalPage={totalPage}
          searchTerm={searchTerm}
        />
      )}
    </section>
  );
};

const Search = () => {
  const router = useRouter();
  const searchTerm = (router.query.search as string) || "";

  const ProductsLayout = withProductsLayout<PaginationProps>({
    component: Pagination,
    className: "spacer-1 main-products",
  });

  return (
    <ProductsLayout
      page={parseInt(router.query.page as string) || 1}
      searchTerm={searchTerm}
      pathname={router.pathname}
    />
  );
};

export default Search;
// export default withApollo({ ssr: false })(Search);
