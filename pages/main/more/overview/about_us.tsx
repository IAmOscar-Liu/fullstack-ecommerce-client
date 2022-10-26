import { withProductsLayout } from "../../../../layouts/ProductsLayout";
import { withOverviewLayout } from "../../../../layouts/OverviewLayout";
import { AboutUs as US } from "../../../../components/overviewPage";

const MyOverviewLayout = () => {
  const OverviewLayout = withOverviewLayout({
    component: US,
  });

  return <OverviewLayout />;
};

const AboutUs = () => {
  const ProductsLayout = withProductsLayout({
    component: MyOverviewLayout,
  });

  return <ProductsLayout />;
};

export default AboutUs;
// export default withApollo({ ssr: true })(AboutUs);
