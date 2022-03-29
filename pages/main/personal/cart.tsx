import ProductsLayout from "../../../layouts/ProductsLayout";
import { Cart as MyCart } from "../../../components/personalPage";
import { withApollo } from "../../../utils/withApollo";

const Cart = () => {
  return (
    <ProductsLayout>
      <main className="spacer-1 main-products">
        <MyCart />
      </main>
    </ProductsLayout>
  );
};

export default withApollo({ ssr: false })(Cart);
