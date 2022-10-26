import { withProductsLayout } from "../../../../layouts/ProductsLayout";
import { withOverviewLayout } from "../../../../layouts/OverviewLayout";
import { Shipping as MyShipping } from "../../../../components/overviewPage";

const MyOverviewLayout = () => {
  const OverviewLayout = withOverviewLayout({
    component: MyShipping,
  });

  return <OverviewLayout />;
};

const Shipping = () => {
  const ProductsLayout = withProductsLayout({
    component: MyOverviewLayout,
  });

  return <ProductsLayout />;
};

export default Shipping;
// export default withApollo({ ssr: true })(Shipping);
