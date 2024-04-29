import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Toast from "../components/Toast";

const Layout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <main className={`bg-primary-50 flex-1 pt-6`}>
        <Outlet />
        <Toast />
      </main>
    </section>
  );
};

export default Layout;
