import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout: React.FC = () => {
  const location = useLocation();
  const hideFooterRoutes = [
    "/login",
    "/signup",
    "/cart",
    "/items/order",
    "/items/order/history",
  ];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="mt-10">
      <Navbar />
      <Outlet />
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default Layout;
