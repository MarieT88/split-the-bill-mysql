import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';


const UserBills = () => {
    
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <h2> {auth.username}'s Bills</h2>
      <div>
        <nav>
          <Link to="/newbill">New Bill</Link>
          <Link to="/mybills">My Bills</Link>
          <Link to="/splits">Splits List</Link>
          <Link to="/billsplit">Split Bills</Link>
        </nav>
      </div>
    </div>
  );
  
};


export default UserBills;