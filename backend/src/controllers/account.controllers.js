import { Party } from "../models/party.model.js";
import { handleErr } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js";

const fetchAccountByID = async (req, res) => {
  try {
    const { accountID } = req.body;

    const party = await Party.findById(accountID);

    if (!party) return res.json(new ApiResponse(404, null, "party not found."));

    return res.json(new ApiResponse(200, party, "Party Fetched successfully."))

  }
  catch (err) {
    return handleErr(res, err);
  }
}


const fetchAllAccount = async(req,res)=>{
  try{

    const {page} = req.body;

    const accounts = await Party.find({})
    .skip((page-1)*10)
    .limit(10);

    return res.json(new ApiResponse(200, accounts));

  }
  catch(err){
    return handleErr(res,err);
  }
}


export {
  fetchAccountByID,
  fetchAllAccount
};

