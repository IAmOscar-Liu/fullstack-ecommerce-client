import { withProductsLayout } from "../../../layouts/ProductsLayout";
import { Setting as MySetting } from "../../../components/personalPage";

const Favorite = () => {
  const ProductsLayout = withProductsLayout({
    component: MySetting,
    className: "spacer-1 main-products",
  });

  return <ProductsLayout />;
};

export default Favorite;
// export default withApollo({ ssr: false })(Favorite);
