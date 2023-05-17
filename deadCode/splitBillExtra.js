/*
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSplit, fetchUsers, fetchSplits, fetchBills, updateBill } from '../store';
import BillList from './BillList';
import BillDelete from './BillDelete';


const BillDetails = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { bills, users, splits } = useSelector(state => state);
  const { id } = useParams();
  const bill = bills.find(bill => bill.id === id);
  
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [contributedUserIds, setContributedUserIds] = useState([]);
  const [error, setError] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchSplits());
    dispatch(fetchBills());
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    // Retrieve the contributed user IDs from the bill object
    if (bill && bill.contributedUserIds) {
      setContributedUserIds(bill.contributedUserIds);
    }
  }, [bill]);

  if (!bill) {
    return null;
  }

const handleSplit = async () => {
  // Calculate the amount per user
  const amountPerUser = amount / selectedUsers.length;

  // Create the split for each selected user
  const splitPromises = selectedUsers.map(async (user) => {
    const splitData = {
      userId: user.id,
      amount: amountPerUser,
    };

    // Dispatch the createSplit action
    await dispatch(createSplit(splitData));

    // Update the contributing user and remaining amount for the bill
    const updatedBill = {
      ...bill,
      contributedUserIds: [...bill.contributedUserIds, user.id],
      remainingAmount: bill.remainingAmount - amountPerUser,
    };

    // Dispatch the updateBill action
    await dispatch(updateBill(updatedBill));

    return null;
  });

  // Wait for all splits to be created
  await Promise.all(splitPromises);

  // Clear the selected users and amount
  setSelectedUsers([]);
  setAmount(0);
};


  const availableUsers = users.filter((user) => !contributedUserIds.includes(user.id));
//const availableUsers = users.filter(user => !bill.userIds.find(u => u.userId === user.id));
//const availableUsers = users.filter(user => !bill || !bill.userIds || !bill.userIds.includes(user.id));

  return (
    <div>
      <div>
        <div>
          <BillList />
        </div>
        <h2>Bill Details</h2>
        <div>
          <p>Bill: {bill.name}</p>
          <p>Amount: ${bill.amount}</p>
          <p>Due Date: {bill.dueDate}</p>
          {bill.note && <p>Note: {bill.note}</p>}
        </div>
      </div>
      <div>
      <h2>Split the Bill</h2>
        <form onSubmit={handleSplit}>
        <div>
          <label>Select User: </label>
          <select value={userId} onChange={ev => setUserId(ev.target.value)}>
            <option value="">Select User</option>
              {availableUsers.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input value={amount} onChange={ev => setAmount(ev.target.value)} />
        </div>
        <button>Split Bill</button>
      </form>
      </div>
      <div>
        <BillDelete />
      </div>
    </div>
  );
};

export default BillDetails;
*/

/*
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSplit } from '../store';

function Bill({ bill }) {
  const [newSplit, setNewSplit] = useState({ amount: 0, userId: 0 });
  const dispatch = useDispatch();

  const handleAddSplit = () => {
    dispatch(createSplit(bill.id, newSplit));
    setNewSplit({ amount: 0, userId: 0 });
  };

  return (
    <div>
      <h2>{bill.title}</h2>
      <p>Total amount: ${bill.totalAmount}</p>
      <ul>
        {bill.splits.map((split) => (
          <li key={split.id}>
            User {split.userId}: ${split.amount}
          </li>
        ))}
      </ul>
      <h3>Add Split</h3>
      <label>
        User ID:
        <input
          type="number"
          value={newSplit.userId}
          onChange={(event) =>
            setNewSplit({ ...newSplit, userId: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Amount:
        <input
          type="number"
          value={newSplit.amount}
          onChange={(event) =>
            setNewSplit({ ...newSplit, amount: event.target.value })
          }
        />
      </label>
      <br />
      <button onClick={handleAddSplit}>Add Split</button>
    </div>
  );
}

export default Bill; */











