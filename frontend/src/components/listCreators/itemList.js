import React, { useEffect, useState, useCallback } from 'react';
import "./itemList.css";
import Display_Accounts from '../display/Display_Accounts';
import { searchAccount } from '../../api/search.api';
import { fetch_party_item_history } from '../../api/pdf.api';
import _ from 'lodash'; // Lodash for debounce

const ItemList = () => {
  const [data, setData] = useState([]);
  const [accountDisplayVisibility, setAccountDisplayVisibility] = useState(false);
  const [inputValues, setInputValues] = useState({ accountName: "" });
  const [accounts, setAccounts] = useState([]);
  const [accountData, setAccountData] = useState([]);

  const fetchData = async (id) => {
    try {
      const response = await fetch_party_item_history({ partyID: id });
      if (response.statusCode === 200) {
        // setAccountData(prev => [...prev, response.data].slice(prev.length>5?prev.length-4:0, prev.length+1)); 
        setAccountData(prev => prev.length>=5?[...prev.slice(1), response.data]:[...prev, response.data]); 
      }
    } catch (err) {
      console.error(err);
    }
  }


  const fetchAccounts = async () => {
    try {
      if (inputValues.accountName?.length !== 0) {
        const response = await searchAccount({ searchWord: inputValues.accountName });
        if (response.data) {
          setAccounts(response.data);
          setAccountDisplayVisibility(true);
        }
      } else {
        setAccountDisplayVisibility(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Debounced version of fetchAccounts
  const debouncedFetchAccounts = useCallback(_.debounce(fetchAccounts, 300), [inputValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues(prev => ({
      ...prev,
      [name]: value
    }));
  }

  useEffect(() => {
    if (inputValues.accountName) {
      debouncedFetchAccounts();
    }
    return debouncedFetchAccounts.cancel; // Cleanup debounced calls on unmount
  }, [inputValues.accountName, debouncedFetchAccounts]);

  // console.log(accountData);

  useEffect(() => {
    console.log(accountData)
    localStorage.setItem('accountData', JSON.stringify(accountData));
  }, [accountData]);
  
  // Retrieve from sessionStorage
  useEffect(() => {
    const storedData = localStorage.getItem('accountData');
    if (storedData) {
      setAccountData(JSON.parse(storedData));
    }
  }, []);

  console.log(accountData)

  return (
    <div className='itemList'>
      <input 
        type="text" 
        autoComplete="off" 
        name="accountName" 
        className="input" 
        placeholder="Account Name" 
        onChange={(e) => {
          handleChange(e);
        }} 
      />
      {accountDisplayVisibility && (
        <Display_Accounts 
          fetchData={fetchData}
          accounts={accounts} 
        />
      )}
      <div className='list-holders'>
        {

        }
      </div>

    </div>
  );
}

export default ItemList;
