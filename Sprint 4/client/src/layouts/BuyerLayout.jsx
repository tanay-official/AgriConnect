import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import BuyerNavbar from "../components/Navbar/BuyerNavbar";
import MainContainer from "../container/MainContainer";
import BuyerSidebar from "../components/buyer/BuyerSIdebar";
import { useSelector } from "react-redux";

const BuyerLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/signin");
    }
  }, [isAuthenticated]);
  return (
    <div className="w-full bg-gray-100 ">
      <main className="w-full pt-12">
        <MainContainer>
          <div className="flex justify-start h-[calc(100vh-20px)] items-start gap-3 relative">
            <BuyerSidebar />
            <Outlet />
          </div>
        </MainContainer>
      </main>
    </div>
  );
};

export default BuyerLayout;
