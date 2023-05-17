import React, { useState } from 'react';

function SplitCalc({ onSubmit }) {
    
  const [calcAmount, setCalcAmount] = useState('');
  const [numSplits, setNumSplits] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(calcAmount, numSplits, tipPercentage);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={calcAmount}
          onChange={(event) => setCalcAmount(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="numSplits">Number of Splits:</label>
        <input
          type="number"
          id="numSplits"
          value={numSplits}
          onChange={(event) => setNumSplits(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tipPercentage">Tip Percentage:</label>
        <input
          type="number"
          id="tipPercentage"
          value={tipPercentage}
          onChange={(event) => setTipPercentage(event.target.value)}
        />
      </div>
      <button type="submit">Split</button>
    </form>
  );
}

export default SplitCalc;