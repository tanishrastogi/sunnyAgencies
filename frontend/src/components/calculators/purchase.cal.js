import React, { useState } from 'react';
import "./purchase-rate-cal.css";

const PurchaseRateCalculator = ({product}) => {

  const [dataValue , setDataValue] = useState({
    mrp:'',
    discount:"",
    deal:"",
    gst:product?.item?.gst?product?.item?.gst:"0"
  });

  const [rate, setRate] = useState(0)


  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(3/100);
    setDataValue(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const restrictAlphabets = (e)=>{
    const charCode = e.which ? e.which : e.keyCode;
    if(!(charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode !== 8){
      // console.log(e.key)
      e.preventDefault();
    }
  }

  const handleRateChange = ()=>{
    
    let Mrp = 0;
    let Disc = 0;
    let Deal = '0+1';
    if(dataValue.mrp.length!==0){
      Mrp=dataValue.mrp
    }
    if(dataValue.discount.length!==0){
      Disc=dataValue.discount
    }
    if(dataValue.deal.length!==0){
      Deal = dataValue.deal
    }
    
    // console.log(Mrp, Disc, Deal);

    let new_rate = Mrp-(Mrp*0.285);
    new_rate = new_rate-(new_rate*Disc/100);

    let deal = Deal.split("+");
    // console.log(deal)

    if(deal.length!==2){
      return Error("Invalid deal entered");
    }

    let dealDiscount = (Number(deal[1])/(Number(deal[0])+Number(deal[1])));

    console.log(dealDiscount)
    console.log(deal[1], deal[0])
    
    new_rate = new_rate-(new_rate*dealDiscount);
    
    new_rate = new_rate + (new_rate*dataValue.gst/100)

    setRate(new_rate);

  }

  return (
    <div className='purchase-rate-calculator-box'>
      <p>Rate Calculator!</p>
      <div className='input-box'>
        <input name='mrp' onKeyDown={restrictAlphabets} onChange={handleChange} value={dataValue.mrp} placeholder='Enter mrp ...'></input>
        <input name='discount' onChange={handleChange} onKeyDown={restrictAlphabets} value={dataValue.discount} placeholder='Enter discount ...'></input>
        <input name='deal' onChange={handleChange} value={dataValue.deal} onKeyDown={restrictAlphabets} placeholder='Enter deal ...'></input>
        <input name='gst' onChange={handleChange} value={dataValue.gst} onKeyDown={restrictAlphabets} placeholder={`Enter GST ...`}></input>
      </div>
      <div className='result-box'>
        <button onClick={handleRateChange}>Calculate</button>
        <input placeholder='Value ...' disabled value={rate}></input>
      </div>
    </div>
  )
}

export default PurchaseRateCalculator