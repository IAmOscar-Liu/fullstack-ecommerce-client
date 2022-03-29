import { useState, ReactElement, useEffect } from "react";
import { Header, Aside } from "../components/ProductsPage";
import { useRouter } from "next/router";

interface Props {
  children: JSX.Element;
}

const ProductsLayout: React.FC<Props> = ({ children }) => {
  const [sidebarOpen, toggleSidebarOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (sidebarOpen) toggleSidebarOpen(false);
  }, [router.pathname, router.asPath]);

  return (
    <div className="app">
      <Header sidebarOpen={sidebarOpen} toggleSidebarOpen={toggleSidebarOpen} />
      <Aside sidebarOpen={sidebarOpen} />

      {children}
    </div>
  );
};

export const getLayout = (page: ReactElement) => (
  <ProductsLayout>{page}</ProductsLayout>
);

export default ProductsLayout;
