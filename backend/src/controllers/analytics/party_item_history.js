import { Bill } from "../../models/bill.model";
import { Party } from "../../models/party.model";
import { handleErr } from "../../utils/apiError"
import { ApiResponse } from "../../utils/apiResponse";

const PartyItemHistory = async(req,res)=>{
  try{
    
    const {partyID} = req.body;

    if(!partyID) return res.json(new ApiResponse(404, null, "Party Id not specified."));
    
    const party = await Party.findById(partyID);
    
    if(!party) return res.json(new ApiResponse(404, "Party not found."));
  
    const result = await Bill.aggregate([
      // Match bills with the specified party ID
      {
        $match: {
          party: new mongoose.Types.ObjectId("667fd0b203ef73de41cf4d61")
        }
      },
      // Unwind the items array
      {
        $unwind: "$items"
      },
      // Group by item and sum the quantities
      {
        $group: {
          _id: "$items.item",
          totalQuantity: { $sum: { $toDouble: "$items.quantity" } }
        }
      },
      // Lookup to get item details (optional)
      {
        $lookup: {
          from: "items", // Name of the items collection
          localField: "_id",
          foreignField: "_id",
          as: "itemDetails"
        }
      },
      // Unwind the item details array
      {
        $unwind: "$itemDetails"
      },
      // Project the final output
      {
        $project: {
          _id: 0,
          itemId: "$_id",
          itemName: "$itemDetails.name", // Adjust the field name based on your item schema
          totalQuantity: 1
        }
      }
    ]);


    return res.json(new ApiResponse(200, result, "History fetched successfully"));

  }
  catch(err){
    return handleErr(res,err);
  }
}

export {
  PartyItemHistory
}