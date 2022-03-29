import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  PaginationBtn,
  ProductArticle,
} from "../../../components/ProductsPage";
import styles from "../../../components/ProductsPage/pageComps/Products.module.css";
import {
  GetAllProductsDocument,
  useGetAllProductsQuery,
  useGetNumberOfProductAllTypesQuery,
} from "../../../generated/graphql";
import ProductsLayout from "../../../layouts/ProductsLayout";
import gridStyles from "../../../styles/ProductGrid.module.css";
import {
  getStandAloneApolloClient,
  withApollo,
} from "../../../utils/withApollo";

const pagePerLimit = parseInt(process.env.PRODUCT_PER_PAGE_LIMIT) || 10;

const Pagination: React.FC<{
  pathname: string;
  page: number;
  totalProducts: number;
}> = ({ page, pathname, totalProducts }) => {
  const { data, loading, error } = useGetAllProductsQuery({
    variables: {
      limit: pagePerLimit,
      offset: (page - 1) * pagePerLimit,
    },
  });

  const totalPage = Math.ceil(totalProducts / pagePerLimit) || 1;

  return (
    <section className={styles.products} id="products">
      <h1 className={styles["products-list-h1"]}>All Products</h1>
      <PaginationBtn pathname={pathname} currentPage={page} totalPage={totalPage} />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Something went wrong - {error.message}</div>
      ) : (
        <div className={gridStyles["products-grid"]}>
          {data.getAllProducts.products?.map((product, i) => (
            <ProductArticle key={i} product={product} />
          ))}
        </div>
      )}
      {data?.getAllProducts.products && (
        <PaginationBtn
          pathname={pathname}
          currentPage={page}
          totalPage={totalPage}
        />
      )}
    </section>
  );
};

const All = () => {
  const { data: allTypes } = useGetNumberOfProductAllTypesQuery();
  const router = useRouter();

  return (
    <ProductsLayout>
      <main className="spacer-1 main-products">
        <Pagination
          page={parseInt(router.query.page as string) || 1}
          pathname={router.pathname}
          totalProducts={allTypes?.getNumberOfProductAllTypes.all ?? 0}
        />
      </main>
    </ProductsLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = getStandAloneApolloClient();
  await client.query({
    query: GetAllProductsDocument,
    variables: { offset: 0, limit: pagePerLimit },
  });

  return {
    revalidate: 10,
    props: { apolloState: client.cache.extract() },
  };
};

// export default All;
export default withApollo({ ssr: false })(All);
