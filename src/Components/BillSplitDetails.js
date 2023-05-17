import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSplits, fetchUsers, fetchBills } from '../store';
import { useParams } from 'react-router-dom';


const BillSplitDetails = () => {
  
  const dispatch = useDispatch();
  const { bills, users, splits } = useSelector(state => state);
  const { id } = useParams();
  const bill = bills.find(bill => bill.id === id);
  
  
  useEffect(() => {
    dispatch(fetchSplits());
    dispatch(fetchBills());
    dispatch(fetchUsers());
  }, []);
  
  
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
  console.log(`totalAmountContributed: ${totalAmountContributed}`);
    return totalAmountContributed === bill.amount;
  };
  
  return (
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
  );
  
};

export default BillSplitDetails;