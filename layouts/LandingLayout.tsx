import { NextComponentType } from "next";
import { Header, Footer } from "../components/landingPage";

export const withLandingLayout = <T extends {}>({
  component: Component,
  className = "",
}: {
  component: NextComponentType<T>;
  className?: string;
}) => {
  return (props: T) => {
    return (
      <div className="app">
        <Header />
        <main className={className}>
          <Component {...props} />
        </main>
        <Footer />
      </div>
    );
  };
};
