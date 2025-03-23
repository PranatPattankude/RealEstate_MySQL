import React, { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

import authService from "../Servises/authService";
import ProfileEditModal from "./ProfileModal/ProfileEditModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [showEditModal,setShowEditModal]=useState(false)
  const [selectedUser,setSelectedUser]=useState([])

function handleClose(){
  setShowEditModal(false)
  setSelectedUser(null)
  fetchData()
}
  function handleEdit(user) {
    setSelectedUser(user)

    setShowEditModal(true)
  }

  async function fetchData() {
    try {
      const userInfo = await authService.getUser();
      if (userInfo) {
        setUser(userInfo);
      } else {
        console.error("Failed to fetch user information.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    if (!token) {
      alert("User is not Authenticated !!");
      return;
    }

   
    fetchData();
  }, [token]);

  if (!user) {
    return <div className="text-center my-5">Loading profile...</div>;
  }

  // modal function

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-700 p-6"
        style={{ minHeight: "350px" }}
      >
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-purple-600 to-blue-500 rounded-t-2xl"></div>
          <div className="relative mt-12 flex flex-col items-center">
            <div className="w-28 h-28 bg-gray-300 rounded-full border-4 border-white shadow-md"></div>
            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              {user.name}
            </h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">Mobile: {user.MobNo || "N/A"}</p>
            <p className="text-gray-700 font-medium mt-3 px-4 py-1 bg-gray-100 rounded-full">
              {user.role}
            </p>
            <button
              className="mt-5 px-5 py-2 bg-blue-600 text-white btn btn-primary rounded-full flex items-center gap-2 hover:bg-blue-700 transition duration-300 shadow-md"
              onClick={() => handleEdit(user)}
            >
              <Edit size={18} /> Edit Profile
            </button>
          </div>
        </div>
      </div>
      {selectedUser && (
        <ProfileEditModal
          Show={showEditModal}
          user={selectedUser}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default Profile;
