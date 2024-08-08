import CreatePaymentNote from "../../components/payment-notes/create";
import FetchPaymentNoteByDate from "../../components/payment-notes/fetch";
import FetchAll from "../../components/payment-notes/fetchAll";
import "../../components/payment-notes/styles/paymentNotes.css";
import "./page.css";
import React from "react";

const PaymentNotes = ({type}) => {
  
  return (
    <div className="payment-note-page">
      {/* <FetchPaymentNoteByDate /> */}
      {type==='create'?<CreatePaymentNote />:<FetchAll />}
      {/* <FetchAll /> */}
    </div>
  );
};

export default PaymentNotes;
