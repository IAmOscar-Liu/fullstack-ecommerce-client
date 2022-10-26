import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  PaginationBtn,
  ProductArticle,
} from "../../../components/ProductsPage";
import styles from "../../../components/ProductsPage/pageComps/Products.module.css";
import {
  GetOnSaleProductsDocument,
  useGetNumberOfProductAllTypesQuery,
  useGetOnSaleProductsQuery,
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
  const { data, loading, error } = useGetOnSaleProductsQuery({
    variables: {
      limit: pagePerLimit,
      offset: (page - 1) * pagePerLimit,
    },
  });

  const totalPage = Math.ceil(totalProducts / pagePerLimit) || 1;

  return (
    <section className={styles.products} id="products">
      <h1 className={styles["products-list-h1"]}>On Sale Products</h1>
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
          {data.getOnSaleProducts.products?.map((product, i) => (
            <ProductArticle key={i} product={product} />
          ))}
        </div>
      )}
      {data?.getOnSaleProducts.products && (
        <PaginationBtn
          pathname={pathname}
          currentPage={page}
          totalPage={totalPage}
        />
      )}
    </section>
  );
};

const OnSale = () => {
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
      totalProducts={allTypes?.getNumberOfProductAllTypes.onSale ?? 0}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // const client = getStandAloneApolloClient();
  const client = initializeApollo({ ssr: true });
  await client.query({
    query: GetOnSaleProductsDocument,
    variables: { offset: 0, limit: pagePerLimit },
  });

  return {
    revalidate: 10,
    props: {
      // apolloState: client.cache.extract()
      initialApolloState: client.cache.extract(),
      ssr: true,
    },
  };
};

export default OnSale;
// export default withApollo({ ssr: false })(OnSale);
