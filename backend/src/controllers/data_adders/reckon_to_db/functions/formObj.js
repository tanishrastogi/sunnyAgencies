

// this function is to convert the objects recieved from the purchase report , into objects suitable for adding into the db.


const formPurchaseObject =  (obj) => {
  try {

    const arr = []

    let purchase = {}
    let lastPurchaseNumberIndex = 0
    obj.forEach((entry, index) => {
      const entryNo = Number(entry['Entry No'].slice(2));
      if (entryNo > 0 && index !== 0 && Number(obj[lastPurchaseNumberIndex]['Entry No'].slice(2))!==entryNo) {
        // console.log(purchase)
        arr.push(purchase);
        purchase = {};
        lastPurchaseNumberIndex = index;
      }

      if (entryNo > 0) {
        purchase['entryNo'] = entry['Entry No'];
        purchase['partyCode'] = entry['AccCod'];
        purchase['billNo'] = entry['Bill No']
        purchase['billDate'] = entry['Bill Dt']
        purchase['items'] = [
          {
            itemCode:entry['ItemCd'],
            itemName:entry['ItemName'],
            packing:entry['Packing'],
            company:entry['Company'],
            batchNumber:entry['BatchNo'],
            quantity:entry['Qty'],
            purchaseRate:entry['NpRt(Inc'],
            mrp:entry['MRP'],
            gst:entry['CGST%'],
            discount:entry['Disc%']
          }
        ];  
        // console.log(purchase)
      }
      else if(entryNo===0){
        purchase['items'].push({
          itemCode:entry['ItemCd'],
          itemName:entry['ItemName'],
          packing:entry['Packing'],
          company:entry['Company'],
          batchNumber:entry['BatchNo'],
          quantity:entry['Qty'],
          purchaseRate:entry['NpRt(Inc'],
          mrp:entry['MRP'],
          gst:entry['CGST%'],
          discount:entry['Disc%']
        })
      }

    })
    // console.log(arr)
    return arr
  }
  catch (err) {
    console.log(err);
  }
}

export { formPurchaseObject }
