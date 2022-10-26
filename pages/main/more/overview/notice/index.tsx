import { withProductsLayout } from "../../../../../layouts/ProductsLayout";
import { withOverviewLayout } from "../../../../../layouts/OverviewLayout";
import { Notice as MyNotice } from "../../../../../components/overviewPage";

const MyOverviewLayout = () => {
  const OverviewLayout = withOverviewLayout({
    component: MyNotice,
  });

  return <OverviewLayout />;
};

const Notice = () => {
  const ProductsLayout = withProductsLayout({
    component: MyOverviewLayout,
  });

  return <ProductsLayout />;
};

export default Notice;
// export default withApollo({ ssr: true })(Notice);
