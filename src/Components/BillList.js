import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBills, fetchUsers } from '../store';
import UserBills from './UserBills';

const BillList = ()=> {
  
  const { bills, auth, users } = useSelector(state => state);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
		dispatch(fetchBills());
		dispatch(fetchUsers());
	}, []);
	
	//const user = users.find(user => user.id === auth.id);

	//console.log(bills);
	//console.log(auth);
	//console.log(users);
	
  return (
    <div>
      <UserBills />
      <div>
        <h5>Bills</h5>
          {
            bills.filter(bill => bill.userId === auth.id).map( bill => {
              return (
                <ul key={ bill.id }>
                  <li>
                    bill: { bill.name } |  
                    | amount: { bill.amount} |  
                    | due date: { bill.dueDate } | 
                    | note: { bill.note }
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

/* 
      <div>
        <h5>Users</h5>
          {
            users.map( user => {
              return (
                <ul key={ user.id }>
                  <li>
                    username: { user.username } |  
                    | name: { user.name} |  
                    | email: { user.email }
                  </li>
                </ul>
              );  
            })
          }
      </div> */