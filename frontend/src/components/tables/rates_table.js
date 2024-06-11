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
        <div>Invoice Number</div>
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
                  <div className='rate-table-column'>{rate.purchase.invoiceNo.length > 8 ? rate.purchase.invoiceNo.slice(2, rate.purchase.invoiceNo.length) : rate.purchase.invoiceNo}</div>
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
                  // color:"white",
                  // fontWeight:"bold"
                }}>
                {/* <div>
                  <div className='accordian-hidden-box'><div>Bill Number:</div> <div>{rate.purchase.billNo}</div></div>
                  <div className='accordian-hidden-box'>Bill Date: &nbsp;&nbsp;{rate.purchase.billDate}</div>
                  <div className='accordian-hidden-box'>Full Invoice Number: &nbsp;&nbsp;{rate.purchase.invoiceNo}</div>
                  <div className='accordian-hidden-box'>Batch Number: &nbsp;&nbsp;{rate.batchNumber}</div>
                  <div className='accordian-hidden-box'>Quantity: &nbsp;&nbsp;{rate.quantity}</div>
                  <div className='accordian-hidden-box'>Free:&nbsp;&nbsp; {rate.free}</div>
                </div> */}
                <div>
                  <div className='accordian-hidden-box'><div>Bill Number:</div> <div>{rate.purchase.billNo}</div></div>
                  <div className='accordian-hidden-box'><div>Bill Date:</div> <div>{rate.purchase.billDate}</div></div>
                  <div className='accordian-hidden-box'><div>Full Invoice Number:</div> <div>{rate.purchase.invoiceNo}</div></div>
                  <div className='accordian-hidden-box'><div>Batch Number:</div> <div>{rate.batchNumber}</div></div>
                  <div className='accordian-hidden-box'><div>Quantity:</div> <div>{rate.quantity}</div></div>
                  <div className='accordian-hidden-box'><div>Free:</div> <div>{rate.free}</div></div>
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
