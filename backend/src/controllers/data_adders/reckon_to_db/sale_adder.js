import { handleErr } from "../../../utils/apiError.js";
import xlsx from "xlsx";
import { trimArrayOfObj } from "./functions/trimObj.js";
import { ApiResponse } from "../../../utils/apiResponse.js";
import { addSaleToDatabase, formSaleObj } from "./functions/sale_functions.js";

const sale_adder = async (req, res) => {
  try {

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const objFromExcelFile = trimArrayOfObj(xlsx.utils.sheet_to_json(worksheet));

    console.log(Array.isArray(objFromExcelFile))

    // forming the sale object
    const saleObj = formSaleObj(objFromExcelFile, "bills");

    // adding the sale object formed to the database
    const addSaleData = await addSaleToDatabase(saleObj);

    return res.json(new ApiResponse(200, addSaleData));


  }
  catch (err) {
    return handleErr(res, err);
  }
}

export {
  sale_adder
}