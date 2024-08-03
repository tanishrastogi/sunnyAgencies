import React, { useEffect, useState } from 'react';
import "./purchase-rate-cal.css";

const PurchaseRateCalculator = ({ product }) => {

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(()=>{
    setWidth(window.innerWidth-105); 
    console.log(window.innerWidth)
  }, [])

  const [dataValue, setDataValue] = useState({
    mrp: '',
    discount: "",
    deal: "",
    rate:"",
    gst: product?.item?.gst * 2
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

  const restrictAlphabets = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (!(charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode !== 8) {
      // console.log(e.key)
      e.preventDefault();
    }
  }

  const handleRateChange = () => {

    let Mrp = 0;
    let Disc = 0;
    let Rate = 0;
    let Deal = '1+0';
    if (dataValue.mrp.length !== 0) {
      Mrp = dataValue.mrp
    }
    if (dataValue.discount.length !== 0) {
      Disc = dataValue.discount
    }
    if (dataValue.deal.length !== 0) {
      Deal = dataValue.deal
    }

    let new_rate = 0;

    if (dataValue.rate.length !== 0) {
      new_rate = dataValue.rate
    }
    
    else{
      new_rate = Mrp - (Mrp * 0.285);
    }
    // console.log(Mrp, Disc, Deal);

    new_rate = new_rate - (new_rate * Disc / 100);

    let deal = Deal.split("+");
    // console.log(deal)

    if (deal.length !== 2) {
      alert("invalid deal entered");
      return
    }



    let dealDiscount = (Number(deal[1]) / (Number(deal[0]) + Number(deal[1])));

    console.log(dealDiscount)
    console.log(deal[1], deal[0])



    new_rate = new_rate - (new_rate * dealDiscount);

    new_rate = new_rate + (new_rate * dataValue.gst / 100)

    setRate(new_rate);

  }

  return (
    <div className='purchase-rate-calculator-box' style={{width:`${width}px`}}>
      <p>Rate Calculator</p>
      <div className='input-box'>
        <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"10px", width:"100%"}}>
          <input style={{width:"100%"}}  name='mrp' onKeyDown={restrictAlphabets} onChange={handleChange} value={dataValue.mrp} placeholder='Enter mrp ...'></input>
          <input  name='rate' onKeyDown={restrictAlphabets} onChange={handleChange} value={dataValue.rate} placeholder='Enter rate ...'></input>
        </div>
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