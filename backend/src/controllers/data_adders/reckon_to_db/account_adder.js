//  file path in Reckon : MASTER > LEDGER MASTER > ACCOUNT LIST

import { Party } from "../../../models/party.model.js";
import { handleErr } from "../../../utils/apiError.js"
import xlsx from "xlsx";
import { ApiResponse } from "../../../utils/apiResponse.js";
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";
import { trimArrayOfObj, trimObj } from "./functions/trimObj.js";

// REQUIRED REPORT SETTINGS: 
/*
  
  CODE
  NAME
  ADDR1
  ADDR2
  ADDR3
  MOBILE
  PHONE1
  PHONE2
  GSTNO
  DLNO1
  DLNO2

*/

const account_adder = async (req, res) => {
  try {
    // const dirname = path.join(__dirname,'/')

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const workbook = xlsx.readFile(`${__dirname}/excel_files/rad43E8B.xlsx`);

    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const data = trimArrayOfObj(xlsx.utils.sheet_to_json(worksheet));

    data.map(async (acc) => {

      const party = await Party.findOne({ partyCode: acc.Code });
      if (!party) {
        await Party.create({
          partyCode: acc.Code,
          partyName: acc.NAME,
          address: [acc.ADDRESS1, acc.ADDRESS2, acc.ADDRESS3],
          details: {
            dlNo1: acc['DL No1'],
            dlNo2: acc['DL No2'],
            gstNumber: acc['GST NUMBER'],
            mobile: [acc['MOBILE'], acc['PHONE1'], acc['PHONE2']]
          }
        });
      }
    })

    return res.json(new ApiResponse(200, data, "Accounts added successfully"))
  }
  catch (err) {
    return handleErr(res, err);
  }

}

export { account_adder };