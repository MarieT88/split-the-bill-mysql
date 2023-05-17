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
        <table>
          <tbody>
          {
            bills.map( bill => {
              return (
                <tr key={ bill.id } className="align-items-center">
                  <td>
                   <Link to={`/bills/${bill.id}`}>{bill.name}</Link>
                   <button className= "btn btn-outline-dark btn-sm" onClick={ ()=> destroy(bill)}>x</button>
                  </td>
                </tr>
              );  
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default BillList;
