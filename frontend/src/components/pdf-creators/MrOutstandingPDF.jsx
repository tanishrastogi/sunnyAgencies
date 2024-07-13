import React, { useEffect, useState } from "react";
import "./styles/mrOutstanding.css";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const MrOutstandingPDF = () => {
  const [boxes, setBoxes] = useState(() => {
    // Load initial state from localStorage or default to one empty box
    const savedBoxes = localStorage.getItem("boxes");
    return savedBoxes
      ? JSON.parse(savedBoxes)
      : [{ partyName: "", billNumber: "", billDate: "", billAmount: "" }];
  });

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newBoxes = [...boxes];
    newBoxes[index][name] = value;
    setBoxes(newBoxes);
  };

  useEffect(() => {
    const savedBoxes = localStorage.getItem("boxes");
    if (savedBoxes) {
      setBoxes(JSON.parse(savedBoxes));
    }
  }, []);

  // Save boxes to localStorage whenever boxes state changes
  useEffect(() => {
    localStorage.setItem("boxes", JSON.stringify(boxes));
  }, [boxes]);

  const addBox = () => {
    const lastBox = boxes[boxes.length - 1];
    if (
      lastBox.partyName &&
      lastBox.billNumber &&
      lastBox.billDate &&
      lastBox.billAmount
    ) {
      setBoxes([
        ...boxes,
        {
          partyName: "",
          billNumber: "",
          billDate: "",
          billAmount: "",
        },
      ]);
    } else {
      alert("fill all the details first");
    }
  };

  return (
    <div className="mr-outstanding-pdf">
      {boxes?.map((box, index) => {
        return (
          <div className="mr-outstanding-pdf-container">
            <input
              onChange={(e) => handleInputChange(index, e)}
              name="partyName"
              value={box.partyName}
              placeholder="Enter Party Name"
            ></input>
            <input
              onChange={(e) => handleInputChange(index, e)}
              name="billNumber"
              value={box.billNumber}
              placeholder="Enter Bill Number"
            ></input>
            <input
              onChange={(e) => handleInputChange(index, e)}
              name="billDate"
              value={box.billDate}
              placeholder="Enter Bill Date"
            ></input>
            <input
              onChange={(e) => handleInputChange(index, e)}
              name="billAmount"
              value={box.billAmount}
              placeholder="Enter Bill Amount"
            ></input>
            {
              index===boxes.length-1?<button onClick={addBox}>+</button>:<IconButton onClick=""><DeleteIcon /></IconButton>
            }
          </div>
        );
      })}
    </div>
  );
};

export default MrOutstandingPDF;
