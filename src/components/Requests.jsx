import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
const Requests = () => {
  const dispatch = useDispatch();

  const requests = useSelector((store) => store.requests);
  console.log("requests", requests);

  const fetchRequests = async () => {
    try {
      const response = await axios(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(response.data);
      dispatch(addRequests(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <div>No requests</div>;

  return (
    <>
      <div className="text gap-4 my-4 w-full flex flex-col justify-center items-center ">
        <h2 className=" mb-4">Requests</h2>
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <>
              <div
                className="border border-gray-300 p-4 w-1/3 flex  items-center px-30 gap-4 rounded-lg"
                key={_id}
              >
                <img alt="" src={photoUrl} className="w-12 h-12 rounded-lg" />
                <div>
                  <h3>{firstName + " " + lastName}</h3>
                  <p>
                    {age} years old, {gender}
                  </p>
                  <p>{about}</p>
                 
                </div>
                <div className="flex gap-2">
                     <button className="btn btn-primary">Accept</button>
                  <button className="btn btn-secondary">Reject</button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Requests;
