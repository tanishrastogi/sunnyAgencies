import React from 'react'
import { BACKEND_URL } from '../../api.config'

const Best_sale_by_month = ()=>{
    
    const fetchData = async(req,res)=>{
        const res = await fetch(`${BACKEND_URL}/api/sales/peaksale/month` , {
            method
        })
    }

    return <div>
        <table>
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
        </table>
    </div>
}

export default Best_sale_by_month 