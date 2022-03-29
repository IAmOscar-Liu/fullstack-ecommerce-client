import ProductsLayout from "../../../../layouts/ProductsLayout";
import OverviewLayout from "../../../../layouts/OverviewLayout";
import { Contact as MyContact } from "../../../../components/overviewPage";
import { withApollo } from "../../../../utils/withApollo";

const Contact = () => {
  return (
    <ProductsLayout>
      <OverviewLayout>
        <MyContact />
      </OverviewLayout>
    </ProductsLayout>
  );
};

// export default Contact;
export default withApollo({ ssr: true })(Contact);
