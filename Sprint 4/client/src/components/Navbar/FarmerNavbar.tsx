import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { IoLogOutOutline } from "react-icons/io5";
import useClickOutside from "../../hooks/useClickOutside";

const FarmerNavbar = () => {
  const [showNav, setShowNav] = useState(false);
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setShowNav(false));

  return (
    <nav className="w-full h-[60px] fixed top-0 left-0 right-0 bg-white shadow-sm shadow-gray-300  flex justify-center items-center z-50">
      <div className="max-w-5xl w-full px-2 flex justify-between items-center gap-8 h-full">
        <Link to="/" className="title-two text-green-800 cursor-pointer">
          AgriConnect
        </Link>
        <div className="flex justify-end items-center gap-8">
          <div className="relative w-max">
            <img
              src="https://media.istockphoto.com/id/1319254635/photo/latin-american-farmer-working-in-agriculture-at-a-farm.jpg?s=612x612&w=0&k=20&c=uSUaq4iNJB1TYt4RCCtf9sp6FdPyJyHbXqmKa9AqFHY="
              className="w-9 h-9 rounded-full object-cover cursor-pointer"
              alt=""
              onClick={() => setShowNav(true)}
            />
            {showNav && (
              <div
                ref={modalRef}
                className="w-[200px]  rounded-lg shadow-sm shadow-gray-300 bg-white absolute top-[110%] right-0"
              >
                <div className="flex w-full px-4 py-2 hover:bg-slate-100 cursor-pointer gap-2">
                  <img
                    src="https://media.istockphoto.com/id/1319254635/photo/latin-american-farmer-working-in-agriculture-at-a-farm.jpg?s=612x612&w=0&k=20&c=uSUaq4iNJB1TYt4RCCtf9sp6FdPyJyHbXqmKa9AqFHY="
                    className="w-7 h-7 rounded-full object-cover cursor-pointer"
                    alt=""
                  />
                  <p>Bilal Shek</p>
                </div>
                <div className="flex w-full px-4 py-2 hover:bg-slate-100 cursor-pointer gap-2">
                  <IoLogOutOutline className="w-7 h-7 text-red-700" />
                  <p className="text-red-700">Logout</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FarmerNavbar;
