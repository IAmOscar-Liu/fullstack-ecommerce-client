import { withProductsLayout } from "../../../../layouts/ProductsLayout";
import { withOverviewLayout } from "../../../../layouts/OverviewLayout";
import { Contact as MyContact } from "../../../../components/overviewPage";

const MyOverviewLayout = () => {
  const OverviewLayout = withOverviewLayout({
    component: MyContact,
  });

  return <OverviewLayout />;
};

const Contact = () => {
  const ProductsLayout = withProductsLayout({
    component: MyOverviewLayout,
  });

  return <ProductsLayout />;
};

export default Contact;
// export default withApollo({ ssr: true })(Contact);
