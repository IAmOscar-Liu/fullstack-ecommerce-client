import { withProductsLayout } from "../../layouts/ProductsLayout";

const Children: React.FC = () => (
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
);

const Main = () => {
  const ProductsLayout = withProductsLayout({
    component: Children,
    className: "spacer-1 main-products",
    style: { display: "flex" },
  });

  return <ProductsLayout />;
};

export default Main;
// export default withApollo({ ssr: true })(Main);
