import React from "react";
import { Link } from "react-router";
import { CiUser } from "react-icons/ci";
import { RiAlignItemLeftLine } from "react-icons/ri";
import { FiMessageSquare } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";

const BuyerSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-[250px] sticky top-[72px] z-20 pt-10 pb-10 rounded-lg shadow-sm shadow-gray-300 bg-white">
      <div className="w-full grid grid-cols-1 gap-3 ">
        <Link
          to="/buyer/1"
          className="header flex justify-start items-center gap-3 w-full py-2 hover:bg-slate-100 px-8"
        >
          <RiAlignItemLeftLine className="w-5 h-6 " />
          Dashboard
        </Link>
        <Link
          to="/buyer/1/cart"
          className="header flex justify-start items-center gap-3 w-full py-2 hover:bg-slate-100 px-8"
        >
          <CiShoppingCart className="w-5 h-6 " />
          cart
        </Link>
        <Link
          to={`/farmer/${user.id}/messages/681e58e9baf607c7e4233310`}
          className="header flex justify-start items-center gap-3 w-full py-2
          hover:bg-slate-100 px-8"
        >
          <FiMessageSquare className="w-5 h-6 " />
          Messages
        </Link>
      </div>
    </div>
  );
};

export default BuyerSidebar;
