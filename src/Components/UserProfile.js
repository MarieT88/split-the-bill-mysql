import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UserUpdate from './UserUpdate';
import { FaUser, FaEnvelope } from 'react-icons/fa';


const UserProfile = () => {
  
  const { auth } = useSelector((state) => state);

  return (
    <div className='columns'>
      <div>
        <h2> {auth.username}'s Profile</h2>
          <h5> 
            <FaUser /> {auth.name} 
          </h5>
        <h5> 
          <FaEnvelope /> {auth.email} 
        </h5>
      </div>
      <div>
        <UserUpdate />
      </div>
    </div>
  );
};


export default UserProfile;

