import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Rates_table from '../../../components/tables/rates_table';
import PurchaseRateCalculator from '../../../components/calculators/purchase.cal';
import { fetchRatesApi, fetchRatesByID } from '../../../api/rates.api';
import "./item.card.css";

const ItemCard = () => {

  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');

  const [item, setItem] = useState({})

  useEffect(()=>{
    fetchItemRates();
  },[])

  const fetchItemRates = async () => {
    try {
      const res = await fetchRatesByID({ productID:id });
      setItem(res.data);
      // console.log(res.data);
      // setName(res.data.item.itemName)
    }
    catch (err) {
      console.log(err)
    }
  }

  // console.log(item)


  return (
    <div className='item-card-container'>
      <Rates_table product={item}/>
      <div className="item-card-rate-table" style={{width:"fit-content"}}><PurchaseRateCalculator product={item}/></div>
    </div>
  )
}

export default ItemCard