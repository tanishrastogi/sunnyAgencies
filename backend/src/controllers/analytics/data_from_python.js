import fetch from "node-fetch";
import { ItemSale } from "../../models/sale.model.js";
import { ApiError } from "../../utils/apiError.js";


// ---------> Fetching data from Python <----------
// ---------> report used: item salewise report <----------

const add_item = async (req, res) => {
    const data = await fetch("http://127.0.0.1:5000/py/getData", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })

    const sale_data = JSON.parse(await data.json())

    const keys = Object.keys(sale_data);


    keys.forEach(async (key, index) => {

        // sample key

        // "2": {
        //     "2017": {
        //         "July": {
        //             "total_sale": 525
        //         },
        //         "August": {
        //             "total_sale": 200
        //         },
        //         "September": {
        //             "total_sale": 575
        //         },
        //         "October": {
        //             "total_sale": 425
        //         }
        //     },
        //     "2018": {
        //         "April": {
        //             "total_sale": 100
        //         },
        //         "May": {
        //             "total_sale": 200
        //         },
        //         "June": {
        //             "total_sale": 299
        //         },
        //         "July": {
        //             "total_sale": 1
        //         },
        //         "August": {
        //             "total_sale": 25
        //         },
        //         "September": {
        //             "total_sale": 255
        //         },
        //         "October": {
        //             "total_sale": 320
        //         },
        //         "November": {
        //             "total_sale": 50
        //         },
        //         "December": {
        //             "total_sale": 25
        //         }
        //     },
        //     "2019": {
        //         "January": {
        //             "total_sale": 125
        //         },
        //         "February": {
        //             "total_sale": 125
        //         },
        //         "March": {
        //             "total_sale": 150
        //         },
        //         "April": {
        //             "total_sale": 50
        //         },
        //         "May": {
        //             "total_sale": 225
        //         },
        //         "June": {
        //             "total_sale": 275
        //         },
        //         "July": {
        //             "total_sale": 375
        //         },
        //         "August": {
        //             "total_sale": 100
        //         }
        //     },
        //     "item_name": "AMPILOX-VAIL-500"
        // }

        const existing = await ItemSale.findOne({ itemCode: key })

        // {
        //     "itemCode": "55",
        //     "itemName": "NIXODERM 10GR",
        //     "item_sale_data": [],
        //     "__v": 2
        // }

        if (!existing) {
            const new_item = new ItemSale({
                itemCode: key,
                itemName: sale_data[key]['item_name']

            })
            await new_item.save();
        }
        // else if (existing.item_sale_data.length > 0) {
        //     console.log("hello world")
        // }
        else {

            const year_keys = Object.keys(sale_data[key]);
            const obj = {}
            // console.log(existing)
            let sale_array = []
            year_keys.forEach(async (year) => {
                if(!existing['item_sale_data'][year]){

                    if (year !== 'item_name') {
                        // console.log(typeof(sale_data[key][year]));
                        obj[year] = sale_data[key][year]
                        existing.item_sale_data = existing.item_sale_data.concat({
                            year: year,
                            monthly_sale: sale_data[key][year]
                        })
                        
                        
                        const month_name = Object.keys(sale_data[key][year])
                        
                        for (let i = 0; i < month_name.length; i++) {
                            sale_array.push(sale_data[key][year][month_name[i]]['total_sale'])
                        }
                        
                        sale_array.sort(function (a, b) {
                        return b - a;
                    })
                    // console.log(sale_array , sale_data[key][year])
                    
                    sale_array.forEach((value) => {
                        for (let i = 0; i < month_name.length; i++) {
                            if (sale_data[key][year][month_name[i]]['total_sale'] == value) {
                                const index = existing['item_sale_data'].findIndex((item) => {
                                    return item['year'] === year
                                })
                                
                                if (index !== -1) {
                                    const obj = {
                                        month_name: month_name[i],
                                        sale: value
                                    }
                                    // console.log(existing['item_sale_data'][index]['peak_sale_month'])
                                    existing['item_sale_data'][index]['peak_sale_month'].push({
                                        month_name: month_name[i],
                                        sale: value
                                    })
                                    // console.log(obj)
                                }
                                else {
                                    throw new ApiError(404, "Year not found")
                                }
                                break;
                            }
                            else {
                                // console.log("error")
                            }
                        }
                    })
                    sale_array = []
                    
                }
                
            }
        })
            
            

            await existing.save()

        }
    })

    res.json(sale_data)

}




export { add_item }