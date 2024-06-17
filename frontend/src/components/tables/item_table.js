//  completed on around 11th june




import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import { fetchRatesApi } from '../../api/rates.api';
import { searchItems } from '../../api/search.api';
import {useNavigate} from "react-router-dom";


const Item_table = () => {

  const [page, setPage] = useState(1);
  const [searchWord, setSearchWord] = useState('')
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState({})

  const history = useNavigate("/");
  
  console.log(searchWord)

  useEffect(() => {
    fetchRates()
  }, [page])

  useEffect(() => {
    fetchRates()
  }, [searchWord])

  const fetchRates = async () => {
    try {
      if (searchWord) {
        const res = await searchItems({ searchWord, page });
        console.log(res.data)
        setProducts({ rates: res.data });
      }
      else if (searchWord.length === 0) {
        const res = await fetchRatesApi({ page });
        setProducts(res.data);
        setCount(res.data.totalItems)
        console.log(res.data);
        // alert(JSON.stringify(res));
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  // console.log(products.rates)

  return (
    <div className='item-table'>
      <div>
        <input value={searchWord} placeholder='Search Items ...' onChange={(e) => {
          setSearchWord(e.target.value)
        }}>
        </input>
        <span>Total Items: {count}</span>
      </div>
      <table>
        <thead style={{ background: "#0d9301", color: "white", fontWeight: "bold" }}>
          <tr>
            <td>Item Code</td>
            <td>Item Name</td>
            <td>Packing</td>
            <td>Total Quantity</td>
            <td>Company</td>
          </tr>
        </thead>
        <tbody>
          {
            products.rates?.map((item) => {
              return <tr onClick={() => {
                history(`/item?id=${item._id}`)
              }}>
                <td>{item.itemCode}</td>
                <td>{item.itemName}</td>
                <td>{item.packing}</td>
                <td>{item.totalQuantity}</td>
                <td>{item.company}</td>
              </tr>
            })
          }
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={Math.ceil(products.totalItems / 10)}
          page={page}
          onChange={(e, value) => {
            setPage(value)
          }}
          color='success'
        />
      </div>
    </div>
  )
}

export default Item_table