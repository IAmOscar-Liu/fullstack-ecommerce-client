import { withProductsLayout } from "../../../../layouts/ProductsLayout";
import { withOverviewLayout } from "../../../../layouts/OverviewLayout";
import { Payment } from "../../../../components/overviewPage";

const MyOverviewLayout = () => {
  const OverviewLayout = withOverviewLayout({
    component: Payment,
  });

  return <OverviewLayout />;
};

const PaymentMethods = () => {
  const ProductsLayout = withProductsLayout({
    component: MyOverviewLayout,
  });

  return <ProductsLayout />;
};

export default PaymentMethods;
// export default withApollo({ ssr: true })(PaymentMethods);
