import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const UserBills = () => {
    
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <h1> {auth.username}'s Bills</h1>
    </div>
  );
  
};


export default UserBills;