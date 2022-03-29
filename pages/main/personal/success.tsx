import ProductsLayout from "../../../layouts/ProductsLayout";
import { Success as MySucess } from "../../../components/personalPage";
import { withApollo } from "../../../utils/withApollo";

const Success = () => {
  return (
    <ProductsLayout>
      <main className="spacer-1 main-products">
        <MySucess />
      </main>
    </ProductsLayout>
  );
};

// export default Profile;

export default withApollo({ ssr: false })(Success);
