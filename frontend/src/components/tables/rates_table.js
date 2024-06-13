import React, { useEffect, useState } from 'react'
import { fetchRatesByID } from '../../api/rates.api';
import Accordion from '@mui/material/Accordion';

import "./rate_table.css";
import { AccordionDetails, AccordionSummary } from '@mui/material';

const Rates_table = ({ productID }) => {

  const [rates, setRates] = useState([]);
  const [name, setName] = useState('');


  useEffect(() => {
    fetchItemRates()
  }, []);




  const fetchItemRates = async () => {
    try {
      const res = await fetchRatesByID({ productID });
      console.log(res.data);
      setRates(res.data.rates);
      setName(res.data.item.itemName)
    }
    catch (err) {
      console.log(err)
    }
  }

  // console.log(rates)

  return (
    <div className='rates_table'>
      <h3>Purchase Rates of {name}</h3>

      <div className='rate-table-header'>
        <div>Party Name</div>
        <div>Purchase Number</div>
        <div>MRP</div>
        <div>Discount</div>
        <div>Deal</div>
        <div>Purchase Rate</div>
      </div>
      <div className='rate-table-body'>
        {
          rates.map((rate, index) => {
            console.log(rate.partyID.partyName.length, rate.partyID.partyName)
            return <Accordion>
              <AccordionSummary className={index % 2 === 0 ? 'accordionIsEven' : 'accordionIsOdd'}
                style={index % 2 !== 0 ? {} : {
                  background: "#a5f77f"
                }}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <div className='rate-table-row'>
                  <div className='rate-table-column'>{rate.partyID.partyName.length > 7 ? rate.partyID.partyName.slice(0, 9) : rate.partyID.partyName}</div>
                  <div className='rate-table-column'>{rate.purchase.billNo}</div>
                  <div className='rate-table-column'>{rate.mrp}</div>
                  <div className='rate-table-column'>{rate.discount}</div>
                  <div className='rate-table-column'>{0}</div>
                  <div className='rate-table-column'>{rate.purchaseRate}</div>
                </div>
              </AccordionSummary>
              <AccordionDetails style={index % 2 !== 0 ? {
                background: "#d1ffbb",
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                padding: "10px 50px",
                boxSizing: "border-box"
              } :
                {
                  background: "#d1ffbb",
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  padding: "10px 50px",
                  boxSizing: "border-box"
                }}>
                <div className='accordian-detail-box'>
                  {/* <div className='accordian-hidden-box'><div style={{fontWeight:"bold"}}>Invoice Number:</div> <div>{rate.purchase.invoiceNo}</div></div>
                  <div className='accordian-hidden-box'><div style={{fontWeight:"bold"}}>Bill Date:</div> <div>{rate.purchase.billDate}</div></div>
                  <div className='accordian-hidden-box'><div style={{fontWeight:"bold"}}>Batch Number:</div> <div>{rate.batchNumber}</div></div>
                  <div className='accordian-hidden-box'><div style={{fontWeight:"bold"}}>Quantity:</div> <div>{rate.quantity}</div></div>
                  <div className='accordian-hidden-box'><div style={{fontWeight:"bold"}}>Free:</div> <div>{rate.free}</div></div> */}

                  <div>
                    <div>Invoice Number:</div>
                    <div>Bill Date: </div>
                    <div>Batch Number: </div>
                    <div>Quantity: </div>
                    <div>Free: </div>
                  </div>
                  <div>
                    <div>{rate.purchase.invoiceNo}</div>
                    <div>{rate.purchase.billDate}</div>
                    <div>{rate.batchNumber}</div>
                    <div>{rate.quantity}</div>
                    <div>{rate.free}</div>
                  </div>

                </div>
              </AccordionDetails>
            </Accordion>
          })
        }
      </div>

    </div>
  )
}

export default Rates_table
