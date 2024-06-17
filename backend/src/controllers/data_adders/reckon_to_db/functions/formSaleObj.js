const formSaleObj = async (array) => {
  try {
    const arr = [];
    let bill = {};
    let date = '';
    array.map((entry, index) => {
      const entryNo = Number(entry['Entry No'].slice(2));

      if (entry['EntryDate'].split("/").length > 2) {
        date = entry['EntryDate'];
      }

      if (entryNo > 0 && index !== 0) {
        arr.push(bill);
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
        ]
      }
      else if (entryNo === 0 && ((entry['ItemCd'] && entry['ItemCd'].length !== 0) || (entry['ItemName'] && entry['ItemName'].length !== 0) || (entry['Packing'] && entry['Packing'].length !== 0) || (entry['Company'] && entry['Company'].length !== 0))) {
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

    })
  }
  catch (err) {
    console.log("Error from formSaleObj: ", err.message)
  }
}