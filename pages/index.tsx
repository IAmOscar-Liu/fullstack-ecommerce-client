import { withLandingLayout } from "../layouts/LandingLayout";
import {
  Home as MyHome,
  About,
  Products,
  Members,
  Contact,
} from "../components/landingPage";

const Children: React.FC = () => (
  <>
    <MyHome />
    <About />
    <Products />
    <Members />
    <Contact />
  </>
);

const Home = () => {
  const LandingLayout = withLandingLayout({
    component: Children,
    className: "main spacer-1",
  });

  return <LandingLayout />;
};

export default Home;

// export default withApollo({ ssr: true })(Home);
