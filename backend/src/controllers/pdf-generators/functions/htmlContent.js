// party_item_history 


export const htmlContent = (array) => {
  return `
  <style>

    .heading{
        background: #dbffcb;
        min-width:842px;
        display:flex;
        justify-content:center;
        align-items:center;
        height: 200px;
        box-shadow:1px 1px 5px black;
        position:relative;
        margin:0;
        padding:0;
        left:-10px;
        top:-10px;
      }

      body{
        font-family: 'Courier New', Courier, monospace;
        width:100%;
      }

      .heading h1{
        display:block;
        max-width:min-content;
        margin:15px;
        font-size:2rem;
      }

    table{
        margin:50px 20px;
        padding:20px;
        // background:red;
        min-width:820px;
        font-size:1rem;
      }
      .header, .message{
        margin:20px;
        font-size:1rem;
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
        text-align:left;
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

      .address p:nth-child(4){
        top:100px;
      }

      .address p:nth-child(5){
        top:120px;
      }

      .account-details p{
        position:absolute;
        margin:20px;
        font-weight:bold;
      }

      .table-container h1{

      }

  </style>
  <body>
  <div class="heading">
        <h1>Sunny Agencies</h1>
        <div class="address">
          <p>LG-30/31, NEW MEDICINE MARKET</p>
          <p>G.B. MARG, LUCKNOW 226018</p>
          <p>GST NUMBER: 09ACQPR5086H1ZU</p>
          <p>D.L No1.: UP3220B002233</p>
          <p>D.L No2.: UP3221B002225</p>
        </div>
        <div class="contact-info">
          <p style="top:5px; left:350px; font-size:1.4rem;">Contacts</p>
          <p style="top:40px; left:350px;">+91 9984191620</p>
          <p style="top:60px; left:350px;">+91 7705037757</p>
          <p style="top:80px; left:350px;">0522-4063725</p>
          <p style="top:100px; left:350px;">sunnyagencies1990@gmail.com</p>
        </div>
        <div class="account-details">
          <p style="top:5px; left:650px; font-size:1.4rem;">Account Details</p>
          <p style="top:40px; left:650px;">UPI ID: 9235686101@ybl</p>
          <p style="top:60px; left:650px;">Account Number: 50200011565440</p>
          <p style="top:80px; left:650px;">IFSC CODE: HDFC0000723</p>
        </div>
    </div>
  <div class="table-container">
  <h1>${array.partyName}</h1>
  <table>
    <thead>
      <tr>
        <th>S.No</th>
        <th>Item Name</th>
        <th>Deal</th>
        <th>Discount</th>
      </tr>
    </thead>
    <tbody>
    ${array.items?.map((item, index) => 
     `<tr>
          <td>${index + 1}</td>
          <td>${item?.itemDetails?.itemName}</td>
          <td style="color:'black'">${item?.deal ? item.deal : "____"}</td>
          <td style="color:'black'">${item?.discount ? item.discount : "__"}</td>
        </tr>`
  ).join('')}
    </tbody>
  </table>
  </div>
  </body>
  `

}