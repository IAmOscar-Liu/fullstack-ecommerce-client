import { withProductsLayout } from "../../../layouts/ProductsLayout";
import { Sale as MySale } from "../../../components/overviewPage";

const Sale = () => {
  const ProductsLayout = withProductsLayout({
    component: MySale,
    className: "spacer-1 main-products",
  });

  return <ProductsLayout />;
};

export default Sale;
// export default withApollo({ ssr: false })(Sale);
