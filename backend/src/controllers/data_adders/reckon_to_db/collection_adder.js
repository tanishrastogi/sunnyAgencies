import { handleErr } from "../../../utils/apiError.js";
import xlsx from "xlsx";
import { trimArrayOfObj } from "./functions/trimObj.js";
import { ApiResponse } from "../../../utils/apiResponse.js";
import { addSaleToDatabase, formSaleObj } from "./functions/sale_functions.js";
import { add_collections_to_db } from "./functions/collection.functions.js";

export const collection_adder = async (req, res) => {
  try {
    console.log(req.body)
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const objFromExcelFile = trimArrayOfObj(xlsx.utils.sheet_to_json(worksheet));

    const add_to_db = await add_collections_to_db(objFromExcelFile);



    // console.log(Array.isArray(objFromExcelFile));

    // forming the collection object
    // const collectionObj = formCollectionObj(objFromExcelFile);


    return res.json(new ApiResponse(200, add_to_db, "Added successfully."));


  }
  catch (err) {
    return handleErr(res, err);
  }
}
