import "./paymentNotes.css"
import React, { useState } from 'react'

const PaymentNotes = () => {

  const [accounts, setAccounts] = useState([]);

  const handleChange = ()=>{
    try{

    }
    catch(err){
      console.log(err);
    }
  }

  const searchAccount = ()=>{

  } 

  return (
    <div>
      <div className="payment-note-creator">
        <div className="party-names">
          <input name="party" onChange={searchAccount}></input>
        </div>
        <input name="billNumber"></input>
        <input name="billDate"></input>
        <input name="narration"></input>
      </div>
    </div>
  )
}

export default PaymentNotes