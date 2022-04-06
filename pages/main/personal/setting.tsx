import ProductsLayout from "../../../layouts/ProductsLayout";
import { Setting as MySetting } from "../../../components/personalPage";
import { withApollo } from "../../../utils/withApollo";

const Favorite = () => {
  return (
    <ProductsLayout>
      <main className="spacer-1 main-products">
        <MySetting />
      </main>
    </ProductsLayout>
  );
};

// export default Favorite;
export default withApollo({ ssr: false })(Favorite);
