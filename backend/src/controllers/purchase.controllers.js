import { handleErr } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Purchase } from "../models/purchase.model.js";

const fetchPurchaseByID = async (req, res) => {
  try {

    const { purchaseID } = req.body;

    if (!purchaseID) return res.json(new ApiResponse(404, "purchase id not found"))

    const purchase = await Purchase.findById(purchaseID);

    if (!purchase) return res.json(new ApiResponse(404, "Purchase not found!"));

    return res.json(new ApiResponse(200, purchase, "purchase fetched succesffully"));

  }
  catch (err) {
    return handleErr(res, err);
  }
}


const fetchPurchase = async(req,res)=>{
  try{
    const purchases = await Purchase.find({});
    return res.json(new ApiResponse(200, purchases));
  }
  catch(err){
    return handleErr(res,err);
  }
}

export { fetchPurchaseByID, fetchPurchase };