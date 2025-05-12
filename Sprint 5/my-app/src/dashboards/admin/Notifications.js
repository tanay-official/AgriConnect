import React, { useState } from "react";
import { Bell } from "lucide-react";

const mockReports = [
  { id: 1, message: "User John reported a scam product." },
  { id: 2, message: "Low rating on 'Tomatoes'" },
];

const Notifications = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <Bell className="w-6 h-6 text-gray-700" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border shadow-md rounded-lg z-10">
          <div className="p-4 border-b font-semibold">Notifications</div>
          <ul>
            {mockReports.map((r) => (
              <li key={r.id} className="p-3 border-b text-sm text-gray-700">
                {r.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
