// this function is to convert the objects recieved from the purchase report , into objects suitable for adding into the db.

import { Item } from "../../../../models/item.model.js";
import { Rate } from "../../../../models/rate.model.js";


const formPurchaseObject = (array, type) => {
  try {

    const arr = []

    let purchase = {};
    let items = [];
    array.map((entry, index) => {
      const entryNo = Number(entry['Entry No'].slice(2));
      if (entryNo > 0 && index !== 0) {
        arr.push(purchase);
        items = [...items, ...purchase['items']]
        purchase = {};
      }


      if (entryNo > 0) {

        purchase['entryNo'] = entry['Entry No'];
        purchase['partyCode'] = entry['AccCod'];
        purchase['billNo'] = entry['Bill No']
        purchase['billDate'] = entry['Bill Dt']
        purchase['items'] = [
          {
            itemCode: entry['ItemCd'],
            itemName: entry['ItemName'],
            packing: entry['Packing'],
            company: entry['Company'],
            batchNumber: entry['BatchNo'],
            quantity: entry['Qty'],
            purchaseRate: entry['NpRt(Inc'],
            mrp: entry['MRP'],
            gst: entry['CGST%'],
            discount: entry['Disc%'],
            free: entry['Deal']
          }
        ];

      }
      else if (entryNo === 0 && (entry['ItemCd'].length !== 0 || entry['ItemName'].length !== 0 || entry['Packing'].length !== 0 || entry['Company'].length !== 0)) {
        purchase['items']?.push({
          itemCode: entry['ItemCd'],
          itemName: entry['ItemName'],
          packing: entry['Packing'],
          company: entry['Company'],
          batchNumber: entry['BatchNo'],
          quantity: Number(entry['Qty']) + Number(entry['Deal']),
          purchaseRate: entry['NpRt(Inc'],
          mrp: entry['MRP'],
          gst: entry['CGST%'],
          discount: entry['Disc%'],
          free: entry['Deal']

        })
      }

      if (arr.length > 0) {
        let lastpurchaseEntryNo = arr[arr.length - 1]?.entryNo;
        let secondLastPurcahseEntryNo = arr[arr.length - 2]?.entryNo;
        let lastPurchase = arr[arr.length - 1]
        let secondLastPurchase = arr[arr.length - 2]
        if (lastpurchaseEntryNo === secondLastPurcahseEntryNo) {

          arr.pop();
          const items = [
            ...lastPurchase?.items,
            ...secondLastPurchase?.items
          ];

          arr[arr.length - 1]['items'] = items;

        }
      }


    })

    if (type === 'items') {
      return items
    }
    else if (type === 'purchases') {
      return arr
    }

  }
  catch (err) {
    console.log(err);
  }
}


const addItemsToDB = async (obj) => {
  try {

    const promises = obj.map(async (item) => {

      // console.log(item.itemCode)
      const med = await Item.findOne({
        itemCode: item.itemCode
      });
      // console.log(med)
      if (!med) {
        const medicine = new Item({
          itemCode: item.itemCode,
          itemName: item.itemName,
          company: item.company,
          packing: item.packing,
          gst: item.gst,
          totalQuantity: item.quantity
        })

        await medicine.save();

        const rate = new Rate({
          item: medicine._id,
          rates: [
            {
              batchNumber: item.batchNumber,
              quantity: item.quantity,
              free: item.free,
              purchaseRate: item.purchaseRate,
              mrp: item.mrp,
              gst: String(Number(item.gst) * 2),
              discount: item.discount,
            }
          ]
        })

        await rate.save();

      }
      else {

        await Rate.findOneAndUpdate({ item: med._id }, {
          $push: {
            rates: {
              batchNumber: item.batchNumber,
              quantity: item.quantity,
              free: item.free,
              purchaseRate: item.purchaseRate,
              mrp: item.mrp,
              gst: String(Number(item.gst) * 2),
              discount: item.discount,
            }
          }
        })

      }

    })

    await Promise.all(promises);
    console.log("Object added successfully");

  }
  catch (err) {
    console.log(err);
  }
}


const addRatesToItems = async (obj) => {
  try {
    const promises = obj.map(async (item) => {
      console.log(item)
      const med = await Item.findOne({ itemCode: item.itemCode })
      if (med) {
        const rate = await Rate.findOne({ item: med._id });
        if (rate) {
          rate.rates.push({
            batchNumber: item.batchNumber,
            quantity: item.quantity,
            free: item.free,
            purchaseRate: item.purchaseRate,
            mrp: item.mrp,
            gst: String(Number(item.gst) * 2),
            discount: item.discount,
          })

          await rate.save();

        }
        else if (!rate) {
          const rate = new Rate({
            item: med._id,
            rates: [
              {
                batchNumber: item.batchNumber,
                quantity: item.quantity,
                free: item.free,
                purchaseRate: item.purchaseRate,
                mrp: item.mrp,
                gst: String(Number(item.gst) * 2),
                discount: item.discount,
              }
            ]
          })

          await rate.save();

        }
      }
    })

    await Promise.all(promises);

  }
  catch (err) {

  }
}

export {
  formPurchaseObject,
  addItemsToDB,
  addRatesToItems
}
