import LandingLayout from "../layouts/LandingLayout";
import {
  Home as MyHome,
  About,
  Products,
  Members,
  Contact,
} from "../components/landingPage";
import { withApollo } from "../utils/withApollo";

const Home = () => {
  return (
    <LandingLayout>
      <main className="main spacer-1">
        <MyHome />
        <About />
        <Products />
        <Members />
        <Contact />
      </main>
    </LandingLayout>
  );
};

// Home.getLayout = getLayout;

// export default Home;

export default withApollo({ ssr: true })(Home);
