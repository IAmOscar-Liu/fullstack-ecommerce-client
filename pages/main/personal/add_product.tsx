import ProductsLayout from "../../../layouts/ProductsLayout";
import { AddProduct as MyAddProduct } from "../../../components/personalPage";
import { withApollo } from "../../../utils/withApollo";

const AddProduct = () => {
  return (
    <ProductsLayout>
      <main className="spacer-1 main-products">
        <MyAddProduct />
      </main>
    </ProductsLayout>
  );
};

export default withApollo({ ssr: false })(AddProduct);
