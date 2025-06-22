import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connections);
  console.log("connections", connections);

  const fetchConnections = async () => {
    try {
      const response = await axios(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(response.data.data);
      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <div>No connections</div>;

  return (
    <>
      <div className="text gap-4 my-4 w-full flex flex-col justify-center items-center ">
        <h2 className=" mb-4">Connections</h2>
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <>
              <div
                className="border border-gray-300 p-4 w-1/3 flex  items-center gap-4 rounded-lg"
                key={firstName + lastName}
              >
                <img alt="" src={photoUrl} className="w-12 h-12 rounded-lg" />
               <div>
                 <h3>{firstName + " " + lastName}</h3>
                <p>
                  {age} years old, {gender}
                </p>
                <p>{about}</p>
               </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Connections;
