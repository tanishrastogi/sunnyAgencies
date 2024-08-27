import React, { useEffect, useState, useCallback } from 'react';
import "./itemList.css";
import Display_Accounts from '../display/Display_Accounts';
import { searchAccount } from '../../api/search.api';
import { fetch_party_item_history } from '../../api/pdf.api';
import _ from 'lodash'; // Lodash for debounce
import smallNotepad from "./images/smallNotepad.png"
import bigNotebook from "./images/bigNoteBook.png"
import DeleteIcon from '@mui/icons-material/Delete';


const ItemList = () => {
  const [data, setData] = useState([]);
  const [accountDisplayVisibility, setAccountDisplayVisibility] = useState(false);
  const [inputValues, setInputValues] = useState({ accountName: "" });
  const [accounts, setAccounts] = useState([]);
  const [accountData, setAccountData] = useState(() => {
    const data = sessionStorage.getItem("accountData");
    return data ? JSON.parse(data) : [];
  });

  const [selectedAccount, setSelectedAccount] = useState({

  })

  const fetchData = async (id) => {
    try {
      const response = await fetch_party_item_history({ partyID: id });
      if (response.statusCode === 200) {
        // setAccountData(prev => [...prev, response.data].slice(prev.length>5?prev.length-4:0, prev.length+1)); 
        setAccountData((prev) => {
          console.log(prev)
          return prev?.length >= 5 ? [...prev.slice(1), response.data] : [...prev, response.data]
        });
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

  const deleteAccount = (index) => {
    const updatedAccounts = accountData.filter((_, i) => i !== index);
    setAccountData(updatedAccounts);
    sessionStorage.setItem('accountData', JSON.stringify(updatedAccounts));
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

  // console.log(selectedAccount);

  useEffect(() => {
    sessionStorage.setItem('accountData', accountData ? JSON.stringify(accountData) : []);
  }, [accountData]);




  // console.log(accountData)

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
      <div className='accounts-container'>

        <div className='list-holders'>
          <div className='party-name'>
            {
              selectedAccount.partyName
            }
          </div>
          <img src={bigNotebook}></img>
        </div>
        <div className='account-names'>
          {accountData?.map((acc, index) => {
            // console.log(acc)
            return <div className='account-name-value'>
              <div onClick={() => {
                setSelectedAccount(acc);
              }}>{acc?.partyName?.length > 15 ? acc?.partyName.slice(0, 15) : acc?.partyName}</div>
              <div onClick={()=>{deleteAccount(index)}}>
                <DeleteIcon
                  sx={{
                    height: "0.7rem",
                    color: "grey",
                    "&:hover": {
                      color: "red"
                    }
                  }}
                  
                />
              </div>
            </div>
          })}
        </div>
      </div>

    </div>
  );
}

export default ItemList;
