import { useState, useEffect, CSSProperties } from "react";
import { Header, Aside } from "../components/ProductsPage";
import { useRouter } from "next/router";
import { NextComponentType } from "next";

export const withProductsLayout = <T extends {}>({
  component: Component,
  className = "",
  style = {},
  searchTerm = "",
}: {
  component: NextComponentType<T>;
  className?: string;
  style?: CSSProperties;
  searchTerm?: string;
}) => {
  return (props: T) => {
    const [sidebarOpen, toggleSidebarOpen] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
      if (sidebarOpen) toggleSidebarOpen(false);
    }, [router.pathname, router.asPath]);

    return (
      <div className="app">
        <Header
          sidebarOpen={sidebarOpen}
          toggleSidebarOpen={toggleSidebarOpen}
        />
        <Aside sidebarOpen={sidebarOpen} />
        <main className={className} style={style}>
          <Component {...props} />
        </main>
      </div>
    );
  };
};
