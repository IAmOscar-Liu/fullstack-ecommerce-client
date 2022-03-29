import { useRouter } from "next/router";
import { withApollo } from "../../../../utils/withApollo";
import { EditProduct as Edit } from "../../../../components/personalPage";
import ProductsLayout from "../../../../layouts/ProductsLayout";

interface Props {}

const EditProduct: React.FC<Props> = ({}) => {
  const router = useRouter();

  return (
    <ProductsLayout>
      <main className="spacer-1 main-products">
        <Edit product_id={router.query.product_id as string} />
      </main>
    </ProductsLayout>
  );
};

export default withApollo({ ssr: false })(EditProduct);
