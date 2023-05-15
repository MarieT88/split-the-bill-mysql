import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSplit, fetchUsers, fetchSplits, fetchBills, updateBill } from '../store';
import SplitCalc from './SplitCalc';
import BillList from './BillList';

const BillDetails = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bills, users, splits } = useSelector(state => state);
  const { id } = useParams();
  const bill = bills.find(bill => bill.id === id);
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [calcAmount, setCalcAmount] = useState(0);
  const [numSplits, setNumSplits] = useState(0);
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

  const groupedSplits = splits.reduce((acc, split) => {
    if (split.billId === bill.id) {
      const existing = acc.find((g) => g.billId === bill.id);
      if (existing) {
        existing.userIds.push({
          userId: split.userId,
          amount: split.amount,
        });
      } else {
        acc.push({
          billId: bill.id,
          name: bill.name,
          amount: bill.amount,
          note: bill.note,
          dueDate: bill.dueDate,
          userIds: [{ userId: split.userId, amount: split.amount }],
          isPaid: bill.isPaid,
        });
      }
    }
    return acc;
  }, []);

  const checkBillPaid = (bill) => {
    const totalAmountContributed = bill.userIds.reduce(
      (sum, user) => sum + user.amount,
      0
    );
    return totalAmountContributed === bill.amount;
  };
  
    const handleCalcSplit = (calcAmount, numSplits) => {
    setCalcAmount(parseFloat(calcAmount).toFixed(2));
    setNumSplits(parseInt(numSplits));
  };

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

  if (amount <= 0) {
    // Invalid contribution amount
    alert('Please enter a valid contribution amount.');
    return;
  }

  if (amount > remainingAmount) {
    // User is trying to contribute more than the remaining amount
    alert('The contribution amount exceeds the remaining amount.');
    return;
  }

  const contributionAmount = Math.min(amount, remainingAmount);

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
};

  const availableUsers = users.filter((user) => !contributedUserIds.includes(user.id));


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
        <h2>Split Details</h2>
        <ul>
        {groupedSplits.map((group) => {
          const totalAmountContributed = group.userIds.reduce(
            (sum, user) => sum + user.amount,
            0
          );
          return (
            <li key={group.billId}>
              <h5>{group.name}</h5>
              <div>
                {group.isPaid ? (
                  <span style={{ color: 'green' }}> Paid</span>
                ) : checkBillPaid(group) ? (
                  <span style={{ color: 'green' }}> Paid</span>
                ) : (
                 <span style={{ color: 'red' }}>
                   Unpaid - ${(group.amount - totalAmountContributed).toFixed(2)} remaining
                 </span>
                )}
              </div>
              <h5>Split Between:</h5>
              <ul>
                {group.userIds.map((user) => (
                  <li key={user.userId}>
                    {users.find((u) => u.id === user.userId)?.name} - $
                    {user.amount}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
        </ul>
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
        <h2>Quick Split Calc</h2>
        <SplitCalc onSubmit={handleCalcSplit} />
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
};




export default BillDetails;



/*const BillDetails = () => {

  const { bills } = useSelector(state => state);
  const { id } = useParams();
  const bill = bills.find(bill => bill.id === id);
  
  if(!bill){
    return null;
  }

  return (
    <div>
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
*/
