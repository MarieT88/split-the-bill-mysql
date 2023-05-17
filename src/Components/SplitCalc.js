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
        <input
          type="number"
          id="amount"
          placeholder="Amount"
          name="Amount" 
          value={calcAmount}
          onChange={(event) => setCalcAmount(event.target.value)}
        />
        <input
          type="number"
          id="numSplits"
          placeholder="Number of Splits"
          name="Number of sPLITS" 
          value={numSplits}
          onChange={(event) => setNumSplits(event.target.value)}
        />
        <input
          type="number"
          id="tipPercentage"
          placeholder="Tip Percentage"
          name="Tip Percentage" 
          value={tipPercentage}
          onChange={(event) => setTipPercentage(event.target.value)}
        />
      <button type="submit">Split</button>
    </form>
  );
}

export default SplitCalc;