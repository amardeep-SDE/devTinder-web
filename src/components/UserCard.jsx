import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  // console.log("UserCard props:", user);
  const { _id, firstName, lastName, photoUrl, about, age, gender } = user;
  // console.log( _id, firstName, lastName, photoUrl, about, age, gender );
  

  const dispatch = useDispatch();
  const handleSendRequest = async( status, userId) => {
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true }); 
      console.log(res.data);
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm flex flex-col items-center p-4">
        {/* User avatar */}
        <figure>
          <img src={photoUrl} className=" " alt="User Avatar" />
        </figure>

        {/* Card body */}
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && (
            <p className="text-sm text-gray-500">
              {age} years old, {gender}
            </p>
          )}
          <p>{about}</p>

          {/* Actions */}
          <div className="card-actions justify-end">
            <button onClick={() => handleSendRequest("ignored", _id)} className="btn btn-secondary">Ignored</button>
            <button onClick={() => handleSendRequest("interested", _id)} className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
