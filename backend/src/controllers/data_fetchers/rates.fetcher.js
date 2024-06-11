import { Item } from "../../models/item.model.js";
import { Rate } from "../../models/rate.model.js";
import { handleErr } from "../../utils/apiError.js"
import { ApiResponse } from "../../utils/apiResponse.js";

const fetchRates = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    const totalItems = await Item.countDocuments();

    // console.log(page)

    const rates = await Item.find({})
      .populate({
        path: "rates",
        select: "-itemCode",
        populate: {
          path: "rates",
          select: "-itemCode",
          populate: {
            path: "purchase",
            select: "-partyCode -items -party -searchTags -_id -__v"
          }
        }
      })
      .skip((page - 1) * limit)
      .limit(limit);



    return res.json(new ApiResponse(200, { rates, totalItems }, "rates fetched successfully"));


  }
  catch (err) {
    return handleErr(res, err);
  }
}

const item_rates_fetcher = async(req,res)=>{
  try{
    const {productID} = req.body;
    // console.log(req.body);

    const rates = await Rate.findOne({
      item:productID
    })
    .populate({
      path:'item',
      select:"-company -purchases -rates -sale -itemCode -gst -_id -__v"
    })
    .populate({
      path:'rates.partyID',
      select:"-address -bills -createdAt -details -purchases -searchTags -updatedAt -__v"
    })
    .populate({
      path:"rates.purchase",
      select:'-items -party -partyCode'
    });
    
    return res.json(new ApiResponse(200, rates));

  }
  catch(err){
    return handleErr(res,err);
  }
}


export {
  fetchRates,
  item_rates_fetcher,
}