import ProductsLayout from "../../layouts/ProductsLayout";
import { withApollo } from "../../utils/withApollo";

const Main = () => {
  return (
    <ProductsLayout>
      <main className="spacer-1 main-products" style={{ display: "flex" }}>
        <h1
          style={{
            margin: "auto",
            width: "80%",
            textAlign: "center",
            color: "rgb(94, 88, 88)",
          }}
        >
          View our products by clicking the lists on the left sidebar
        </h1>
      </main>
    </ProductsLayout>
  );
};

// export default Main;
export default withApollo({ ssr: true })(Main);
