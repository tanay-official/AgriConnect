import axios from "axios";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";

const MessageLayout = () => {
  const { anotherId } = useParams();
  const [prevMessages, setPrevMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { user, role } = useSelector((state) => state.auth);

  const [users, setUsers] = useState([]);

  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (anotherId !== "1") {
          const response = await fetch(
            `http://localhost:5050/api/user/single/${anotherId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          const data = await response.json();
          setCurrentUser(data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchCurrentUser();
  }, [anotherId]);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/user/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageData = {
      message: messageInput,
    };

    if (anotherId !== "1") {
      await axios.post(
        `http://localhost:5050/api/messages/send/${anotherId}`,
        messageData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    }
    window.location.reload();
  };
  ``;

  // Fetch previous messages when `anotherId` changes
  useEffect(() => {
    if (anotherId !== "1") {
      axios
        .get(`http://localhost:5050/api/messages/${anotherId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          setPrevMessages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [anotherId]);

  console.log("Previous Messages:", prevMessages);

  return (
    <div className="w-full h-[75vh] mt-6 rounded-xl bg-white p-4 sticky top-[72px]">
      <div className="flex h-full gap-4">
        {/* Sidebar */}
        <aside className="w-1/3 max-w-sm bg-green-50 rounded-2xl p-4 flex flex-col overflow-y-auto">
          <h2 className="font-heading text-xl text-green-800 mb-4">Messages</h2>
          <ul className="space-y-3">
            {users.map((item) => (
              <Link
                key={item._id}
                to={
                  role === "farmer"
                    ? `/farmer/${user.id}/messages/${item._id}`
                    : `/buyer/${user.id}/messages/${item._id}`
                }
              >
                <li className="p-3 rounded-xl hover:bg-green-100 cursor-pointer transition-colors">
                  <div className="flex items-center justify-start gap-2 mb-1">
                    <img
                      src={item.profilePic}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium text-gray-800">
                      {item.firstname} {item.lastname}
                    </span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </aside>

        {/* Chat Section */}
        <main className="flex-1 bg-gray-50 rounded-2xl flex flex-col overflow-hidden">
          {/* Header */}
          {anotherId === 0 ? (
            <></>
          ) : (
            <>
              <div className="px-6 py-4 flex items-center justify-start gap-2 bg-white rounded-t-2xl">
                <img
                  src={currentUser?.profilePic}
                  className="w-8 h-8 rounded-full"
                  alt=""
                />
                <h2 className="font-heading text-lg text-gray-800">
                  {currentUser?.firstname} {currentUser?.lastname}
                </h2>
              </div>

              {/* Messages Display */}
              <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto flex flex-col">
                {prevMessages.data?.length > 0 ? (
                  prevMessages.data.map((message, index) => (
                    <div
                      key={index}
                      className={`max-w-sm p-3 rounded-xl shadow-sm text-gray-800 ${
                        message.senderId !== user.id
                          ? "bg-white"
                          : "bg-green-100 self-end"
                      }`}
                    >
                      {message.content}
                    </div>
                  ))
                ) : (
                  <p>No messages yet</p>
                )}
              </div>

              {/* Input Section */}
              <form
                className="px-6 py-4 bg-white flex gap-3 items-center rounded-b-2xl"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors">
                  Send
                </button>
              </form>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default MessageLayout;
