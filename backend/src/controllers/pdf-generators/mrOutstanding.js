import { handleErr } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
// import pdfjs from "pdfjs";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import pdf from "html-pdf";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createMrOutstandingPDF = async(req,res)=>{
  try{
    
    const {mrName, mrEmail, customMessage, billDetails, htmlContent} = req.body;

    // const pdfDoc = await PDFDocument.create();
    // const page = pdfDoc.addPage([600, 800]);
    // const { width, height } = page.getSize();
    // const fontSize = 12;
    // const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    // const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    // // Add MR Name and Email
    // page.drawText(`MR NAME: ${mrName}`, {
    //   x: 50,
    //   y: height - 4 * fontSize,
    //   size: fontSize,
    //   font: timesRomanFont,
    //   color: rgb(0, 0, 0),
    // });

    

    // page.drawText(`MR EMAIL: ${mrEmail}`, {
    //   x: 50,
    //   y: height - 6 * fontSize,
    //   size: fontSize,
    //   font: timesRomanFont,
    //   color: rgb(0, 0, 0),
    // });

    // // Add Custom Message
    // page.drawText(`MESSAGE: ${customMessage}`, {
    //   x: 50,
    //   y: height - 8 * fontSize,
    //   size: fontSize,
    //   font: timesRomanFont,
    //   color: rgb(0, 0, 0),
    // });

    // // Add Table Header
    // const headers = ['S.No', 'Party Name', 'Bill Number', 'Bill Date', 'Bill Amount'];
    // let yOffset = height - 12 * fontSize;

    // page.drawRectangle({
    //   x: 45,
    //   y: yOffset - fontSize,
    //   width: 500,
    //   height: 2.5 * fontSize,
    //   color: rgb(0, 0.9, 0), 
    // });

    // headers.forEach((header, i) => {
      
    //   page.drawText(header, {
    //     x: i===1?100:50 + i * 100,
    //     y: yOffset,
    //     size: fontSize,
    //     font: timesBoldFont,
    //     color: rgb(0, 0, 0),
    //   });
    // });

    // yOffset -= 3 * fontSize;

    // // Add Table Rows
    // billDetails.forEach((bill, index) => {

    //   if (index % 2 !== 0) {
    //     page.drawRectangle({
    //       x: 45,
    //       y: yOffset - fontSize,
    //       width: 500,
    //       height: 2.5 * fontSize,
    //       color: rgb(0.9, 1, 0.9), // light green background
    //     });
    //   }
    //   // console.log(index)
    //   page.drawText(`${index+1}`, {
    //     x: 50,
    //     y: yOffset,
    //     size: fontSize,
    //     font: timesRomanFont,
    //     color: rgb(0, 0, 0),
    //   });
    //   page.drawText(bill.partyName, {
    //     x: 100,
    //     y: yOffset,
    //     size: fontSize,
    //     font: timesRomanFont,
    //     color: rgb(0, 0, 0),
    //   });
    //   page.drawText(bill.billNumber, {
    //     x: 250,
    //     y: yOffset,
    //     size: fontSize,
    //     font: timesRomanFont,
    //     color: rgb(0, 0, 0),
    //   });
    //   page.drawText(bill.billDate, {
    //     x: 350,
    //     y: yOffset,
    //     size: fontSize,
    //     font: timesRomanFont,
    //     color: rgb(0, 0, 0),
    //   });
    //   page.drawText(bill.billAmount, {
    //     x: 450,
    //     y: yOffset,
    //     size: fontSize,
    //     font: timesRomanFont,
    //     color: rgb(0, 0, 0),
    //   });
    //   yOffset -= 3 * fontSize;
    // });

    // const pdfBytes = await pdfDoc.save();

    const filePath = path.join(__dirname, 'output.pdf');
    pdf.create(htmlContent, { format: 'A4' }).toFile(filePath, (err, response) => {
      if (err) return console.log(err);
      console.log('PDF generated successfully:', response);
      
      // Send the file to the frontend
      res.sendFile(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Could not send file');
        } else {
          console.log('File sent successfully');
        }
      });
    });

    fs.unlinkSync(filePath);

  }
  catch(err){
    return handleErr(res, err);
  }
}


export {
  createMrOutstandingPDF
}