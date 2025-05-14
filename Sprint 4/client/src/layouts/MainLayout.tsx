import React from "react";
import { Outlet } from "react-router";

import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar/Navbar.jsx";

const MainLayout = () => {
  return (
    <div className="w-full h-full ">
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default MainLayout;
