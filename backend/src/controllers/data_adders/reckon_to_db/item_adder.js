import { removeFile } from "../../../middlewares/multer.mdlw.js";
import { handleErr } from "../../../utils/apiError.js"
import { ApiResponse } from "../../../utils/apiResponse.js";
import xlsx from "xlsx"
import { trimArrayOfObj } from "./functions/trimObj.js";
import { addItemsToDB, addPurchaseToDB,  addTotalQuantityToItems,  formPurchaseObject } from "./functions/formObj.js";
import { Item } from "../../../models/item.model.js";


const item_adder = async (req, res) => {
  try {

    // Things we would be needing in a report for adding items to db.

    /*

      item code
      item name
      company
      packing
      gst
      hsn
      mrp

    */
    const workbook = xlsx.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // trimming the extra spaces from the keys and values in the object.
    const objFromExcelFile = trimArrayOfObj(xlsx.utils.sheet_to_json(worksheet));

    // reforming the array of objects from excel purchase file , into a suitable object , which can be added to the db 
    const purchaseObj = formPurchaseObject(objFromExcelFile, 'items');
    const purchaseObjForRates = formPurchaseObject(objFromExcelFile, 'purchases');
    
    await addItemsToDB(purchaseObj);
    const purchases = await addPurchaseToDB(purchaseObjForRates);
    await addTotalQuantityToItems();

    removeFile(req.file.path);

    return res.json(new ApiResponse(200, purchases));
  }
  catch (err) {
    return handleErr(res, err);
  }
}

export { item_adder }