import React, { useEffect, useState, useCallback, useRef } from 'react';
import "./itemList.css";
import Display_Accounts from '../display/Display_Accounts';
import { searchAccount } from '../../api/search.api';
import { fetch_party_item_history, send_party_item_history_pdf_via_email } from '../../api/pdf.api';
import _ from 'lodash'; // Lodash for debounce
import smallNotepad from "./images/smallNotepad.png"
import bigNotebook from "./images/bigNoteBook.png"
import DeleteIcon from '@mui/icons-material/Delete';
import { Pagination } from '@mui/material';


const ItemList = () => {
  const [data, setData] = useState([]);
  const [accountDisplayVisibility, setAccountDisplayVisibility] = useState(false);
  const [inputValues, setInputValues] = useState({
    accountName: "",
    email: ""
  });

  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(1);
  const [accountData, setAccountData] = useState(() => {
    const data = sessionStorage.getItem("accountData");
    return data ? JSON.parse(data) : [];
  });

  const [selectedAccount, setSelectedAccount] = useState({
    partyName: "",
    items: []
  });


  const inputRefs = useRef([]); // Create a ref to hold all input refs

  const fetchData = async (id) => {
    try {
      const response = await fetch_party_item_history({ partyID: id });
      if (response.statusCode === 200) {
        setAccountData((prev) => {
          return prev?.length >= 5 ? [...prev.slice(1), response.data] : [...prev, response.data];
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

  const sendPDFViaEmail = async () => {
    try {

      if (inputValues.email.length === 0) {
        window.alert("Email not specified.");
        return;
      }

      const data = await send_party_item_history_pdf_via_email({ data: selectedAccount, email: inputValues.email });
      if (data.statusCode === 200) {
        window.alert("email sent");
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const deleteAccount = (index) => {
    const updatedAccounts = accountData.filter((_, i) => i !== index);
    setAccountData(updatedAccounts);
    sessionStorage.setItem('accountData', JSON.stringify(updatedAccounts));
  };

  // Save current party's data to sessionStorage
  const savePartyData = (partyName, items) => {
    sessionStorage.setItem(partyName, JSON.stringify(items));
  };

  // Load party's data from sessionStorage
  const loadPartyData = (partyName) => {
    const data = sessionStorage.getItem(partyName);
    return data ? JSON.parse(data) : [];
  };

  const handleInputChange = (e, itemIndex, field) => {
    const { value } = e.target;
    const updatedItems = [...selectedAccount.items];
    updatedItems[itemIndex][field] = value;
    setSelectedAccount((prev) => ({
      ...prev,
      items: updatedItems,
    }));
    savePartyData(selectedAccount.partyName, updatedItems);
  };

  const handleItemDelete = (item) => {
    console.log(item);
    if (window.confirm("Are you sure you want to delete this item?")) {

      const items = selectedAccount.items.filter((med) => {
        return med.itemDetails._id !== item.itemDetails._id;
      });

      setSelectedAccount((prev) => ({
        ...prev,
        items
      }));

      savePartyData(selectedAccount.partyName, items);
    }

  }

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

  useEffect(() => {
    sessionStorage.setItem('accountData', accountData ? JSON.stringify(accountData) : []);
  }, [accountData]);

  useEffect(() => {
    // Load selected party's data on selection change
    const loadedData = loadPartyData(selectedAccount.partyName);
    setSelectedAccount((prev) => ({
      ...prev,
      items: loadedData,
    }));
  }, [selectedAccount.partyName]);

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex <= inputRefs?.current.length) {
        inputRefs?.current[nextIndex]?.focus();
      }
    }
    else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const nextIndex = index - 1;
      if (nextIndex < inputRefs?.current.length) {
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  return (
    <div className='itemList'>
      <div>
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
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Email"
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
      {accountDisplayVisibility && (
        <Display_Accounts
          fetchData={fetchData}
          accounts={accounts}
          setAccountDisplayVisibility={setAccountDisplayVisibility}
        />
      )}
      <div className='accounts-container'>

        {selectedAccount.items.length > 0 ? <div className='list-holders'>
          <div className='party-name' style={{ display: "flex" }}>
            {
              <p style={{ fontWeight: "bolder", fontSize: "1.3rem" }}>{selectedAccount?.partyName}</p>
            }
            <button onClick={sendPDFViaEmail}>Create PDF</button>
          </div>
          <div className='list-table'>
            <div className='headings'>
              <div>Item Name</div>
              <div className='disc'>Discount</div>
              <div className='deal'>Deal</div>
              <div className=''></div>
            </div>
            <div className='body'>
              {
                selectedAccount?.items?.map((item, index) => {
                  return <div className='row' key={index}>
                    <div>{item?.itemDetails?.itemName}</div>
                    <input
                      placeholder='Discount'
                      name='discount'
                      ref={(el) => (inputRefs.current[index * 2] = el)}
                      onKeyDown={(e) => handleKeyDown(e, index*2)}
                      value={item.discount || ""}
                      onChange={(e) => handleInputChange(e, index, 'discount')}
                    />
                    <input
                      placeholder='Deal'
                      name='deal'
                      ref={(el) => (inputRefs.current[index * 2 + 1] = el)}
                      onKeyDown={(e) => handleKeyDown(e, index * 2 + 1)}
                      value={item.deal || ""}
                      onChange={(e) => handleInputChange(e, index, 'deal')}
                    />
                    <div style={{ width: "1px" }} onClick={() => {
                      handleItemDelete(item)
                    }}>
                      <DeleteIcon
                        sx={{
                          height: "0.95rem",
                          color: "grey",
                          "&:hover": {
                            color: "red"
                          }
                        }}
                      />

                    </div>
                  </div>
                })
              }
            </div>
          </div>
        </div> : <div className='list-holders' style={{ height: "200px", display: "flex", textAlign: "center", alignItems: "center" }}>
          No past items for this party.
        </div>}
        <div className='account-names company-containers'>
          {accountData?.map((acc, index) => {
            return <div className='account-name-value' key={index}>
              <div onClick={() => {
                setSelectedAccount({
                  partyName: acc.partyName,
                  items: acc.items
                });
              }}>{acc?.partyName?.length > 15 ? acc?.partyName.slice(0, 15) : acc?.partyName}</div>
              <div onClick={() => { deleteAccount(index) }}>
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
