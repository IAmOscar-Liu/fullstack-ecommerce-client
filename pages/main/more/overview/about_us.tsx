import ProductsLayout from "../../../../layouts/ProductsLayout";
import OverviewLayout from "../../../../layouts/OverviewLayout";
import { AboutUs as US } from "../../../../components/overviewPage";
import { withApollo } from "../../../../utils/withApollo";

const AboutUs = () => {
  return (
    <ProductsLayout>
      <OverviewLayout>
        <US />
      </OverviewLayout>
    </ProductsLayout>
  );
};

// export default AboutUs;
export default withApollo({ ssr: true })(AboutUs);
