import { removeFile } from "../../../middlewares/multer.mdlw.js";
import { handleErr } from "../../../utils/apiError.js"
import { ApiResponse } from "../../../utils/apiResponse.js";
import xlsx from "xlsx"
import { trimArrayOfObj } from "./functions/trimObj.js";

const item_adder = async (req, res) => {
  try {

    const workbook = xlsx.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName]

    console.log();

    removeFile(req.file.path);
    return res.json(new ApiResponse(200, trimArrayOfObj(xlsx.utils.sheet_to_json(worksheet))));
  }
  catch (err) {
    return handleErr(res, err);
  }
}

export { item_adder }