import React from 'react';
import BillList from './BillList';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserBills from './UserBills';

const BillDetails = () => {

  const { bills } = useSelector(state => state);
  const { id } = useParams();
  const bill = bills.find(bill => bill.id === id);
  
  if(!bill){
    return null;
  }

  

  return (
    <div>
      <UserBills />
      <h2>Bill Details</h2>
      <div>
        <p>Bill: {bill.name}</p>
        <p>Amount: {bill.amount}</p>
        <p>Due Date: {bill.dueDate}</p>
        <p>Note: {bill.note}</p>
      </div>
    </div>
  );
  
};


export default BillDetails;