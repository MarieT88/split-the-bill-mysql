import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { createSplit, fetchUsers, fetchSplits, fetchBills, updateBill } from '../store';
//import QuickSplitCalc from './QuickSplitCalc';
import BillList from './BillList';
import BillSplitDetails from './BillSplitDetails';


const BillDetails = () => {


  const { bills } = useSelector(state => state);
  const { id } = useParams();
  const bill = bills.find(bill => bill.id === id);
  
  if(!bill){
    return null;
  }

  return (
    <div className='columns' >
      <div>
        <BillList />
      </div>
      <div>
        <h2>Bill Details</h2>
        <div>
          <p>Bill: {bill.name}</p>
          <p>Amount: {bill.amount}</p>
          <p>Due Date: {bill.dueDate}</p>
          <p>Note: {bill.note}</p>
        </div>
      </div>
      <div>
        <BillSplitDetails />
      </div>
    </div>
  );
  
};

export default BillDetails;