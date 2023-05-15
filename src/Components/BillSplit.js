import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSplit } from '../store';
import SplitCalc from './SplitCalc';


const BillSplit = ()=> {

  const { bills, users } = useSelector( state => state );

  const dispatch = useDispatch();
  
  const [ billId, setBillId ] = useState('');
  const [ userId, setUserId ] = useState('');
  const [ amount, setAmount ] = useState(0.0);
  const [calcAmount, setCalcAmount] = useState(0);
  const [numSplits, setNumSplits] = useState(0);
  const [selectedBill, setSelectedBill] = useState(null);
  const [splits, setSplits] = useState([]); 
  
  
  /*const create = async(ev) => {
    ev.preventDefault();
    await dispatch(createSplit({  billId, userId, amount }));
    setAmount('');
  };*/  
  
    const create = async(ev) => {
    ev.preventDefault();
    
    //Check if bill is already paid
    const totalAmount = selectedBill.amount;
    const currentAmount = splits.reduce((acc, split) => {
      if (split.billId === billId) {
        return acc + split.amount;
      }
      return acc;
    }, 0);
    if (currentAmount + parseFloat(amount) > totalAmount) {
      alert('Bill is paid!');
      return;
    }
    if (currentAmount > totalAmount) {
      alert('Bill is already paid!');
      return;
    }
    
    // Check if the user is already included in the splits for the selected bill
    const existingSplit = splits.find(split => split.billId === billId && split.userId === userId);
    if (existingSplit) {
      alert('User is already on this split!');
      return;
    }
    
    // Create the new split
    const newSplit = { billId, userId, amount };
    await dispatch(createSplit(newSplit));
    
    // Update the splits in the state
    setSplits([...splits, newSplit]);
    
    // Clear the form inputs
    setUserId('');
    setAmount('');
  };  
  
  
  const handleSplit = (calcAmount, numSplits) => {
    setCalcAmount(parseFloat(calcAmount).toFixed(2));
    setNumSplits(parseInt(numSplits));
  };
  
  const handleBillChange = (ev) => {
    const id = ev.target.value;
    const bill = bills.find(bill => bill.id === id);
    setSelectedBill(bill);
    setBillId(id);
  };
  
   return (
    <div>
      <div>
      <form onSubmit={ create }>
        <div>
          <label>Select Bill: </label>
            <select value= { billId } onChange={ handleBillChange } >
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
        { selectedBill &&
          <div>
            <p>Bill: { selectedBill.name }</p>
            <p>Amount: { selectedBill.amount }</p>
            <p>Due Date: { selectedBill.dueDate }</p>
            {selectedBill.note && <p>Note: { selectedBill.note }</p>}
          </div>
        }
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
    <div>
      <SplitCalc onSubmit={handleSplit} />
      {numSplits !== 0 ?
        <p>
          ${calcAmount} split into {numSplits} = ${(calcAmount / numSplits).toFixed(2)} each.
        </p>
        :
        <p>$0.00</p>
      }
    </div>
    </div>
  );
  
  /*return (
    <div>
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
    <div>
      <SplitCalc onSubmit={handleSplit} />
   {numSplits !== 0 ?
  <p>
    Split ${calcAmount} into {numSplits} splits of ${(calcAmount / numSplits).toFixed(2)} each.
  </p>
  :
  <p>$0.00</p>
}
    </div>
    </div>
  );*/
};

export default BillSplit;