/*
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSplit, fetchUsers, fetchSplits, fetchBills } from '../store';
import SplitCalc from './SplitCalc';
import BillList from './BillList';
import BillDelete from './BillDelete';


const BillDetails = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bills, users, splits } = useSelector(state => state);
  const { id } = useParams();
  const bill = bills.find(bill => bill.id === id);
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [contributedUserIds, setContributedUserIds] = useState([]);

  useEffect(() => {
    dispatch(fetchSplits());
    dispatch(fetchBills());
    dispatch(fetchUsers());
  }, []);
  
  useEffect(() => {
    // Retrieve the contributed user IDs from the bill object
    if (bill && bill.contributedUserIds) {
      setContributedUserIds(bill.contributedUserIds);
    }
  }, [bill]);
  
  
  if (!bill) {
    return null;
  }


  const handleSplit = (ev) => {
  ev.preventDefault();

  if (bill.isPaid) {
    // Bill is already paid, do not allow contributions
    window.alert('This bill is already paid. No further contributions are allowed.');
    return;
  }

  // Check if the selected user has already contributed
  if (contributedUserIds.includes(userId)) {
    alert('This user has already made a contribution.');
    return;
  }

  const userContributions = splits.filter(
    (split) => split.billId === bill.id && split.userId === userId
  );

  const totalUserContribution = userContributions.reduce(
    (sum, split) => sum + split.amount,
    0
  );

  const remainingAmount = bill.amount - totalUserContribution;
  console.log(`remaining amount: ${remainingAmount}`);

  if (isNaN(amount) || amount <= 0) {
    // Invalid or negative contribution amount
    alert('Please enter a valid positive contribution amount.');
    return;
  }

  if (amount > remainingAmount) {
    // User is trying to contribute more than the remaining amount
    alert('The contribution amount exceeds the remaining amount.');
    return;
  }

  const contributionAmount = Math.min(amount, remainingAmount);
  console.log(`contributionAmount: ${contributionAmount}`);

  dispatch(
    createSplit({
      billId: bill.id,
      userId,
      amount: contributionAmount,
    })
  );

  setContributedUserIds((prevUserIds) => [...prevUserIds, userId]);
  setUserId('');
  setAmount('');
  navigate(`/bills/${id}`);
};

  const availableUsers = users.filter((user) => !contributedUserIds.includes(user.id));


  return (
    <div>
      <div>
        <BillList />
      </div>
      <div>
      <h2>Split the Bill</h2>
        <form onSubmit={handleSplit}>
        <div>
          <label>Select User: </label>
          <select value={userId} onChange={ev => setUserId(ev.target.value)}>
            <option value="">Select User</option>
              {availableUsers.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input value={amount} onChange={ev => setAmount(ev.target.value)} />
        </div>
        <button>Split Bill</button>
      </form>
      </div>
      <div>
        <BillDelete />
      </div>
    </div>
  );
};


export default BillDetails; */



/*import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSplit } from '../store';
import SplitCalc from './SplitCalc';


const BillSplit = ()=> {

  const { bills, users } = useSelector( state => state );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [ billId, setBillId ] = useState('');
  const [ userId, setUserId ] = useState('');
  const [ amount, setAmount ] = useState(0.0);
  const [calcAmount, setCalcAmount] = useState(0);
  const [numSplits, setNumSplits] = useState(0);
  const [selectedBill, setSelectedBill] = useState(null);
  const [splits, setSplits] = useState([]); 
  
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
    if (currentAmount + parseFloat(amount) >= totalAmount) {
      alert('Bill is paid!');
      return;
    }
    if (currentAmount >= totalAmount) {
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
    navigate('/billsplit');
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
  
  // for drop down menu to calculate remaining balance
  const calculatePaidAmount = (billId) => {
  const paidAmount = splits.reduce((acc, split) => {
    if (split.billId === billId) {
      return acc + parseFloat(split.amount);
    }
    return acc;
  }, 0);
  return paidAmount.toFixed(2);
};
  
   return (
    <div>
      <div>
      <form onSubmit={ create }>
      

<div>
            <label>Select Bill: </label>
            <select value={billId} onChange={handleBillChange}>
              <option value="">Select Bill</option>
              {bills.map((bill) => (
                <option value={bill.id} key={bill.id} disabled={bill.isPaid}>
                  {bill.name} - Remaining: {bill.remainingAmount}
                    <>{'\n'}</>
                    Amount: {bill.amount}, Paid: {bill.paidAmount}
                </option>
              ))}
            </select>
          </div>
          {selectedBill && (
            <div>
              <p>Bill: {selectedBill.name}</p>
              <p>Amount: {selectedBill.amount}</p>
              <p>Due Date: {selectedBill.dueDate}</p>
              {selectedBill.note && <p>Note: {selectedBill.note}</p>}
            </div>
          )}
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
  )};

  
    
  /*const create = async(ev) => {
    ev.preventDefault();
    await dispatch(createSplit({  billId, userId, amount }));
    setAmount('');
  };  
  return (
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
  );
};

export default BillSplit; */



