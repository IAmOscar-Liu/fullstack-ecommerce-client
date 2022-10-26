import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  PaginationBtn,
  ProductArticle,
} from "../../../components/ProductsPage";
import styles from "../../../components/ProductsPage/pageComps/Products.module.css";
import {
  GetTopRatedProductsDocument,
  useGetNumberOfProductAllTypesQuery,
  useGetTopRatedProductsQuery,
} from "../../../generated/graphql";
import { withProductsLayout } from "../../../layouts/ProductsLayout";
import gridStyles from "../../../styles/ProductGrid.module.css";
import { initializeApollo } from "../../../utils/apollo";

const pagePerLimit = parseInt(process.env.PRODUCT_PER_PAGE_LIMIT) || 10;

interface PaginationProps {
  pathname: string;
  page: number;
  totalProducts: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pathname,
  totalProducts,
}) => {
  const variables: { limit: number; offset: number; total?: number } = {
    limit: pagePerLimit,
    offset: (page - 1) * pagePerLimit,
  };
  if (page !== 1) variables.total = totalProducts;

  const { data, loading, error } = useGetTopRatedProductsQuery({ variables });

  const totalPage = Math.ceil(totalProducts / pagePerLimit) || 1;

  return (
    <section className={styles.products} id="products">
      <h1 className={styles["products-list-h1"]}>Top Rated Products</h1>
      <PaginationBtn
        pathname={pathname}
        currentPage={page}
        totalPage={totalPage}
      />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Something went wrong - {error.message}</div>
      ) : (
        <div className={gridStyles["products-grid"]}>
          {data.getTopRatedProducts.products?.map((product, i) => (
            <ProductArticle key={i} product={product} />
          ))}
        </div>
      )}
      {data?.getTopRatedProducts.products && (
        <PaginationBtn
          pathname={pathname}
          currentPage={page}
          totalPage={totalPage}
        />
      )}
    </section>
  );
};

const TopRated = () => {
  const { data: allTypes } = useGetNumberOfProductAllTypesQuery();
  const router = useRouter();
  const ProductsLayout = withProductsLayout<PaginationProps>({
    component: Pagination,
    className: "spacer-1 main-products",
  });

  return (
    <ProductsLayout
      page={parseInt(router.query.page as string) || 1}
      pathname={router.pathname}
      totalProducts={allTypes?.getNumberOfProductAllTypes.topRated ?? 0}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // const client = getStandAloneApolloClient();
  const client = initializeApollo({ ssr: true });
  await client.query({
    query: GetTopRatedProductsDocument,
    variables: { offset: 0, limit: pagePerLimit },
  });

  return {
    revalidate: 10,
    props: {
      // apolloState: client.cache.extract(),
      initialApolloState: client.cache.extract(),
      ssr: true,
    },
  };
};

export default TopRated;
// export default withApollo({ ssr: false })(TopRated);
