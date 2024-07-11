import React, { useEffect, useState } from "react";
import "./styles/display_accounts.css";

let Account = {};

const Display_Accounts = ({ accounts }) => {
  
  return (
    <div className="display_accounts">
      {accounts.length !== 0 ? (
        accounts.map((account) => {
          return (
            <div
              className="account_container"
              onClick={() => {
                Account = account;
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
        <div>No Accounts Found</div>
      )}
    </div>
  );
};
export {Account};
export default Display_Accounts;
