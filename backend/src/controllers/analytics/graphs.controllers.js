import { ItemSale } from "../../models/sale.model.js"
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ChartJSNodeCanvas } from "chartjs-node-canvas"
import fs from "fs"


const barGraph = async (req, res) => {
    const { itemCode, year, file_create } = req.body
    // console.log(req.body)

    try {
        if(!itemCode || !year) return res.json(new ApiResponse(400 , "fill all the details"))

        if (typeof (year) === 'object') {
            
        }
        else if (typeof (year) === 'undefined') {
            throw new ApiError(400, 'year not specified');
        }
        else {
            const sale = await ItemSale.findOne({ itemCode });

            const index = sale['item_sale_data'].findIndex((item) => {
                return item['year'] === year
            })

            if (index === -1) {
                // res.json({message:"no sale in the given year"})
                return res.json(new ApiResponse(404, "no sale in the given year"))
            }
            const year_total_sale = 0

            const keys = Object.keys(sale['item_sale_data'][index]['monthly_sale'])
            const month_array = []
            const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const obj = {}

            month_names.forEach((name) => {
                // console.log(sale['item_sale_data'][index]['monthly_sale'][name]['total_sale'])
                month_array.push(sale['item_sale_data'][index]['monthly_sale'][name]['total_sale'])
            })

            // keys.forEach((key, i) => {
            //     console.log(month_names[i] , key);



            //     // month_array.push(key[month_names[i]]['total_sale']);

            // })

            const data = {
                labels: month_names,
                datasets: [{
                    label: sale['itemName'],
                    data: month_array,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color of bars
                    borderColor: 'rgba(75, 192, 192, 1)', // Border color of bars
                    borderWidth: 1 // Border width of bars
                }]
            };

            const chartNode = new ChartJSNodeCanvas({ width: 400, height: 200 });

            const imageGenerator = async () => {

                const options = {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                };

                const imageBuffer = await chartNode.renderToBuffer({
                    type: 'bar',
                    data: data,
                    options: options
                });

                if (file_create) {
                    fs.writeFileSync('barGraph.png', imageBuffer);
                }

                res.contentType("image/png")
                res.send(imageBuffer);

            }

            await imageGenerator();
        }
    }
    catch (err) {
        console.log(err);
        res.json(new ApiError(400 , err.message))
    }
}

export { barGraph }