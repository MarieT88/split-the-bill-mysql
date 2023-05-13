import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSplit } from '../store';
import UserBills from './UserBills';
import { useNavigate, useParams } from 'react-router-dom';


const BillSplit = ()=> {

  const { bills, users, splits } = useSelector( state => state );

  const dispatch = useDispatch();
  
  const [ billId, setBillId ] = useState('');
  const [ userId, setUserId ] = useState('');
  const [ amount, setAmount ] = useState(0.0);
  
  const create = async(ev) => {
    ev.preventDefault();
    await dispatch(createSplit({  billId, userId, amount }));
    setAmount('');
  };  
    
  
  return (
    <div>
      <UserBills />
      <hr/>
      <div>
      <form onSubmit={ create }>
      <div>
          <label>Select Bill: </label>
            <select value= { billId } onChange={ ev => setBillId(ev.target.value)}>
              <option value=''>Select Bill</option>       
                { 
                  bills.map( bill => {
                    return (
                      <option value={ bill.id } key={bill.id}>{bill.name}</option>
                    );
                  })
                }
            </select>
        </div>
        <div>
          <label>Select User: </label>
            <select value= { userId } onChange={ ev => setUserId(ev.target.value)}>
              <option value=''>Select User</option>       
                { 
                  users.map( user => {
                    return (
                      <option value={ user.id } key={user.id}>{user.name}</option>
                    );
                  })
                }
            </select>
        </div>
        <div>
          <label>Amount:</label>
          <input value={ amount } onChange={ ev => setAmount(ev.target.value)} />
        </div> 
      <button>Split Bill</button>
    </form> 
    </div>  
    </div>
  );
};

export default BillSplit;



