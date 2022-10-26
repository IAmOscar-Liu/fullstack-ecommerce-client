import { withProductsLayout } from "../../../layouts/ProductsLayout";
import { Favorite as MyFavorite } from "../../../components/personalPage";

const Favorite = () => {
  const ProductsLayout = withProductsLayout({
    component: MyFavorite,
    className: "spacer-1 main-products",
  });

  return <ProductsLayout />;
};

export default Favorite;
// export default withApollo({ ssr: false })(Favorite);
