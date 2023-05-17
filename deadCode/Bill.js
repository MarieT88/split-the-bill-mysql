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

export default Bill;