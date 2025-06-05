import React from "react";

const UserCard = ({ user }) => {
  console.log("UserCard props:", user);
  const { firstName, lastName, photoUrl, email, about, age, gender } = user;
//   console.log("UserCard details:", firstName, lastName, photoUrl, email, about);
  

  return (
    <>
        <div className="card bg-base-100 w-96 shadow-sm flex flex-col items-center p-4">
  {/* User avatar */}
  <figure>
    <img
      src={photoUrl}
      className=" "
      alt="User Avatar"
    />
  </figure>

  {/* Card body */}
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
   { age && gender && (
    <p className="text-sm text-gray-500">
      {age} years old, {gender}
    </p>
  )}
    <p>{about}</p>

    {/* Actions */}
    <div className="card-actions justify-end">
        <button className="btn btn-secondary">Ignored</button>
      <button className="btn btn-primary">Interested</button>
    </div>
  </div>
</div>

    </>
  );
};

export default UserCard;
