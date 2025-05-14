import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { IoLogOutOutline } from "react-icons/io5";
import useClickOutside from "../../hooks/useClickOutside";

const BuyerNavbar = () => {
  return (
    <nav className="w-full h-[60px] fixed top-0 left-0 right-0 bg-white shadow-sm shadow-gray-300  flex justify-center items-center z-50">
      <div className="max-w-5xl w-full px-2 flex justify-between items-center gap-8 h-full">
        <Link to="/" className="title-two text-green-800 cursor-pointer">
          AgriConnect
        </Link>
      </div>
    </nav>
  );
};

export default BuyerNavbar;
