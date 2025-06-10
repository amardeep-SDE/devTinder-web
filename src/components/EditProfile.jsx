import React, { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
const EditProfile = ({ user }) => {

    console.log("user in edit profile", user);

    const dispatch = useDispatch();
    
    
  const actualUser = user?.user || user; // agar user.user hai toh woh lo, warna user lo

  const [firstName, setFirstName] = useState(actualUser.firstName || "");
  const [lastName, setLastName] = useState(actualUser.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(actualUser.photoUrl || "");
  const [age, setAge] = useState(actualUser.age || "");
  const [gender, setGender] = useState(actualUser.gender || "");
  const [about, setAbout] = useState(actualUser.about || "");
    const [error, setError] = useState("");
  

  const saveProfile = async () => {
    try {
      
      const response = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      console.log(response.data.user);
      dispatch(addUser(response.data.user));
    } catch (error) {
      console.error("Error saving profile:", error);
      setError(error.response.data);
      
    }
  }

  return (
    <>
    <div className="flex justify-center my-10">

    <div className=" max-w-md mx-20 mt-8 flex justify-center">
      <h2 className="text-2xl font-semibold text-center text-gray-800 ">
        Edit Profile
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            First Name
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Photo URL
          </label>
          <input
            type="text"
            placeholder="Photo URL"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>

       <div>
  <label className="block text-gray-600 font-medium mb-1">Age</label>
  <input
    type="text" // 👈 change from "number" to "text"
    placeholder="Age"
    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={age}
    onChange={(e) => setAge(e.target.value)}
  />
</div>

<div>
  <label className="block text-gray-600 font-medium mb-1">Gender</label>
  <input
    type="text"
    placeholder="Gender"
    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={gender}
    onChange={(e) => setGender(e.target.value)}
  />
</div>


        <div>
          <label className="block text-gray-600 font-medium mb-1">About</label>
          <textarea
            placeholder="About"
            rows={3}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
 {error && (
          <div className="alert alert-error shadow-lg mb-4">
            <div>
              <span>{error}</span>
            </div>
          </div>
        )}
        <div className="text-right">
          <button onClick={saveProfile} className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
            Save Profile
          </button>
        </div>
      </div>
    </div>
    <UserCard user={{ firstName, lastName, photoUrl, about, age, gender }} />
    </div>

    </>
  );
};

export default EditProfile;
