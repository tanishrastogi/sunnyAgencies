import { api_for_pdf } from "./api";

const mrOutstandingPDF = async (payload) => {
  try {

    const billDetails = [...payload.boxes]
    const obj = {
      billDetails,
      ...payload.mrDetails,
    }

    const { mrName, mrEmail, customMessage } = payload.mrDetails

    const formattedMessage = customMessage
      .split('\n')
      .map((line) => `<p>${line}</p>`)
      .join('');

    console.log(payload.mrDetails.mrName)
    const htmlContent = `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>

    <style>
      body{
        font-family: 'Courier New', Courier, monospace;
        width:100%;
        }
        
      .heading{
        background: #dbffcb;
        min-width:1240px;
        display:flex;
        justify-content:center;
        align-items:center;
        height: 200px;
        box-shadow:1px 1px 5px black;
        position:absolute;
        top:0;
        left:0;
      }

      .heading h1{
        display:block;
        max-width:min-content;
        margin:20px;
      }

      table{
        margin:50px 20px;
        padding:20px;
        // background:red;
        min-width:900px;
        font-size:1.2rem;
      }
      .header, .message{
        margin:20px;
        font-size:1.2rem;
      }

      tr{
        padding:20px;
        margin:20px;
        text-align:center;
      }

      thead tr{
        font-weight:bold;
      }

      thead tr:nth-child(1){
        background:green;
        color:white;
      }

      tbody tr:nth-child(even){
        background: #dbffcb;
      }

      td, th{
        margin:20px;
        padding:20px;
        word-wrap: break-word;
      }

      .address p, .contact-info p{
        position:absolute;
        margin:20px;
        font-weight:bold;
      }

      .address p:nth-child(1){
        top:40px;
      }
       
      .address p:nth-child(2){
        top:60px;
      }

      .address p:nth-child(3){
        top:80px;
      }

      .mr-details{
        position:absolute;
        top:220px;
        // left:350px;
      }
        

    </style>
    <body>
      <div class="heading">
        <h1>Sunny Agencies</h1>
        <div class="address">
          <p>LG-30/31, NEW MEDICINE MARKET</p>
          <p>G.B. MARG, LUCKNOW 226018</p>
          <p>GST NUMBER: 09ACQPR5086H1ZU</p>
        </div>
        <div class="contact-info">
          <p style="top:5px; left:400px; font-size:1.4rem;">Contacts</p>
          <p style="top:40px; left:400px;">+91 9984191620</p>
          <p style="top:60px; left:400px;">+91 7705037757</p>
          <p style="top:80px; left:400px;">0522-4063725</p>
          <p style="top:100px; left:400px;">sunitmuskan@gmail.com</p>
        </div>
      </div>
      <div class="mr-details">
        <div class="header"><span style="font-weight:bold">MR Name:</span> ${mrName}</div>
        <div class="header"><span style="font-weight:bold">MR Email:</span> ${mrEmail}</div>
        <div class="message"><span style="font-weight:bold">Message:</span> ${formattedMessage}</div>
        <table style="border:1px solid black;">
          <thead>
            <tr>
              <th style="background:white;"></th>
              <th>Party Name</th>
              <th>Bill Number</th>
              <th>Bill Date</th>
              <th>Bill Amount</th>
            </tr>
          </thead>
          <tbody>
            ${billDetails.map((bill, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${bill.partyName}</td>
                <td>${bill.billNumber}</td>
                <td>${bill.billDate}</td>
                <td>${bill.billAmount} Rs</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

    </body>
  `;

    const data = await api_for_pdf.post('/pdf/create/mr-outstanding', { ...obj, htmlContent }, {
      responseType: 'blob'
    });


    console.log(data)
    return data;
  }
  catch (err) {
    console.log(err);
  }
}

export {
  mrOutstandingPDF

};