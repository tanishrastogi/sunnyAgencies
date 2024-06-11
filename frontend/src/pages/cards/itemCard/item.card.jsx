import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Rates_table from '../../../components/tables/rates_table';

const ItemCard = () => {

  const [searchParams] = useSearchParams();

  const id = searchParams.get('id')

  useEffect(()=>{
    
  })

  return (
    <div><Rates_table productID={id}/></div>
  )
}

export default ItemCard