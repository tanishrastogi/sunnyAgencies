import React, { useEffect, useState } from "react";
import "./styles/display_accounts.css";

let Account = {};

const Display_Accounts = ({ accounts,fetchData , setSelectedAccount, setAccountDisplayVisibility  }) => {
  return (
    <div className="display_accounts">
      {accounts.length !== 0 ? (
        accounts.map((account) => {
          return (
            <div
              className="account_container"
              onClick={async() => {
                Account = account;
                if(setSelectedAccount){
                  setSelectedAccount(account)
                }
                if(setAccountDisplayVisibility){
                  setAccountDisplayVisibility(false)
                }

                if(fetchData){
                  await fetchData(account._id)
                }

              }}
            >
              <div className="account_container_content">
                {account.partyName}
              </div>
              <div className="account_container_content">
                {account.address[0]}
              </div>
              <div className="account_container_content">
                {account.address[1]}
              </div>
              <div className="account_container_content">
                {account.details.gstNumber}
              </div>
            </div>
          );
        })
      ) : (
        <div className="account_container">No Accounts Found</div>
      )}
    </div>
  );
};
export { Account };
export default Display_Accounts;
