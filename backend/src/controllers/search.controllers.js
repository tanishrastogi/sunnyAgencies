import { Item } from "../models/item.model.js";
import { Party } from "../models/party.model.js";
import { handleErr } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js";

const searchApiForProducts = async (req, res) => {
  try {
    const { word } = req.body;
    // String(word).toUpperCase();

    const escapeRegex = (string) => {
      return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    const sanitizedWord = escapeRegex(word);

    const regex = new RegExp(sanitizedWord, 'i');
    // console.log(regex)
    const results = await Item.find({
      "$or": [
        { itemCode: { $regex: regex } },
        { itemName: { $regex: regex } },
        { company: { $regex: regex } },
        { packing: { $regex: regex } }

      ]
    }).populate("rates");

    return res.json(new ApiResponse(200, results, "Your search results"))

  }

  catch (err) {
    return handleErr(res, err);
  }
}

const searchApiForAccounts = async (req, res) => {
  try {
    const { word } = req.body;
    // String(word).toUpperCase();

    const escapeRegex = (string) => {
      return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    const sanitizedWord = escapeRegex(word);

    const regex = new RegExp(sanitizedWord, 'i');

    const result = await Party.find({
      "$or": [
        { partyCode: { $regex: regex } },
        { partyName: { $regex: regex } },
        { address: { $regex: regex } },
        // { details: { $regex: regex } },
        { "details.gstNumber": { $regex: regex } },
        { "details.dlNo1": { $regex: regex } },
        { "details.dlNo2": { $regex: regex } },
        { "details.mobile": { $regex: regex } },
        { searchTags: { $regex: regex } }
      ]
    })

    return res.json(new ApiResponse(200, result, "parties fetched successfully"));

  }
  catch (err) {
    return handleErr(res, err);
  }
}


export {
  searchApiForProducts,
  searchApiForAccounts
}