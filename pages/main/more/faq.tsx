import ProductsLayout from "../../../layouts/ProductsLayout";
import { FAQ as MyFAQ } from "../../../components/overviewPage";
import { withApollo } from "../../../utils/withApollo";

const FAQ = () => {
  return (
    <ProductsLayout>
      <main className="spacer-1 main-products">
        <MyFAQ />
      </main>
    </ProductsLayout>
  );
};

// export default FAQ;
export default withApollo({ ssr: true })(FAQ);
