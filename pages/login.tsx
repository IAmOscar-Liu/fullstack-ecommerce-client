import { withLandingLayout } from "../layouts/LandingLayout";
import { Login as MyLogin } from "../components/landingPage";

const Login = () => {
  const LandingLayout = withLandingLayout({
    component: MyLogin,
    className: "spacer-1",
  });

  return <LandingLayout />;
};

export default Login;
