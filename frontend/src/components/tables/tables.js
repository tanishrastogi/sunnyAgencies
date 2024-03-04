import React, { useState } from 'react';
import { BACKEND_URL } from '../../api.config';
import "../graphs/graphs.css";
import './tables.css'

const Best_sale_by_month = () => {

    const [details, setDetails] = useState({
        month: "",
        year: "",
        accuracy: ""
    })

    const styles = {
        // display:"flex",
        // justifyContent:
        height:"35rem"
    }

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
        const res = await fetch(`${BACKEND_URL}/api/sales/peaksale/month`, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: {

            }
        })
    }

    const log = () => {
        console.log("working")
    }

    return <div className='bar-graph ' style={styles}>
        <h3>BEST SALE FOR THIS MONTH</h3>
        <p>Use this analyis to create your order for this month .</p>
        <div className='find-peak-sale-table'>
            <input name='month' onChange={handleChange} value={details.month} placeholder='MONTH NAME' />
            <input name='accuracy' onChange={handleChange} value={details.accuracy} placeholder='ACCURACY' />
        </div>
        {/* <div className='graph-img graph-img-tables'> */}

        {/* </div> */}
        {/* <table>
            <thead>
                <th>ele1</th>
                <th>ele2</th>
                <th>ele3</th>
            </thead>
            <tr>
                <td>ab1</td>
                <td>ab2</td>
                <td>ab3</td>
            </tr>
        </table> */}
    </div>
}

export default Best_sale_by_month 