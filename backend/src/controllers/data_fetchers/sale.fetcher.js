import mongoose from "mongoose";
import { Bill } from "../../models/bill.model.js";
import { handleErr } from "../../utils/apiError.js"
import { ApiResponse } from "../../utils/apiResponse.js";

const past_item_sale_data = async (req, res) => {
  try {
    const { itemID , page} = req.body;
    const limit = 10;

    if (!itemID) return res.json(new ApiResponse(404, null, "provide all details"));

    const result = await Bill.aggregate([
      // Match bills containing the specific item ID
      { $match: { 'items.item': new mongoose.Types.ObjectId(itemID) } },

      // Unwind the items array
      { $unwind: '$items' },

      // Match again to ensure we only get the specific item
      { $match: { 'items.item': new mongoose.Types.ObjectId(itemID) } },

      // Lookup to join the items with their details
      {
        $lookup: {
          from: 'items', // The collection name for items
          localField: 'items.item',
          foreignField: '_id',
          as: 'itemDetails'
        }
      },
      
      {
        $lookup:{
          from:'parties',
          localField:'party',
          foreignField:'_id',
          as:'partyDetails'
        }
      },
      

      // Unwind the itemDetails array to get the actual item details
      { $unwind: '$itemDetails' },

      // Project the desired fields and convert discount to double
      {
        $project: {
          billNumber: 1,
          billDate: 1,
          'items.discount': 1,
          'items.quantity': 1,
          'items.mrp': 1,
          'items.free': 1,
          'items.deal': 1,
          'items.netSaleRate': 1,
          'items.batchNumber': 1,
          'partyDetails.partyName':1,
        }
      },

      {
        $facet: {
          data: [
            { $skip: (page - 1) * limit },
            { $limit: limit }
          ],
          totalCount: [
            { $count: 'count' }
          ]
        }
      }
    ])
    // .skip((page-1)*limit)
    // .limit(limit);
    

    if (!result || result.length === 0) return res.json(new ApiResponse(404, "No past Bill Data found for this item."))
    // console.log(result)

    return res.json(new ApiResponse(200, result, "Data fetched"));

  }
  catch (err) {
    return handleErr(res, err)
  }
}

export {
  past_item_sale_data
}