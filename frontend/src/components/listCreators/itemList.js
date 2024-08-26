import React, { useEffect, useState } from 'react';
import "./itemList.css";
import Display_Accounts, { Account } from '../display/Display_Accounts';
import { searchAccount } from '../../api/search.api';

const ItemList = () => {
  
  const [data, setData] = useState([]);
  const [accountDisplayVisibility, setAccountDisplayVisibility] = useState(false);
  const [inputValues, setValue] = useState({
    accountName:""
  })

  const [accounts, setAccounts] = useState([])

  const fetchData = async()=>{
    try{
      
    } 
    catch(err){
      console.error(err);
    }
  }

  

  const fetchAccounts = async () => {
    try {
      console.log(inputValues.accountName)
      if (inputValues.accountName?.length !== 0) {
        const response = await searchAccount({ searchWord: inputValues.accountName });
        if (response.data) {
          console.log(response.data)
          setAccounts(response.data);
          setAccountDisplayVisibility(true)
        }
      }
      else if(inputValues.accountName?.length === 0){
        setAccountDisplayVisibility(false)
      }
    } catch (err) {
      console.error(err);
    }
  };

  

  const handleChange = (e)=>{
    const {name, value} = e.target;
    console.log(value)
    setValue(()=>{
      return {
        ...inputValues,
        [name]:value
      }
    })
  }


  return (
    <div className='itemList'>
      <input type="text" autocomplete="off" name="accountName" className="input" placeholder="Account Name" onChange={(e)=>{
        handleChange(e);
        fetchAccounts();
      }}></input>
      {accountDisplayVisibility?<Display_Accounts accounts={accounts}/>:""}
    </div>
  )
}


export default ItemList