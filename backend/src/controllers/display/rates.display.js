import { Item } from "../../models/item.model.js";
import { handleErr } from "../../utils/apiError.js"

const ratePDFcreator = async (req, res) => {
  try {
    const items = await Item.find({});
    const rateObj = [];

    const promises = items.map(async (item) => {
      const obj = await Item.findById(item._id).populate("rates");

      const { itemCode, itemName, company, packing, gst, totalQuantity, rates } = item;

      const ratesArray = [];

      rates.map((rate)=>{
        
      })

      const itemObj = {

      }

      rateObj.push(obj)
    })

    await Promise.all(promises);
    return res.json(rateObj);
  }
  catch (err) {
    return handleErr(res, err);
  }
}


export { ratePDFcreator }