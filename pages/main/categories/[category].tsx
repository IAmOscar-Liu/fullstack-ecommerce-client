import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  PaginationBtn,
  ProductArticle,
} from "../../../components/ProductsPage";
import styles from "../../../components/ProductsPage/pageComps/Products.module.css";
import {
  GetAllCategoryDocument,
  GetAllCategoryQuery,
  GetProductByCategoryIdDocument,
  GetProductByCategoryIdQuery,
  GetProductByCategoryIdQueryVariables,
  useGetAllCategoryQuery,
  useGetProductByCategoryIdQuery,
} from "../../../generated/graphql";
import { withProductsLayout } from "../../../layouts/ProductsLayout";
import gridStyles from "../../../styles/ProductGrid.module.css";
import { initializeApollo } from "../../../utils/apollo";

const pagePerLimit = parseInt(process.env.PRODUCT_PER_PAGE_LIMIT) || 10;

interface Props {
  category_id: number;
  category_name: string;
}

interface PaginationProps {
  category_id: number;
  category_name: string;
  pathname: string;
  page: number;
  totalProducts: number;
}

const Pagination: React.FC<PaginationProps> = ({
  category_id,
  category_name,
  page,
  pathname,
  totalProducts,
}) => {
  const { data, loading, error } = useGetProductByCategoryIdQuery({
    variables: {
      category_id,
      limit: pagePerLimit,
      offset: (page - 1) * pagePerLimit,
    },
  });

  const totalPage = Math.ceil(totalProducts / pagePerLimit) || 1;

  return (
    <section className={styles.products} id="products">
      <h1 className={styles["products-list-h1"]}>{category_name}</h1>
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
          {data.getProductByCategoryID.products?.map((product, i) => (
            <ProductArticle key={i} product={product} />
          ))}
        </div>
      )}
      {data?.getProductByCategoryID.products && (
        <PaginationBtn
          pathname={pathname}
          currentPage={page}
          totalPage={totalPage}
        />
      )}
    </section>
  );
};

const Category = ({ category_name, category_id }: Props) => {
  const { data: allCategories } = useGetAllCategoryQuery();
  const router = useRouter();
  const ProductLayout = withProductsLayout<PaginationProps>({
    component: Pagination,
    className: "spacer-1 main-products",
  });

  return (
    <ProductLayout
      category_id={category_id}
      category_name={category_name}
      page={parseInt(router.query.page as string) || 1}
      pathname={router.asPath.split("?")[0]}
      totalProducts={
        allCategories?.getAllCategory.categories.find(
          (cg) => cg.id === category_id + ""
        ).number_of_product ?? 0
      }
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const client = getStandAloneApolloClient();
  const client = initializeApollo({ ssr: true });
  const query = await client.query<GetAllCategoryQuery>({
    query: GetAllCategoryDocument,
  });

  const paths = query.data.getAllCategory.categories.map((category) => ({
    params: {
      category: `${category.id}_${category.name.split(" ").join("_")}`,
    },
  }));

  // console.log(paths, "paths");

  // const paths = allCategories.map((category) => ({
  //   params: { category: category.name },
  // }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category_id = parseInt((params.category as string).split("_")[0]);
  const category_name = (params.category as string)
    .split("_")
    .slice(1)
    .join(" ");

  // console.log("params - ", params.category);
  // console.log("category_id", category_id);

  const client = initializeApollo({ ssr: true });
  // const client = getStandAloneApolloClient();
  await client.query<
    GetProductByCategoryIdQuery,
    GetProductByCategoryIdQueryVariables
  >({
    query: GetProductByCategoryIdDocument,
    variables: {
      category_id,
      limit: pagePerLimit,
      offset: 0,
    },
  });

  return {
    revalidate: 60,
    props: {
      category_id,
      category_name,
      // apolloState: client.cache.extract(),
      initialApolloState: client.cache.extract(),
      ssr: true,
    },
  };
};

export default Category;

// export default withApollo({ ssr: false })(Category);
