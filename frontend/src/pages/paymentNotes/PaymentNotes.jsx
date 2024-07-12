import CreatePaymentNote from "./create";
import FetchPaymentNoteByDate from "./fetch";
import "./paymentNotes.css";
import "./page.css";
import React from "react";

const PaymentNotes = () => {
  
  return (
    <div className="payment-note-page">
      <FetchPaymentNoteByDate />
      <CreatePaymentNote />
    </div>
  );
};

export default PaymentNotes;
