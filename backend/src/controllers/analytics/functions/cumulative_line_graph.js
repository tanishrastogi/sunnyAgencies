const formData = (year)=>{
  try{
    const result = await Bill.aggregate([
        // Filter bills within the specified date range
        {
          $match: {
            billDate: { $gte: startDate, $lte: endDate }
          }
        },
        // Add a field to represent the custom interval (1st, 15th, 30th of the month)
        {
          $addFields: {
            intervalStart: {
              $switch: {
                branches: [
                  { case: { $lte: [{ $dayOfMonth: "$billDate" }, 15] }, then: { $dateFromParts: { year: { $year: "$billDate" }, month: { $month: "$billDate" }, day: 15 } } },
                  { case: { $gt: [{ $dayOfMonth: "$billDate" }, 15] }, then: { $dateFromParts: { year: { $year: "$billDate" }, month: { $month: "$billDate" }, day: { $cond: [{ $lte: [{ $dayOfMonth: "$billDate" }, 30] }, 30, 1] } } } }
                ],
                default: "$billDate"
              }
            }
          }
        },
        // Group by the custom interval and sum the totalAmount
        {
          $group: {
            _id: "$intervalStart",
            totalSales: { $sum: "$totalAmount" },
            billNumbers: { $push: "$billNumber" }
          }
        },
        // Sort by the interval
        {
          $sort: { _id: 1 }
        },
        // Calculate cumulative sales
        {
          $group: {
            _id: null,
            data: {
              $push: {
                intervalStart: "$_id",
                totalSales: "$totalSales",
                billNumbers: "$billNumbers"
              }
            }
          }
        },
        {
          $unwind: "$data"
        },
        {
          $setWindowFields: {
            partitionBy: null,
            sortBy: { "data.intervalStart": 1 },
            output: {
              cumulativeSales: {
                $sum: "$data.totalSales",
                window: {
                  documents: ["unbounded", "current"]
                }
              },
              cumulativeBills: {
                $push: "$data.billNumbers",
                window: {
                  documents: ["unbounded", "current"]
                }
              }
            }
          }
        },
        // Project the final output
        {
          $project: {
            _id: 0,
            intervalStart: "$data.intervalStart",
            totalSales: "$data.totalSales",
            cumulativeSales: "$cumulativeSales",
            billNumbers: "$data.billNumbers",
            cumulativeBills: "$cumulativeBills"
          }
        }
      ]);
  
      // console.log(result);
  
      // Calculate cumulative sales
      let cumulativeSales = 0;
      const cumulativeSalesData = result.map(({ date, totalSales, billNumbers }) => {
        cumulativeSales += totalSales;
        return {  cumulativeSales };
      });
  
      console.log("Cumulative Sales Data:", cumulativeSalesData);
      return cumulativeSalesData;
  }
  catch(err){

  }
}