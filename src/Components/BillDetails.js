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
    // Check if the selected user has already contributed
    if (contributedUserIds.includes(userId)) {
      alert('This user has already made a contribution.');
      return;
    }

    const selectedUser = users.find(user => user.id === userId);
    if (!selectedUser) {
      alert('Please select a valid user.');
      return;
    }

    const contributionAmount = parseFloat(amount);
    if (isNaN(contributionAmount) || contributionAmount <= 0) {
      alert('Please enter a valid positive contribution amount.');
      return;
    }

    // Calculate the remaining amount for the bill
  const totalContributions = splits
    .filter(split => split.billId === bill.id)
    .reduce((sum, split) => sum + split.amount, 0);
  const remainingAmount = bill.amount - totalContributions;

  if (contributionAmount > remainingAmount) {
    alert('The contribution amount exceeds the remaining amount.');
    return;
  }

   // Create the split and update the bill
    await dispatch(createSplit({ billId: bill.id, userId, amount: contributionAmount }));

  // Check if the remaining amount is fully covered
  if (contributionAmount === remainingAmount) {
    await dispatch(updateBill({ ...bill, contributedUserIds: [...contributedUserIds, userId], isPaid: true, paidAmount: bill.amount }));
  } else {
    await dispatch(updateBill({ ...bill, contributedUserIds: [...contributedUserIds, userId] }));
  }

    // Clear the selected user and amount
    setUserId('');
    setAmount('');

    navigate(`/splits`);
  };

  const availableUsers = users.filter(user => !contributedUserIds.includes(user.id));

  return (
    <div>
      <div>
        <BillList />
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
              {
                availableUsers.map(user => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))
              }
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







