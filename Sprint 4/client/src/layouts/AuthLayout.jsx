import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import AuthNavbar from "../components/Navbar/AuthNavbar";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div className="w-full min-h-screen h-full flex justify-center  bg-white">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
