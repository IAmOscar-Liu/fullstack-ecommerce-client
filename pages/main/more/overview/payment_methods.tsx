import ProductsLayout from "../../../../layouts/ProductsLayout";
import OverviewLayout from "../../../../layouts/OverviewLayout";
import { Payment } from "../../../../components/overviewPage";
import { withApollo } from "../../../../utils/withApollo";

const PaymentMethods = () => {
  return (
    <ProductsLayout>
      <OverviewLayout>
        <Payment />
      </OverviewLayout>
    </ProductsLayout>
  );
};

// export default PaymentMethods;
export default withApollo({ ssr: true })(PaymentMethods);
