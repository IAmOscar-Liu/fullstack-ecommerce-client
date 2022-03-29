import ProductsLayout from "../../../layouts/ProductsLayout";
import {
  Profile as MyProfile,
  ProfileOther as MyProfileOther,
} from "../../../components/personalPage";
import { withApollo } from "../../../utils/withApollo";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();

  return (
    <ProductsLayout>
      <main className="spacer-1 main-products">
        {router.query.account_id ? (
          <MyProfileOther account_id={router.query.account_id as string} />
        ) : (
          <MyProfile />
        )}
      </main>
    </ProductsLayout>
  );
};

// export default Profile;

export default withApollo({ ssr: false })(Profile);
