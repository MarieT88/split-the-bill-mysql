import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const BillList = () => {
  
  const { bills } = useSelector( state => state );
  
  return (
    <div>
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
