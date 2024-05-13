import pdfKit from "pdfkit"
import fs from "fs";

if(process.argv[2] === "recieving_page"){
  
  const doc = new pdfKit();
  const stream = fs.createWriteStream('./recieving_page.pdf');
  doc.pipe(stream)

  const date = new Date();
  const askingDateinMs = new Date(date.getTime()+(7*24*60*60*1000))
  const askingDate = `${askingDateinMs.getDate()}-${askingDateinMs.getMonth()}-${askingDateinMs.getFullYear()}`
  const dueDateinMs = new Date(date.getTime()+(15*24*60*60*1000))
  const dueDate = `${dueDateinMs.getDate()}-${dueDateinMs.getMonth()}-${dueDateinMs.getFullYear()}`

  const content = `You recieved the goods on ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}\n\nEmployees from our side will start contacting you for payment from ${askingDate} \n\nYour bill due date will be on ${dueDate}\n\n\n`
  let i=0;
  while(i<11){
    doc.text(content)
    // remaining_space -= doc.currentLineHeight();
    
    doc.moveDown()
    i+=1
  }

  console.log("pdf created successfully!");
  doc.end();

}