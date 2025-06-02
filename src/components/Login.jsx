import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("radha@gmail.com");
  const [password, setPassword] = useState("Radha@123");

  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      dispatch(addUser(response.data))
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="card bg-primary text-primary-content w-96 mx-auto mt-6">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              name="emailId"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="text-gray-400 input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">password </span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-gray-400 input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <button
          onClick={handleLogin}
          className=" w-full max-w-xs mx-auto bg-secondary hover:bg-secondary-focus text-secondary-content font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mb-4 text-white"
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
