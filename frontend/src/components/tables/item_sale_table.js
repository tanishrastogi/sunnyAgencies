// start date: 01/08/2024
// end date: 

import { Accordion, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "./styles/item_sale_table.css";

const Item_sale_table = ({ data }) => {
  
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window.innerWidth]);
  
  

  return (
    <div className='item-sale-table' style={{width:`${width}px`}} >
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 30px 20px 20px"}}>
      <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Item Sale Data</span>
      <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Total Bills: {data['totalCount'][0]['count']}</span>
      </div>
      <table className='sale-data-table' >
        <thead className='sale-data-headers'>
          <th className='sale-data-table-column sale-data-table-column-partyName'>Party Name</th>
          <th className='sale-data-table-column'>Bill Number</th>
          <th className='sale-data-table-column'>Bill Date</th>
          <th className='sale-data-table-column'>Batch Number</th>
          <th className='sale-data-table-column'>Quantity</th>
          <th className='sale-data-table-column'>Discount</th>
          <th className='sale-data-table-column'>Deal</th>
        </thead>
        <tbody>
          {
            data.data?.map((item) => {
              
              const date = new Date(item.billDate)
              const day = date.getDate();
              const month = date.getMonth()+1;
              const year = date.getFullYear();

              return <tr className='sale-data-table-row'>
                <td className='sale-data-table-column'>{item.partyDetails[0].partyName}</td>
                <td className='sale-data-table-column'>{item.billNumber}</td>
                <td className='sale-data-table-column'>{`${day}/${month}/${year}`}</td>
                <td className='sale-data-table-column'>{item.items.batchNumber}</td>
                <td className='sale-data-table-column'>{item.items.quantity}</td>
                <td className='sale-data-table-column'>{item.items.discount}</td>
                <td className='sale-data-table-column'>{'0'}</td>
                {/* <div>{item.items.deal}</div> */}
              </tr>
            })
          }
        </tbody>
      </table>
      
    </div>
  )
}

export default Item_sale_table;