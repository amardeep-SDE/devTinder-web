import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
const Requests = () => {
  const dispatch = useDispatch();

  const requests = useSelector((store) => store.requests);
  console.log("requests", requests);

  const reviewRequest = async (status, _id) => {
    try {
      const response = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      dispatch(removeRequests(_id));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
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
                className="border border-gray-300 p-4  flex  items-center  gap-4 rounded-lg"
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
                  <button
                    onClick={() => reviewRequest("accepted", request._id)}
                    className="btn btn-primary"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => reviewRequest("rejected", request._id)}
                    className="btn btn-secondary"
                  >
                    Reject
                  </button>
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
