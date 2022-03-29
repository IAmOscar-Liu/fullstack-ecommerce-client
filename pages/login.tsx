import LandingLayout from "../layouts/LandingLayout";
import { Login as MyLogin } from "../components/landingPage";
import { withApollo } from "../utils/withApollo";

const Login = () => {
  return (
    <LandingLayout>
      <main className="spacer-1">
        <MyLogin />
      </main>
    </LandingLayout>
  );
};

// Login.getLayout = getLayout;

// export default Login;

export default withApollo({ ssr: false })(Login);
