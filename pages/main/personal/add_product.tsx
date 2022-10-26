import { withProductsLayout } from "../../../layouts/ProductsLayout";
import { AddProduct as MyAddProduct } from "../../../components/personalPage";

const AddProduct = () => {
  const ProductsLayout = withProductsLayout({
    component: MyAddProduct,
    className: "spacer-1 main-products",
  });

  return <ProductsLayout />;
};

export default AddProduct;
// export default withApollo({ ssr: false })(AddProduct);
