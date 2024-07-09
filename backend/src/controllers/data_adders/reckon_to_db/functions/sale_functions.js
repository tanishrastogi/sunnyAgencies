import { Bill } from "../../../../models/bill.model.js";
import { Item } from "../../../../models/item.model.js";
import { Party } from "../../../../models/party.model.js";

const formSaleObj = function (array) {
  try {
    const arr = [];
    let bill = {};
    let date = '';
    // let previousBillNumber = ''
    array.map((entry, index) => {
      const entryNo = Number(entry['Entry No'].slice(2));

      // if (index > 0 && Number(array[index - 1]['Entry No'].slice(2)) !== 0) {
      //   previousBillNumber = Number(array[index - 1]['Entry No'].slice(2));
      // }


      if (entry['EntryDate'].split("/").length > 2) {
        date = entry['EntryDate'];
      }

      if (entryNo > 0 && index !== 0) {

        bill['totalAmount'] = array[index - 1]['Net Amt'];
        arr.push(bill);
        // items = [...items, ...bill['items']]
        bill = {};
      }

      if (entryNo > 0) {
        bill['billNumber'] = entry['Entry No'];
        bill['payType'] = entry['Pay Type'];
        bill['partyCode'] = entry['AccCod'];
        bill['partyName'] = entry['AccHead'];
        bill['mobile'] = entry['Phone'];
        bill['gstNumber'] = entry['GST No'];
        bill['billDate'] = date;
        bill['salesMan'] = entry['S.MAN'];

        bill['items'] = [
          {
            itemCode: entry['ItemCd'],
            itemName: entry['ItemName'],
            packing: entry['Packing'],
            company: entry['Company'],
            batchNumber: entry['BatchNo'],
            quantity: entry['Qty'],
            free: entry['Deal'],
            mrp: entry['MRP'],
            gst: entry['CGST%'],
            discount: entry['Disc%']
          }
        ];

        // billNumber = entryNo;
        // console.log(bill)

      }

      else if ((entryNo === 0) && ((entry['ItemCd'] && entry['ItemCd'].length !== 0) || (entry['ItemName'] && entry['ItemName'].length !== 0) || (entry['Packing'] && entry['Packing'].length !== 0) || (entry['Company'] && entry['Company'].length !== 0))) {
        bill['items']?.push(
          {
            itemCode: entry['ItemCd'],
            itemName: entry['ItemName'],
            packing: entry['Packing'],
            company: entry['Company'],
            batchNumber: entry['BatchNo'],
            quantity: entry['Qty'],
            free: entry['Deal'],
            mrp: entry['MRP'],
            gst: entry['CGST%'],
            discount: entry['Disc%']
          }
        )
      }

      if (arr.length > 1) {
        let lastBillNo = arr[arr.length - 1]?.billNumber;
        let secondLastBillNo = arr[arr.length - 2]?.billNumber;
        let lastBill = arr[arr.length - 1]
        let secondlastBill = arr[arr.length - 2]
        if (lastBillNo === secondLastBillNo) {

          arr.pop();
          const items = [
            ...lastBill?.items,
            ...secondlastBill?.items
          ];

          arr[arr.length - 1]['items'] = items;

        }
      }



    })


    // if (type === 'items') {
    //   return items
    // }
    // else if (type === 'bills') {
    //   return arr
    // }
    return arr;
  }
  catch (err) {
    console.log("Error from formSaleObj: ", err)
  }
}


const addSaleToDatabase = async (array) => {
  try {
    const partiesNotFound = [];
    const itemsNotFound = [];

    const promises = array.map(async (bill) => {
      // console.log(bill.billNumber);

      const party_check = await Party.findOne({ partyCode: bill.partyCode });
      const bill_check = await Bill.findOne({ billNumber: bill.billNumber, billDate: bill.billDate, totalAmount: bill.totalAmount })

      if (!party_check) {

        const searchParty = await Party.find({
          "$or": [
            { partyCode: { $regex: bill.partyCode } }
          ] 
        });

        if (searchParty === null || searchParty.length === 0) {
          const newParty = new Party({
            partyName: bill.partyName,
            partyCode: bill.partyCode,
            details: {
              gstNumber: bill.gstNumber,
              mobile: [bill.mobile]
            }
          });

          await newParty.save();

          party = newParty
        }

        else if (searchParty.length === 1) {
          bill.partyCode = searchParty[0].partyCode
        }


      }

      const party = await Party.findOne({ partyCode: bill.partyCode });
      if (!party) {
        partiesNotFound.push({ partyCode: bill.partyCode, billnumber: bill.billNumber });
        return;
      }

      if (bill_check) {
        return;
      }

      const items = [];
      const subPromises = bill.items.map(async (item) => {
        const billItem = await Item.findOne({ itemCode: item.itemCode })

        if (!billItem) {
          itemsNotFound.push(item.itemCode);
          return;
        }

        items.push({

          item: billItem._id,
          itemCode: item.itemCode,
          discount: item.discount,
          batchNumber: item.batchNumber,
          quantity: item.quantity,
          free: item.free

        });
        
      })
      
      await Promise.all(subPromises);

      if (party._id === null || party._id === undefined) {
        console.log(bill.billNumber)
        return;
      }

      const billAdded = new Bill({
        party: party?._id,
        partyCode: bill.partyCode,
        billNumber: bill.billNumber,
        billDate: bill.billDate,
        paymentMethod: bill.payType,
        items,
        totalAmount: bill.totalAmount
      });

      await billAdded.save();

      if (bill.payType === 'Credit') {
        await Party.findByIdAndUpdate(party._id, { $push: { bills: billAdded._id } })
      }

    })

    await Promise.all(promises);

    return { partiesNotFound, itemsNotFound }

  }
  catch (err) {
    console.log(err)
  }
}

export {
  formSaleObj,
  addSaleToDatabase
};