import React, { useState } from 'react';
import { BACKEND_URL } from '../../api.config.js';
import "../graphs/graphs.css";
import './tables.css'



const Best_sale_by_month = () => {

    const [details, setDetails] = useState({
        month: "",
        accuracy: ""
    })

    const [saleData, setSaleData] = useState('')

    const handleChange = (e) => {

        const { name, value } = e.target
        // console.log(e.target)
        setDetails(() => {
            return {
                ...details,
                [name]: value
            }
        })
    }


    const fetchData = async () => {

        const res = await fetch(`${BACKEND_URL}/api/sales/peaksale/every-year-same-month`, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                month: details.month,
                accuracy: details.accuracy
            })
        })

        const data = await res.json();
        console.log(data);
        setSaleData(data);
    }


    return <div >

        <div className='table-size' >
            <h3 style={{ textAlign: "left", margin: "20px" }}>BEST SALE FOR THIS MONTH</h3>
            {/* <p style={{ fontSize: "0.8rem" }}>Use this analysis to create your order for this month.</p> */}
            <div className='input-box'>
                <input name='month' onChange={handleChange} value={details.month} placeholder='MONTH NAME' />
                <input name='accuracy' onChange={handleChange} value={details.accuracy} placeholder='ACCURACY' />
            </div>
            {saleData ? <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ITEM CODE</th>
                            <th>ITEM NAME</th>
                            <th>AVG SALE</th>
                            <th>YEARS CHECKED</th>
                            <th>SAME MONTH YEARS</th>
                        </tr>
                    </thead>
                    {saleData.map((item) => {
                        return <tr>
                            <td>{item.itemCode}</td>
                            <td>{item.itemName}</td>
                            <td>{item.avg_sale_this_month}</td>
                            <td>{item.total_attempts}</td>
                            <td>{item.correct_attempts}</td>
                        </tr>
                    })}
                </table>
            </div> : <div className="table-absence-image">Click on the GENERATE button to generate table</div>}
            <button onClick={fetchData}>GENERATE</button>
        </div>
    </div>
}

export default Best_sale_by_month 