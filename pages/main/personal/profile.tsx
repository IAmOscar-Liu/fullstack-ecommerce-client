import { withProductsLayout } from "../../../layouts/ProductsLayout";
import {
  Profile as MyProfile,
  ProfileOther as MyProfileOther,
} from "../../../components/personalPage";
import { useRouter } from "next/router";
import { ProfileOtherProps } from "../../../components/personalPage/pageComps/ProfileOther";

const Profile = () => {
  const router = useRouter();

  if (router.query.account_id) {
    const ProductsLayout = withProductsLayout<ProfileOtherProps>({
      component: MyProfileOther,
      className: "spacer-1 main-products",
    });
    return <ProductsLayout account_id={router.query.account_id as string} />;
  }

  const ProductsLayout = withProductsLayout({
    component: MyProfile,
    className: "spacer-1 main-products",
  });
  return <ProductsLayout />;
};

export default Profile;

// export default withApollo({ ssr: false })(Profile);
