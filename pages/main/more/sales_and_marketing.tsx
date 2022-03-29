import ProductsLayout from "../../../layouts/ProductsLayout";
import { Sale as MySale } from "../../../components/overviewPage";
import { withApollo } from "../../../utils/withApollo";

const Sale = () => {
  return (
    <ProductsLayout>
      <main className="spacer-1 main-products">
        <MySale />
      </main>
    </ProductsLayout>
  );
};

// export default Sale;
export default withApollo({ ssr: false })(Sale);
