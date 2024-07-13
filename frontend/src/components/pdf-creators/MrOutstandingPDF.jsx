import React, { useEffect, useState } from "react";
import "./styles/mrOutstanding.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mrOutstandingPDF } from "../../api/pdf.api";

const MrOutstandingPDF = () => {
  const [boxes, setBoxes] = useState(() => {
    // Load initial state from localStorage or default to one empty box
    const savedBoxes = localStorage.getItem("boxes");
    return savedBoxes
      ? JSON.parse(savedBoxes)
      : [{ partyName: "", billNumber: "", billDate: "", billAmount: "" }];
  });

  const [mrDetails, setMrDetails] = useState({
    mrName: "",
    mrEmail: "",
    customMessage:""
  });

  const handleMrDetailsChange = (e) => {
    const { name, value } = e.target;
    setMrDetails(() => {
      return {
        ...mrDetails,
        [name]: value,
      };
    });
  };

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

  const deleteBox = (index) => {
    // const newBoxes = boxes.filter((_, i)=>box[i]!==box[index]);

    const newBoxes = boxes.filter((value, i) => {
      return i !== index ? boxes[i] : "";
    });
    setBoxes(newBoxes);
  };

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



  const generatePDF = async()=>{
    try{
      const response = await mrOutstandingPDF({mrDetails, boxes});
      if(response){
        console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'generated.pdf');
        document.body.appendChild(link);
        // Programmatically click the link to trigger the download
        link.download  = `${mrDetails.mrName}-${Date.now()}.pdf`
        // link.download = "generated.pdf"
        window.open(link.href, '_blank');
        link.click();
        link.remove();
      }
    }
    catch(err){
      console.log(err);
    }
  }



  return (
    <div className="mr-outstanding">
      <h1>Pdf Creation form</h1>
      <div className="mr-outstanding-pdf">
        <div className="mr-details">
          <h3>Enter Bill details</h3>
          <input
            name="mrName"
            value={mrDetails.mrName}
            onChange={handleMrDetailsChange}
            placeholder="Enter the MR name"
          ></input>
          <input
            type="email"
            name="mrEmail"
            value={mrDetails.mrEmail}
            onChange={handleMrDetailsChange}
            placeholder="Enter MR email"
          ></input>
        </div>
        <textarea name="customMessage" value={mrDetails.customMessage} onChange={handleMrDetailsChange} placeholder="Custom Message"></textarea>
        {boxes?.map((box, index) => {
          return (
            <div className="mr-outstanding-pdf-container">
              <div>
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
              </div>
              <div>
                {index === boxes.length - 1 ? (
                  <button onClick={addBox}>+</button>
                ) : (
                  <IconButton
                    onClick={() => {
                      deleteBox(index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            </div>
          );
        })}
        <div className="mr-buttons-container">
          <button className="send-email-button">Send Email</button>
          <button className="create-pdf-button" onClick={generatePDF}>
            Create Pdf
            <FileDownloadIcon sx={{marginTop:"0px", transform: "scale(0.7)", color: "green" }}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MrOutstandingPDF;
