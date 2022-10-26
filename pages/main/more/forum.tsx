import { withProductsLayout } from "../../../layouts/ProductsLayout";
import { Forum as MyForum } from "../../../components/overviewPage";
import { GetStaticProps } from "next";
import { GetAllBlogsDocument } from "../../../generated/graphql";
import { initializeApollo } from "../../../utils/apollo";

const Forum = () => {
  const ProductsLayout = withProductsLayout({
    component: MyForum,
    className: "spacer-1 main-products",
  });

  return <ProductsLayout />;
};

export const getStaticProps: GetStaticProps = async () => {
  // const client = getStandAloneApolloClient();
  const client = initializeApollo({ ssr: true });
  await client.query({
    // query: AllTodoQuery,
    query: GetAllBlogsDocument,
  });

  return {
    revalidate: 60,
    props: {
      // apolloState: client.cache.extract(),
      initialApolloState: client.cache.extract(),
      ssr: true,
    },
  };
};

export default Forum;
// export default withApollo({ ssr: false })(Forum);
