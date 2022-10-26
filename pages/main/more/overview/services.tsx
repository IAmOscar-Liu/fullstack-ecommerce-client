import { withProductsLayout } from "../../../../layouts/ProductsLayout";
import { withOverviewLayout } from "../../../../layouts/OverviewLayout";
import { Service as MyService } from "../../../../components/overviewPage";

const MyOverviewLayout = () => {
  const OverviewLayout = withOverviewLayout({
    component: MyService,
  });

  return <OverviewLayout />;
};

const Service = () => {
  const ProductsLayout = withProductsLayout({
    component: MyOverviewLayout,
  });

  return <ProductsLayout />;
};

export default Service;
// export default withApollo({ ssr: false })(Service);
