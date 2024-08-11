import { useEffect, useRef, useState } from 'react';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { options } from './function/generatePDF';
import { fetch_party_item_history } from '../../api/pdf.api';
import { useParams } from 'react-router-dom';
import "./styles/partyItemHistory.css";


const PartyItemHistoryPDF = () => {

   const { partyID } = useParams();
   const targetRef = useRef();

   const [items, setItems] = useState([]);
   const [name, setName] = useState("");

   const fetchData = async () => {
      try {
         const { data } = await fetch_party_item_history({ partyID });
         console.log(data);

         setItems(data.items);
         setName(data.partyName);
      }
      catch (err) {
         console.log(err)
      }
   }

   useEffect(() => {
      fetchData()
   }, []);

   console.log(items)

   return (
      <div >
         <button onClick={() => generatePDF(targetRef, options("items.pdf"))}>Generate PDF</button>
         <h2>{name}</h2>
         <div className='party-item-history' ref={targetRef}>
            <div className='table-header'>
               <div className='itemName'>Item Name</div>
               <div className='itemQuantity'>Total Quantity</div>
            </div>
            <div className='table-body'>
            {
               items.map((item) => {
                  return <div className='table-row'>

                     <span className='itemName'>{item.itemDetails.itemName}</span>
                     <span className='itemQuantity'>{item.itemDetails.totalQuantity}</span>

                  </div>
               })
            }
            </div>
         </div>
      </div>
   );
}

export default PartyItemHistoryPDF;