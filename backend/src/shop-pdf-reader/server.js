import fs from "fs";
import { resolve } from "path";
import { PdfReader } from "pdfreader";

const xaxis = [];
function readPdf(pdfPath) {
    // Read the PDF file
    return new Promise((resolve, reject) => {
        const dataBuffer = fs.readFileSync(pdfPath);

        // Create a new PDFreader instance
        const tableRow = [];
        const rows = [];
        let row_no = 1;
        let y = 0;
        const row = {}
        let index = 0;
        const parties = [];
        new PdfReader().parseBuffer(dataBuffer, function (err, item) {
            if (err) throw err;
            let headings = ['hsn', 'item_name', 'packing', 'batch number', 'rate', 'mrp', 'qty', 'net rate', 'disc', 'amount', 'gst', 'expiry'];

            if (item) {
                // console.log(item['y'] , item['x'] , item['text'])
                // if(Math.floor(Number(item['y'])) === 4 && Math.floor(Number(item['x'])) === 1){
                //     // console.log(item["text"]);

                //     parties.push(item['text'].trim());                    
                // }
                if (item['y'] > 8.5 && item['y'] < 19) {
                    if (item['x'] < 33.557) {
                        // process.stdout.write(item['text'] + " ");
                        if (headings[index] == 'billNo') {
                            row[headings[index]] = row_no;
                        }
                        else {
                            row[headings[index]] = item['text'];

                        }
                        index = index + 1;
                    }
                    else {
                        // console.log(item['text'], row_no);
                        row[headings[11]] = item['text']
                        // console.log(row);
                        rows.push({ ...row });
                        index = 0;

                    }
                }
                const party_name = () => {
                    return

                }


            }
            else {
                // console.log(rows);
                resolve(rows)
                // resolve(parties);
            }
        })



    })


}


function givePartyNames(path) {
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync(path);
        const parties = [];
        const billNo = []
        const partyName = [];
        const no_of_items = [];
        // const partyObj = {};

        new PdfReader().parseBuffer(data, async function (err, item) {
            if (item) {
                // console.log(item['y'], item['x'] , item['w'], item['text'])
                // console.log(Number(item['y']).toFixed(1))

                if (Math.round(Number(item['y'])) === 4 && Math.round(Number(item['x'])) === 25) {
                    // console.log(item['text'].substring(2 , item['text'].trim().length))
                    billNo.push(item['text'].substring(2, item['text'].trim().length))
                }

                if (Math.floor(Number(item['y'])) === 4 && Math.floor(Number(item['x'])) === 1) {
                    partyName.push(item['text'].trim());
                }

                if (Math.round(Number(item['y'])) === 6 && Math.round(Number(item['x'])) === 25 && Math.round(Number(item['w'])) < 25) {
                    no_of_items.push(item['text'].trim());
                }


            }
            else {
                billNo.forEach((item, index) => {
                    const obj = {
                        inv_no: item,
                        party_name: partyName[index],
                        no_of_items: no_of_items[index],
                        items: []
                    }


                    const ind = parties.findIndex((item) => {
                        return item['inv_no'] === obj['inv_no'];
                    })
                    if (ind === -1) {
                        parties.push(obj);
                    }
                })
                const med_data = await readPdf(path);
                // console.log(med_data.length)
                let itemsAdded = 0;
                parties.forEach((item, index) => {
                    let i = itemsAdded; 
                    while(i>=itemsAdded && i<(itemsAdded + Number(item['no_of_items']))){
                        item['items'].push(med_data[i])
                        i++;
                    }
                    itemsAdded = itemsAdded + Number(item['no_of_items'])

                })
                console.log(itemsAdded)



                resolve(parties);
            }
        })


    })
}

function readBill(path) {
    
    return new Promise(async (resolve, reject) => {
        const data = await givePartyNames(path);
        // console.log(data);
        resolve(data)

        // const promise = await readPdf('./pdfs/rad0D7D2.pdf');``
        // console.log(promise) 
    })
    
    
}

// readBill('./pdfs/radC853A.pdf')

// console.log(promise)

export {readBill}


