import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UserUpdate from './UserUpdate';


const UserProfile = () => {
  
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <h2> {auth.username}'s Profile</h2>
      <h5> Name: {auth.name} </h5>
      <h5> Email: {auth.email} </h5>
      <br/>
      <UserUpdate />
    </div>
  );
};


export default UserProfile;

