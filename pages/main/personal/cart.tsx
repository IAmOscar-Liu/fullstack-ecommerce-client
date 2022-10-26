import { withProductsLayout } from "../../../layouts/ProductsLayout";
import { Cart as MyCart } from "../../../components/personalPage";

const Cart = () => {
  const ProductsLayout = withProductsLayout({
    component: MyCart,
    className: "spacer-1 main-products",
  });

  return <ProductsLayout />;
};

export default Cart;
// export default withApollo({ ssr: false })(Cart);
