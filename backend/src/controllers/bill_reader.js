import { readBill } from "../shop-pdf-reader/server.js";
import { handleErr } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const read_bill = async(req,res)=>{
  try{
    const bill = await readBill('D:/my_projects/coding/developer_journey/web_development/sunnyAgencies/backend/src/shop-pdf-reader/pdfs/rad8CAD4.pdf')
    return res.json(new ApiResponse(200, bill))
  }
  catch(err){
    return handleErr(res,err);
  }
}



export {read_bill};