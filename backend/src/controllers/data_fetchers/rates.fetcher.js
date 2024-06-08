import { Rate } from "../../models/rate.model.js";
import { handleErr } from "../../utils/apiError.js"
import { ApiResponse } from "../../utils/apiResponse.js";

const fetchRates = async (req, res) => {
  try {

    const { word } = req.body;

    if(word){
      
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const rates = await Rate.find({})
      .populate('item')
      .populate("rates.purchase")
      .populate({
        path: "rates.partyID",
        select: "-details -purchases -bills -address"
      })
      .skip((page - 1) * limit)
      .limit(limit);



    return res.json(new ApiResponse(200, rates, "rates fetched successfully"));


  }
  catch (err) {
    return handleErr(res, err);
  }
}

export {
  fetchRates
}