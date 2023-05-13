import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserBills from './UserBills';


const BillList = () => {
  
  const { bills } = useSelector( state => state );
  
  return (
    <div>
      <UserBills />
      <div>
        <h2>Bills</h2>
          {
            bills.map( bill => {
              return (
                <ul key={ bill.id }>
                  <li>
                   <Link to={`/bills/${bill.id}`}>{bill.name}</Link>
                  </li>
                </ul>
              );  
            })
          }
      </div>
    </div>
  );
};

export default BillList;
