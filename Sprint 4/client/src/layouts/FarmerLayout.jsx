import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import MainContainer from "../container/MainContainer";
import Sidebar from "../components/farmer/Sidebar";
import { useSelector } from "react-redux";

const FarmerLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/signin");
    }
  }, [isAuthenticated]);
  return (
    <div className="w-full bg-teal-100 ">
      <main className="w-full pt-12">
        <MainContainer>
          <div className="flex justify-start h-[calc(100vh-20px)] items-start gap-3 relative">
            <Sidebar />
            <Outlet />
          </div>
        </MainContainer>
      </main>
    </div>
  );
};

export default FarmerLayout;
