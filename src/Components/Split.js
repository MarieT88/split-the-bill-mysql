import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSplits } from '../store';
import UserBills from './UserBills';


function Split() {
  
  const splits = useSelector(state => state.splits);
  
  if (!splits || !Array.isArray(splits)) {
    return (
      <div>
      <UserBills />
      <div>No splits to display.</div>
      </div>
      );
  } else {  
      return (
        <div>
          <UserBills />
          <ul>
            {splits.map(split => (
              <li key={split.id}>
                <div>Split ID: {split.id}</div>
                <div>User ID: {split.userId}</div>
                <div>Bill ID: {split.billId}</div>
              </li>
            ))}
          </ul>
        </div>
      ); 
    }
  }


export default Split;