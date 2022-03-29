import ProductsLayout from "../../../../layouts/ProductsLayout";
import OverviewLayout from "../../../../layouts/OverviewLayout";
import { Service as MyService } from "../../../../components/overviewPage";
import { withApollo } from "../../../../utils/withApollo";

const Service = () => {
  return (
    <ProductsLayout>
      <OverviewLayout>
        <MyService />
      </OverviewLayout>
    </ProductsLayout>
  );
};

// export default Service;
export default withApollo({ ssr: false })(Service);
