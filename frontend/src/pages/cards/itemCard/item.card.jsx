import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Rates_table from '../../../components/tables/rates_table';
import PurchaseRateCalculator from '../../../components/calculators/purchase.cal';

const ItemCard = () => {

  const [searchParams] = useSearchParams();

  const id = searchParams.get('id')

  useEffect(()=>{
    
  })

  return (
    <div>
      <Rates_table productID={id}/>
      <div style={{width:"20rem"}}><PurchaseRateCalculator /></div>
    </div>
  )
}

export default ItemCard