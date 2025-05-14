import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import { logoutAPI } from "../../features/auth/authSlice";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = () => {
  const location = useLocation(); // Correct usage
  const { user, role } = useSelector((state) => state.auth);
  const [showNav, setShowNav] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useClickOutside(modalRef, () => setShowNav(false));
  const dipatch = useDispatch();
  const handleLogout = () => {
    dipatch(logoutAPI());
    setShowNav(false);
    navigate("/auth/signin");
  };

  return (
    <nav className="w-full h-[60px] fixed top-0 left-0 right-0 bg-white shadow-sm shadow-gray-300 flex justify-center items-center z-50">
      <div className="max-w-5xl w-full px-2 flex justify-between items-center gap-8 h-full">
        <Link to="/" className="title-two text-green-800 cursor-pointer">
          AgriConnect
        </Link>
        <div className="flex justify-end items-center gap-4">
          {user ? (
            <div className="flex justify-end items-center gap-8">
              <div className="relative w-max">
                <img
                  src={user?.profilePic}
                  className="w-9 h-9 rounded-full object-cover cursor-pointer object-top"
                  alt=""
                  onClick={() => setShowNav(true)}
                />
                {showNav && (
                  <div
                    ref={modalRef}
                    className="w-[200px] z-[100]  rounded-lg shadow-sm shadow-gray-300 bg-white absolute top-[110%] right-0"
                  >
                    <Link
                      to={`${
                        role === "farmer"
                          ? `/farmer/${user.id}`
                          : `/buyer/${user.id}`
                      }`}
                    >
                      <div className="flex w-full px-4 py-2 hover:bg-slate-100 cursor-pointer gap-2">
                        <img
                          src={user?.profilePic}
                          className="w-7 h-7 rounded-full object-cover object-top cursor-pointer"
                          alt=""
                        />
                        <p>
                          {user.firstname} {user.lastname}
                        </p>
                      </div>
                    </Link>

                    <div
                      className="flex w-full px-4 py-2 hover:bg-slate-100 cursor-pointer gap-2"
                      onClick={handleLogout}
                    >
                      <IoLogOutOutline className="w-7 h-7 text-red-700" />
                      <p className="text-red-700">Logout</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {location.pathname !== "/auth/signin" && (
                <NavLink
                  to="/auth/signin"
                  className="footnote py-1.5 px-6 rounded-lg text-white bg-teal-500"
                >
                  Sign In
                </NavLink>
              )}
              {location.pathname !== "/auth/signup" && (
                <NavLink
                  to="/auth/signup"
                  className="footnote py-1.5 px-6 rounded-lg text-white bg-teal-500"
                >
                  Sign Up
                </NavLink>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
