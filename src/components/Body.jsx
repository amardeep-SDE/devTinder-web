import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'


const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {

    if (userData.user) {
      // console.log("User already exists in store:", userData.user);
      return;
    }
  try {
    const response = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
    // console.log("User data fetched:", response.data);
    
    dispatch(addUser(response.data));
  } catch (error) {
    console.error("Error fetching user data:", error);
    if(error.response && error.response.status === 401) {
      navigate("/login");
    }
  }
};

useEffect(() => {
  fetchUser();
}, []);

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body