import React, { useState } from "react";
import EditProfileModal from "./EditProfileModal";

const FarmerProfile = () => {
  const [user, setUser] = useState({
    firstName: "Biddut",
    lastName: "Ali",
    email: "biddut@example.com",
    username: "biddutali",
    userType: "recruiter",
    gender: "male",
    bio: "I grow Potato & Oats in Dinajpur.",
    phone: "01603232389",
    dob: "2001-02-22",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 w-full bg-white pb-8 rounded-lg px-6 pt-4 mt-6">
      <div className="flex justify-between items-center gap-6 ">
        <h3 className="title-three">PROFILE DASHBOARD</h3>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="footnote bg-teal-800 font-medium text-white py-1.5 px-6 rounded-xl cursor-pointer"
        >
          Edit Profile
        </button>
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={user}
          onSave={handleUpdate}
        />
      </div>
      <div className="space-y-4 text-lg mt-8">
        <p>
          <strong>Full Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Date of Birth:</strong> {user.dob}
        </p>
        <p>
          <strong>Gender:</strong> {user.gender}
        </p>
        <p>
          <strong>Role:</strong>{" "}
          {user.userType === "recruiter" ? "Farmer" : "Buyer"}
        </p>
        <p>
          <strong>Bio:</strong> {user.bio}
        </p>
      </div>
    </div>
  );
};

export default FarmerProfile;
