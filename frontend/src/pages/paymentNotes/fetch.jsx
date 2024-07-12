import React, { useState } from "react";
import "./paymentNotes.css";
import { fetchNoteByDate } from "../../api/paymentNotes.api";

const FetchPaymentNoteByDate = () => {
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await fetchNoteByDate({ date });
      console.log(response);
      setNotes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(notes);

  const renderNotes = () => {
    console.log(notes);
    return;
  };

  return (
    <div className="payment-note-by-date">
      <input
        type="date"
        name="date"
        value={date}
        onChange={(e) => {
          console.log(date);
          setDate(e.target.value);
          handleFetch()
        }}
        placeholder="Enter Date"
        required
      ></input>
      <div>
        {notes?.length !== 0 ? (
          <div className="payment-note-container">
            <div className="payment-note-container-box">
              <div style={{fontWeight:"bold", margin:"10px", width:"250px"}}>Party Name</div>
              <div style={{fontWeight:"bold", margin:"10px"}}>Bill Number</div>
              <div style={{fontWeight:"bold", margin:"10px"}}>Bill Date</div>
              <div style={{fontWeight:"bold", margin:"10px", width:"250px"}}>Narration</div>
            </div>
            {notes?.map((note) => {
              return (
                <div className="payment-note-container-box">
                  <div style={{width:"250px"}}>{note.party.partyName}</div>
                  <div>{note.billNumber}</div>
                  <div> {note.billDate}</div>
                  <div style={{width:"250px"}}>{note.narration}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>No Notes Fetched</div>
        )}
      </div>
      <button onClick={handleFetch}>Submit</button>
    </div>
  );
};

export default FetchPaymentNoteByDate;
