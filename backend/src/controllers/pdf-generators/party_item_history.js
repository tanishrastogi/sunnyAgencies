import mongoose from "mongoose";
import { Bill } from "../../models/bill.model.js";
import { Party } from "../../models/party.model.js";
import { handleErr } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import pdf from "html-pdf";
import path from "path";
import { htmlContent } from "./functions/htmlContent.js";
import { fileURLToPath } from "url";
import { ist_to_utc } from "../../utils/date_functions.js";
import { transporter } from "../../utils/transporter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PartyItemHistory = async (req, res) => {
  try {
    const { partyID, email } = req.body;
    if (!partyID) return res.json(new ApiResponse(404, null, "Party Id not specified."));

    const party = await Party.findById(partyID);
    if (!party) return res.json(new ApiResponse(404, "Party not found."));

    const startDate = new Date(ist_to_utc("2024-04-01T00:00:00.000Z"));
    const endDate = new Date(ist_to_utc("2024-07-01T00:00:00.000Z"));

    const result = await Bill.aggregate([
      {
        $match: {
          party: new mongoose.Types.ObjectId(partyID),
          billDate: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $unwind: "$items"
      },
      {
        $group: {
          _id: "$items.item",
          totalQuantity: { $sum: { $toDouble: "$items.quantity" } }
        }
      },
      {
        $lookup: {
          from: "items",
          localField: "_id",
          foreignField: "_id",
          as: "itemDetails"
        }
      },
      {
        $unwind: "$itemDetails"
      },
      {
        $project: {
          _id: 0,
          itemId: "$_id",
          itemName: "$itemDetails.name",
          totalQuantity: 1,
          itemDetails: 1
        }
      },
      {
        $sort: {
          totalQuantity: -1
        }
      }
    ]);

    const resultWithPartyName = {
      partyName: party.partyName,
      items: [...result]
    };

    const filePath = path.join(__dirname, "output1.pdf");

    // pdf.create(htmlContent(resultWithPartyName), { format: 'A4' }).toFile(filePath, (err, pdfResponse) => {
    //   if (err) {
    //     console.log("PDF creation error:", err);
    //     return res.status(500).send("Error generating PDF");
    //   }

    //   console.log("PDF generated successfully at:", filePath);

    //   const mailOptions = {
    //     from: process.env.AUTH_EMAIL,
    //     to: email,
    //     subject: `Item History of ${party.partyName}`,
    //     text: `Please find the attached PDF for the item history of ${party.partyName}.`,
    //     attachments: [
    //       {
    //         filename: `any_requirements?@${party.partyName}.pdf`,
    //         path: filePath // Correctly attach the generated PDF
    //       }
    //     ]
    //   };

    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       console.log("Error sending email:", error);
    //       return res.status(500).send("Error sending email");
    //     }
    //     console.log('Email sent: ' + info.response);
    //     return res.status(200).send('Email with PDF sent successfully');
    //   });
    // });

    return res.json(new ApiResponse(200, resultWithPartyName, "Fetched successfully"));

  } catch (err) {
    return handleErr(res, err);
  }
};


const createAndSendPartyItemHistoryPDF = async(req,res)=>{
  try{
    const {data, email}= req.body;
    // console.log(data);
    const filePath = path.join(__dirname, "output1.pdf");

    const config = {
      "format": "A4",
      "orientation": "portrait",
      "dpi": 200,
      "quality": 80,
      "border": {
        "left": "1cm",
        "right": "1cm",
        "top": "1cm",
        "bottom": "1cm"
      },
      "header": {
        "height": "10mm"
      },
      "footer": {
        "height": "10mm"
      }
  }

    pdf.create(htmlContent(data), config).toBuffer((err, buffer) => {
      if (err) {
        console.error('Error generating PDF:', err);
        return res.status(500).send('Error generating PDF');
      }

      // Email options
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: `Item History of ${data.partyName}`,
        text: `Please find the attached PDF for the item history of ${data.partyName}.`,
        attachments: [
          {
            filename: `${data.partyName}_item_history.pdf`,
            content: buffer,
            contentType: 'application/pdf'
          }
        ]
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
          return res.status(500).send("Error sending email");
        }
      });
    });

    return res.json(new ApiResponse(200, null, "pdf sent successfully."));

  }
  catch(err){
    return handleErr(res,err);
  }
}

export {
  PartyItemHistory,
  createAndSendPartyItemHistoryPDF
};
