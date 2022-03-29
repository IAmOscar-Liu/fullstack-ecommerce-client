import ProductsLayout from "../../../../layouts/ProductsLayout";
import OverviewLayout from "../../../../layouts/OverviewLayout";
import { Shipping as MyShipping } from "../../../../components/overviewPage";
import { withApollo } from "../../../../utils/withApollo";

const Shipping = () => {
  return (
    <ProductsLayout>
      <OverviewLayout>
        <MyShipping />
      </OverviewLayout>
    </ProductsLayout>
  );
};

// export default AboutUs;
export default withApollo({ ssr: true })(Shipping);
