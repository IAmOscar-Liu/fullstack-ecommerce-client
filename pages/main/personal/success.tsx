import { withProductsLayout } from "../../../layouts/ProductsLayout";
import { Success as MySucess } from "../../../components/personalPage";
// import { withApollo } from "../../../utils/withApollo";

const Success = () => {
  const ProductsLayout = withProductsLayout({
    component: MySucess,
    className: "spacer-1 main-products",
  });

  return <ProductsLayout />;
};

export default Success;

// export default withApollo({ ssr: false })(Success);
