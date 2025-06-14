import { Item } from "../../models/item.model.js";
import { ItemSale } from "../../models/sale_report.model.js"
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ChartJSNodeCanvas } from "chartjs-node-canvas"
import fs from "fs"
import { ist_to_utc } from "../../utils/date_functions.js";
import { Bill } from "../../models/bill.model.js";


const barGraph = async (req, res) => {
  const { itemCode, year, file_create } = req.body
  // console.log(req.body)

  try {
    if (!itemCode || !year) return res.json(new ApiResponse(400, "fill all the details"))

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
    res.json(new ApiError(400, err.message))
  }
}


const sale_cumulative_line_chart = async (req, res) => {
  try {
    
    
    const startDate = new Date(ist_to_utc("2024-04-01T00:00:00.000Z"));
    const endDate = new Date(ist_to_utc("2024-06-15T23:59:59.999Z"));

    // Ensure all bill amounts are properly converted to double
    // await Bill.updateMany(
    //   { billDate: { $gte: startDate, $lte: endDate } },
    //   [{ $set: { totalAmount: { $toDouble: "$totalAmount" } } }]
    // );


    const result = await Bill.aggregate([
      {
        $match: {
          billDate: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null, // Group all documents into a single group
          totalSales: { $sum: { $toDouble: "$totalAmount" } } // Sum the totalAmount field
        }
      }
    ]);

    console.log("result");


    // const countPipeline = [
    //   {
    //     $match: {
    //       billDate: { $gte: startDate, $lte: endDate }
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: null, // Group all documents into a single group
    //       totalSales: { $sum: "$totalAmount" }, // Sum the totalAmount field
    //       billNumbers: { $push: "$billNumber" }, // Collect all bill numbers
    //       count: { $sum: 1 } // Count the number of bills
    //     }
    //   }
    // ];

    // const count = await Bill.aggregate(countPipeline)


    console.log(result);
    // console.log(count[0].billNumbers[count[0].billNumbers.length-1])

    console.log("Total Sales in December 2023:", result[0]?.totalSales || 0);
    return result[0]?.totalSales || 0;
    
    
  }
  catch (err) {

  }
}

export { 
  barGraph,
  sale_cumulative_line_chart
}