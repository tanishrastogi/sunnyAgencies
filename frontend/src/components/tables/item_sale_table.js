// start date: 01/08/2024
// end date: 

import { Accordion } from '@mui/material';
import React, { useState } from 'react';
import "./styles/item_sale_table.css";

const Item_sale_table = ({ data }) => {




  return (
    <table className='sale-data-table' style={{width:"100vw"}}>
      <thead className='sale-data-headers'>
        <th className='sale-data-table-column'>Party Name</th>
        <th className='sale-data-table-column'>Bill Number</th>
        <th className='sale-data-table-column'>Batch Number</th>
        <th className='sale-data-table-column'>Quantity</th>
        <th className='sale-data-table-column'>Discount</th>
        <th className='sale-data-table-column'>Deal</th>
      </thead>
      <tbody>
      {
        data?.map((item) => {
          return <tr className='sale-data-table-row'>
            <td className='sale-data-table-column'>{item.partyDetails[0].partyName}</td>
            <td className='sale-data-table-column'>{item.billNumber}</td>
            <td className='sale-data-table-column'>{item.items.batchNumber}</td>
            <td className='sale-data-table-column'>{item.items.quantity}</td>
            <td className='sale-data-table-column'>{item.items.discount}</td>
            <td className='sale-data-table-column'>{'9+1'}</td>
            {/* <div>{item.items.deal}</div> */}
          </tr>
        })
      }
      </tbody>
    </table>
  )
}

export default Item_sale_table;