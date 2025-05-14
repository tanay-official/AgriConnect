import React, { useEffect, useState } from "react";

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [form, setForm] = useState(user);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-8 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-teal-800">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="py-2 px-4 text-lg bg-white border rounded-lg w-full"
              required
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="py-2 px-4 text-lg bg-white border rounded-lg w-full"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="py-2 px-4 text-lg bg-white border rounded-lg w-full"
              required
            />
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="py-2 px-4 text-lg bg-white border rounded-lg w-full"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="py-2 px-4 text-lg bg-white border rounded-lg w-full"
              required
            />
            <input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              className="py-2 px-4 text-lg bg-white border rounded-lg w-full"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="py-2 px-4 text-lg bg-white border rounded-lg w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <textarea
            name="bio"
            rows={3}
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            className="py-2 px-4 text-lg bg-white border rounded-lg w-full"
            required
          />
          <div className="flex justify-end gap-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-900 cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
