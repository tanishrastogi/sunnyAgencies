import React from 'react';
import "./purchase-rate-cal.css";

const PurchaseRateCalculator = () => {
  return (
    <div className='purchase-rate-calculator-box'>
      <p>Rate Calculator!</p>
      <div className='input-box'>
        <input placeholder='Enter mrp ...'></input>
        <input placeholder='Enter discount ...'></input>
        <input placeholder='Enter deal ...'></input>
      </div>
      <div className='result-box'>
        <button>Calculate</button>
        <div></div>
      </div>
    </div>
  )
}

export default PurchaseRateCalculator