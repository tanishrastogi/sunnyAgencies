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

      if (entryNo > 0 && index !== 0 ) {
        arr.push(bill);
        // items = [...items, ...bill['items']]
        if(entryNo===4){
          console.log(bill['items'].length)
        }
        bill = {};
      }

      if (entryNo > 0) {
        bill['billNumber'] = entry['Entry No'];
        bill['partyCode'] = entry['AccCod'];
        bill['billDate'] = date;
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

      if (arr.length>1) {
        let lastBillNo = arr[arr.length - 1]?.billNumber;
        let secondLastBillNo = arr[arr.length - 2]?.billNumber;
        let lastBill = arr[arr.length - 1]
        let secondlastBill = arr[arr.length - 2]
        console.log(lastBillNo, secondLastBillNo)
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

export { formSaleObj };