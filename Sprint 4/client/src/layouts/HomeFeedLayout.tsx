import React from "react";
import { Outlet } from "react-router";

const HomeFeedLayout: React.FC = () => {
  return (
    <div className="w-full bg-green-50/30 ">
      <Outlet />
    </div>
  );
};

export default HomeFeedLayout;
