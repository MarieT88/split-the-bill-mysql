import React, { useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { deleteBill } from '../store';

const BillList = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bills } = useSelector( state => state );

  const destroy = (bill) => {
    dispatch(deleteBill(bill));
    navigate('/mybills');
  };

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
                   <button onClick={ ()=> destroy(bill)}>x</button>
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
