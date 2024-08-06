import { createNote } from "../../api/paymentNotes.api";
import { searchAccount } from "../../api/search.api";
import Display_Accounts, {
  Account
} from "../display/Display_Accounts";
import "./styles/paymentNotes.css";
import React, { useEffect, useState } from "react";

const CreatePaymentNote = () => {
  const [accounts, setAccounts] = useState([]);
  // const [accountID, setAccountID] = useState("");

  const [details, setDetails] = useState({
    account: "",
    billDate: "",
    billNumber: "",
    narration: "",
    partyID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target)
    setDetails(() => {
      return {
        ...details,
        [name]: value,
      };
    });
  };

  const fetchAccounts = async () => {
    try {
      if (details.account?.length !== 0) {
        const response = await searchAccount({ searchWord: details.account });
        // console.log(response.data);
        if (response.data) {
          setAccounts(response.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccountClick = () => {
    setDetails((prevState) => {
      return {
        ...prevState,
        account:Account.partyName,
        partyID:Account._id
      };
    });
  };


  const handleSubmit = async()=>{
    try{
      console.log(details);
      const response = await createNote(details);
      console.log(response)
      if(response){
        alert("Note created successfully!");
      }
    } 
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, [details.account]);

  return (
    <div className="payment-note-creator">
      <div className="party-names">
        <input
          style={{
            margin: "10px auto",
          }}
          name="account"
          onChange={handleChange}
          value={details.account}
          placeholder="Search Accounts"
        ></input>
        {details.account?.length !== 0 ? (
          <div onClick={handleAccountClick}>
            <Display_Accounts accounts={accounts} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="bill_details">
        <input
          placeholder="Enter Bill Number"
          name="billNumber"
          onChange={handleChange}
          value={details.billNumber}
        ></input>
        <input
          placeholder="Enter Bill Date"
          name="billDate"
          onChange={handleChange}
          value={details.billDate}
        ></input>
      </div>
      <input
        className="narration-input"
        placeholder="Enter Narration"
        name="narration"
        onChange={handleChange}
        value={details.narration}
      ></input>
      <div className="payment-note-button-container">
        <button onClick={handleSubmit}>Submit Note</button>
      </div>
    </div>
  );
};

export default CreatePaymentNote;
