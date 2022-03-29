import ProductsLayout from "../../../layouts/ProductsLayout";
import { Forum as MyForum } from "../../../components/overviewPage";
import { getStandAloneApolloClient, withApollo } from "../../../utils/withApollo";
import { GetStaticProps } from "next";
import { GetAllBlogsDocument } from "../../../generated/graphql";

const Forum = () => {
  return (
    <ProductsLayout>
      <main className="spacer-1 main-products">
        <MyForum />
      </main>
    </ProductsLayout>
  );
};


export const getStaticProps: GetStaticProps = async () => {
  const client = getStandAloneApolloClient();
  await client.query({
    // query: AllTodoQuery,
    query: GetAllBlogsDocument,
  });

  return {
    revalidate: 60,
    props: { apolloState: client.cache.extract() },
  };
};

export default withApollo({ ssr: false })(Forum);
