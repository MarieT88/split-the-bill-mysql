import React, { useState } from 'react';
import SplitCalc from './SplitCalc';

const QuickSplitCalc = () => {
  const [calcAmount, setCalcAmount] = useState(0);
  const [numSplits, setNumSplits] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);

  const handleCalcSplit = (calcAmount, numSplits, tipPercentage) => {
    const billAmount = parseFloat(calcAmount);
    const tipAmount = billAmount * (parseFloat(tipPercentage) / 100);
    const totalAmount = billAmount + tipAmount;

    // Perform the split calculation
    const amountPerUser = totalAmount / numSplits;

    if (!isNaN(amountPerUser) && numSplits !== 0) {
      setCalcAmount(totalAmount.toFixed(2));
      setNumSplits(parseInt(numSplits));
    } else {
      setCalcAmount(0);
      setNumSplits(0);
    }
  };

  return (
    <div>
      <h2>Quick Split Calc</h2>
      <SplitCalc onSubmit={handleCalcSplit} />
      {numSplits !== 0 ? (
        <p>
          ${calcAmount} split into {numSplits} = ${(calcAmount / numSplits).toFixed(2)} each.
        </p>
      ) : (
        <p>$0.00</p>
      )}
    </div>
  );
};

export default QuickSplitCalc;