import ProductsLayout from "../../../../../layouts/ProductsLayout";
import OverviewLayout from "../../../../../layouts/OverviewLayout";
import { Notice as MyNotice } from "../../../../../components/overviewPage";
import { withApollo } from "../../../../../utils/withApollo";

const Notice = () => {
  return (
    <ProductsLayout>
      <OverviewLayout>
        <MyNotice />
      </OverviewLayout>
    </ProductsLayout>
  );
};

// export default Notice;
export default withApollo({ ssr: true })(Notice);
