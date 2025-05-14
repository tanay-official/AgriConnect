import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { signUpAPI } from "../features/auth/authSlice";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setType] = useState("farmer");
  const [gender, setGender] = useState("male");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("2001-02-22");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstname: firstName,
      lastname: lastName,

      email,
      username,
      password,
      confirmPassword,
      role: userType,
      gender,
      bio,
      phone,
      dob,
    };
    await dispatch(signUpAPI(data));
  };

  return (
    <div className="w-full  flex justify-center mt-28">
      <div className="w-full md:w-[80%]  lg:w-[50%]  flex justify-start flex-col bg-teal-100/50 md:py-4  md:px-20 py-8 px-16 rounded-3xl h-max">
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-3xl text-bold">SIGNUP</h2>
        </div>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="py-2 px-4 text-lg  bg-white border   rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="py-2 px-4 text-lg  bg-white border    rounded-lg w-full"
            />
          </div>
          <div className=" flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-4 text-lg   bg-white border     rounded-lg w-full"
            />{" "}
            <input
              type="text"
              placeholder="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-2 px-4 text-lg  bg-white border      rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-4 text-lg  bg-white border    rounded-lg w-full"
            />
            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="py-2 px-4 text-lg   bg-white border     rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <select
              className="py-2 px-4 text-lg  border    bg-white  rounded-lg w-full"
              required
              value={userType}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
            </select>
            <select
              onChange={(e) => setGender(e.target.value)}
              className="py-2 px-4 text-lg border bg-white  rounded-lg w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="phone"
              required
              placeholder="01603-232389"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="py-2 px-4 text-lg  bg-white border    rounded-lg w-full"
            />
            <input
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="py-2 px-4 text-lg  bg-white border    rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <textarea
              id="bio"
              name="bio"
              rows={3}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className=" mt-1 block w-full ß bg-white border    border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-4"
              placeholder="Tell us about yourself"
            ></textarea>
          </div>
          <button className=" mt-2 font-semibold hover:bg-gray-900 w-full py-2 px-4 bg-teal-800 text-white rounded-lg">
            {" "}
            Create Account
          </button>
          <div className="inline-flex gap-4 items-center">
            <p>Already have account?</p>{" "}
            <Link
              to="/auth/signin"
              className="cursor-pointer text-red-600 text-lg "
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
