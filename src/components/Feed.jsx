import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);
  // console.log("Feed:", feed);

  const getFeed = async () => {
    if (feed) {
      return;
    }
    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(response.data);
      dispatch(addFeed(response.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return;
  if(feed.length === 0) return <div>No feed</div>;
  return (
   <>
     {feed && feed.users && (
        <div className="flex flex-col items-center justify-center gap-4 my-4">
        {/* feed && (
          <div className=" flex justify-center my-10">
            <UserCard user = {feed[0]}/>
          </div>
        ) */}
          {feed.users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
   </>
  );
};

export default Feed;
