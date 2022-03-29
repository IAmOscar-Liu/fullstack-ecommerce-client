import ProductsLayout from "../../../layouts/ProductsLayout";
import { Favorite as MyFavorite } from "../../../components/personalPage";
import { withApollo } from "../../../utils/withApollo";

const Favorite = () => {
  return (
    <ProductsLayout>
      <main className="spacer-1 main-products">
        <MyFavorite />
      </main>
    </ProductsLayout>
  );
};

// export default Favorite;
export default withApollo({ ssr: false })(Favorite);
