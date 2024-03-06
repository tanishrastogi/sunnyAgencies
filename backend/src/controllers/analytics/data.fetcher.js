import { ItemSale } from "../../models/sale.model.js";
import { ApiError } from "../../utils/apiError.js";

const peak_sale_by_month = async (req, res) => {
    const { month, year } = req.body;

    try {
        const products = await ItemSale.find({})
        const toBeSent = []

        products.forEach((product) => {
            const index = product['item_sale_data'].findIndex((item) => {
                return item['year'] === year
            })
            if (index !== -1) {
                if (product['item_sale_data'][index]['peak_sale_month'][0]['month_name'] === month) {
                    toBeSent.push({
                        itemName: product['itemName'],
                        itemCode: product['itemCode'],
                        sale: product['item_sale_data'][index]['peak_sale_month'][0]['sale']
                    })
                }
            }
        })

        res.send(toBeSent);
    }
    catch (err) {
        console.log(err)
    }
}

const same_peak_every_year = async (req, res) => {
    const { month, accuracy } = req.body;
    // console.log(req.body)
    try {
        const products = await ItemSale.find({})
        const toBeSent = [];

        products.forEach((product) => {
            const total_attempts = product['item_sale_data'].length
            let wrong_attempts = 0
            let correct_attempts = 0
            let index = 0
            let sale = 0.0
            let avg_sale = 0
            let year_arr = []
            while (index <= total_attempts - 1) {
                // console.log(product)
                year_arr.push(product['item_sale_data'][index]['year'])
                if (total_attempts <= 1)
                    break;
                // console.log(product)
                if (product['item_sale_data'][index]['peak_sale_month'].length === 0) {
                    wrong_attempts += 1
                }
                else {

                    if (product['item_sale_data'][index]['peak_sale_month'][0]['month_name'] === month) {
                        correct_attempts += 1
                    }
                    else {
                        wrong_attempts += 1
                        year_arr.push()
                    }
                    sale += product['item_sale_data'][index]['peak_sale_month'][0]['sale']

                    index += 1
                }
            }

            const acc = (correct_attempts / total_attempts) * 100.0;
            if (acc >= accuracy) {
                toBeSent.push({
                    itemCode: product['itemCode'],
                    itemName: product['itemName'],
                    total_attempts: total_attempts,
                    correct_attempts,
                    years_checked:year_arr,
                    avg_sale_this_month: sale / total_attempts
                })
            }

        })

        res.send(toBeSent)
        // res.send(toBeSent.length+"")
    }
    catch (err) {
        console.log(err);
    }
}


export {
    peak_sale_by_month,
    same_peak_every_year
};
