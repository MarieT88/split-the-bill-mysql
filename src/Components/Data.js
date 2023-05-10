import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBills, fetchEvents, fetchUsers } from '../store';


const Data = ()=> {
  
  const { bills, events, auth, users } = useSelector(state => state);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
		dispatch(fetchBills());
		dispatch(fetchEvents());
		dispatch(fetchUsers());
	}, []);
	
	//console.log(events);
	//console.log(bills);
	//console.log(auth);
	//console.log(users);
	
  return (
    <div>
      <div>
        <h5>Bills</h5>
          {
            bills.map( bill => {
              return (
                <ul key={ bill.id }>
                  <li>
                    name: { bill.name } |  
                    | amount: { bill.amount} |  
                    | due date: { bill.dueDate } | 
                    | note: { bill.note }
                  </li>
                </ul>
              );  
            })
          }
      </div>
      <div>
        <h5>Events</h5>
        {
          events.map( event => {
            return (
              <ul key={ event.id }>
               <li>
                  name: { event.name } | 
                  | date: { event.date } | 
                  | note: { event.note }
                </li>
              </ul>
            );  
          })
        }
      </div>
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
      </div>
    </div>
  );
};


export default Data;