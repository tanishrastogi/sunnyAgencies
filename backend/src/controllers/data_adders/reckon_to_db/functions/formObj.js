// this function is to convert the objects recieved from the purchase report , into objects suitable for adding into the db.

import { Item } from "../../../../models/item.model.js";
import { Rate } from "../../../../models/rate.model.js";
import { Purchase } from "../../../../models/purchase.model.js";
import { Party } from "../../../../models/party.model.js";


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
            purchaseNumber: entry['Entry No'],
            purchasingParty: entry['AccCod'],
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
          purchaseNumber: entry['Entry No'],
          purchasingParty: entry['AccCod'],
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

      console.log(item)
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

const addPurchaseToDB = async (obj) => {
  try {

    console.log(obj)

    const promises = obj.map(async (purchase) => {

      // check if purchase is already added
      // if yes: ignore
      // if no: 
      // 1. add purchase
      // a) check if party exists or not , if yes, add the purchase id to the party purchases
      // b) while adding check if item exists or not , if yes, add the item id to the purchase 
      // c) if item exists , add the rate to the item 


      // checking if purchase exists or not
      const pur = await Purchase.findOne({ billNo: purchase.entryNo, billDate: purchase.billDate, partyCode: purchase.partyCode });

      console.log(pur);
      // if purchase does not exists add it to the db
      if (!pur) {

        const purc = new Purchase({
          billNo: purchase.entryNo,
          billDate: purchase.billDate,
          invoiceNo: purchase.billNo,
          partyCode: purchase.partyCode
        });

        // add the purchase id to the party and party id to the purchase.
        const party = await Party.findOne({ partyCode: purchase.partyCode });

        party.purchases.push(purc._id);
        purc.party = party._id;

        await party.save();


        // add items to purchase
        const itemIdArray = [];

        const promises = purchase.items.map(async (med) => {
          const item = await Item.findOne({ itemCode: med.itemCode });
          if (item) {
            itemIdArray.push(item._id);
            const rate = await Rate.findOne({ item: item._id });
            if (rate) {
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
          }
        })

        await Promise.all(promises)

        purc.items = itemIdArray;

        await purc.save();

      }



    })

    await Promise.all(promises)

    const purchases = await Purchase.find({}).populate('items');

    return purchases

  }
  catch (err) {
    console.log(err);
  }
}

export {
  formPurchaseObject,
  addItemsToDB,
  addPurchaseToDB
}
