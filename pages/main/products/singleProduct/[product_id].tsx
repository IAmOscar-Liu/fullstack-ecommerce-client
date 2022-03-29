import { GetStaticPaths, GetStaticProps } from "next";
import { SingleProduct as Product } from "../../../../components/ProductsPage";
import {
  GetAllProductsDocument,
  GetAllProductsQuery,
  GetNumOfPostsByProductIdDocument,
  GetPostsByProductIdDocument,
  GetProductDetailDocument,
} from "../../../../generated/graphql";
import ProductsLayout from "../../../../layouts/ProductsLayout";
import {
  getStandAloneApolloClient,
  withApollo,
} from "../../../../utils/withApollo";

interface Props {
  product_id: number;
}

const SingleProduct = ({ product_id }: Props) => {
  return (
    <ProductsLayout>
      <main className="spacer-1 main-products">
        <Product product_id={product_id} />
      </main>
    </ProductsLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getStandAloneApolloClient();
  const query = await client.query<GetAllProductsQuery>({
    query: GetAllProductsDocument,
    variables: { limit: 50 },
  });

  const paths = query.data.getAllProducts.products.map(({ id }) => ({
    params: {
      product_id: id,
    },
  }));

  // console.log("path: ", paths);

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product_id = parseInt(params.product_id as unknown as string);

  const client = getStandAloneApolloClient();

  await Promise.allSettled([
    client.query({
      query: GetProductDetailDocument,
      variables: { product_id },
    }),
    client.query({
      query: GetNumOfPostsByProductIdDocument,
      variables: { product_id },
    }),
    client.query({
      query: GetPostsByProductIdDocument,
      variables: { product_id },
    }),
  ]);

  // await client.query({
  //   query: GetProductDetailDocument,
  //   variables: { product_id },
  // });
  // await client.query({
  //   query: GetNumOfPostsByProductIdDocument,
  //   variables: { product_id },
  // });
  // await client.query({
  //   query: GetPostsByProductIdDocument,
  //   variables: { product_id },
  // });

  return {
    revalidate: 60,
    props: {
      product_id,
      apolloState: client.cache.extract(),
    },
  };
};

// export default SingleProduct;
export default withApollo({ ssr: false })(SingleProduct);
