import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Routes, Route } from 'react-router-dom';
import BillCreate from './BillCreate';


const UserBills = () => {
    
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <h2> {auth.username}'s Bills</h2>
      <div>
        <nav>
          <Link to="/newbill">New Bill</Link>
          <Link to="/mybills">My Bills</Link>
        </nav>
      </div>
    </div>
  );
  
};


export default UserBills;