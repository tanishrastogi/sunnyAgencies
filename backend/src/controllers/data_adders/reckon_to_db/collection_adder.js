import { handleErr } from "../../../utils/apiError.js";
import xlsx from "xlsx";
import { trimArrayOfObj } from "./functions/trimObj.js";
import { ApiResponse } from "../../../utils/apiResponse.js";
import { addSaleToDatabase, formSaleObj } from "./functions/sale_functions.js";

export const collection_adder = async (req, res) => {
  try {

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const objFromExcelFile = trimArrayOfObj(xlsx.utils.sheet_to_json(worksheet));

    console.log(Array.isArray(objFromExcelFile))

    // forming the collection object
    // const collectionObj = formCollectionObj(objFromExcelFile);


    return res.json(new ApiResponse(200, objFromExcelFile));


  }
  catch (err) {
    return handleErr(res, err);
  }
}
