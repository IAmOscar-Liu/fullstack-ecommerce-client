import { ReactElement } from "react";
import { Header, Footer } from "../components/landingPage";

interface Props {
  children: JSX.Element;
}

const LandingLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="app">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export const getLayout = (page: ReactElement) => (
  <LandingLayout>{page}</LandingLayout>
);

export default LandingLayout;
