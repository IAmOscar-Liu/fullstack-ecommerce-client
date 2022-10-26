import { withProductsLayout } from "../../../layouts/ProductsLayout";
import { FAQ as MyFAQ } from "../../../components/overviewPage";
// import { withApollo } from "../../../utils/withApollo";

const FAQ = () => {
  const ProductsLayout = withProductsLayout({
    component: MyFAQ,
    className: "spacer-1 main-products",
  });

  return <ProductsLayout />;
};

export default FAQ;
// export default withApollo({ ssr: true })(FAQ);
