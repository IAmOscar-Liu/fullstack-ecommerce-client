import { useRouter } from "next/router";
import {
  EditProduct as Edit,
  EditProps,
} from "../../../../components/personalPage";
import { withProductsLayout } from "../../../../layouts/ProductsLayout";

interface Props {}

const EditProduct: React.FC<Props> = ({}) => {
  const router = useRouter();
  const ProductsLayout = withProductsLayout<EditProps>({
    component: Edit,
    className: "spacer-1 main-products",
  });

  return <ProductsLayout product_id={router.query.product_id as string} />;
};

export default EditProduct;
// export default withApollo({ ssr: false })(EditProduct);
