import mongoose from "mongoose";
import { Bill } from "../../models/bill.model.js";
import { Party } from "../../models/party.model.js";
import { handleErr } from "../../utils/apiError.js"
import { ApiResponse } from "../../utils/apiResponse.js";
import pdf from "html-pdf";
import path from "path";
import { htmlContent } from "./functions/htmlContent.js";
import { fileURLToPath } from "url";
import {ist_to_utc} from "../../utils/date_functions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PartyItemHistory = async(req,res)=>{
  try{
    
    const {partyID} = req.body;

    if(!partyID) return res.json(new ApiResponse(404, null, "Party Id not specified."));
    
    const party = await Party.findById(partyID);
    
    if(!party) return res.json(new ApiResponse(404, "Party not found."));
  
    const startDate = new Date(ist_to_utc("2024-05-10T00:00:00.000Z"));
    const endDate = new Date(ist_to_utc("2024-06-15T23:59:59.999Z"));

    const result = await Bill.aggregate([
      // Match bills with the specified party ID
      {
        $match: {
          // party: new mongoose.Types.ObjectId(partyID)
          party: new mongoose.Types.ObjectId(partyID),
          billDate: { $gte: startDate, $lte: endDate }
          
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
          totalQuantity: 1,
          // partyDetails:1,
          itemDetails:1
        }
      },
      {
        $sort:{
          totalQuantity:-1
        }
      }
    ]);

        

    const resultWithPartyName = {
      partyName:party.partyName,
      items:[
        ...result
      ]
    }

    console.log(resultWithPartyName.partyName)
    
    const filePath = path.join(__dirname, "output.pdf");

    pdf.create(htmlContent(resultWithPartyName), { format: 'A4' }).toFile(filePath, (err, response) => {
      if (err) return console.log(err);
      console.log('PDF generated successfully:', response);
      
      // Send the file to the frontend
      res.sendFile(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Could not send file');
        } else {
          console.log('File sent successfully');
        }
      });
    });


    // return res.json(new ApiResponse(200, result, "History fetched successfully"));

  }
  catch(err){
    return handleErr(res,err);
  }
}

export {
  PartyItemHistory
}