// party_item_history

export const htmlContent = (array) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: 'Courier New', Courier, monospace;
        width: 100%;
        margin: 0;
        padding: 0;
      }

      .heading {
        background: #dbffcb;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 250px;
        box-shadow: 1px 1px 5px black;
        position: relative;
        font-size:1.1rem;
      }

      .heading h1 {
        font-size: 2rem;
        position: relative;
        margin: 0 auto;
        text-align: center;
        width: fit-content;
      }


      .address, .contact-info, .account-details {
        position: absolute;
        font-weight: bold;
        line-height: 1.1;
      }

      .address {
        left: 20px;
        top: 30px;
      }

      .contact-info {
        left: 450px;
        top: 30px;
      }

      .account-details {
        left: 850px;
        top: 30px;
      }

      .contact-info p:first-child,
      .account-details p:first-child {
        font-size: 1.1rem;
        margin-bottom: 8px;
      }

      .table-container {
        padding: 20px;
      }

      .table-container h1 {
        font-size: 1.5rem;
        margin-bottom: 20px;
        text-align: center;
      }

      table {
        width: calc(100% - 40px);
        margin: 0 auto;
        border-collapse: collapse;
        font-size: 1rem;
        font-weight: bold;
      }

      thead tr {
        background: green;
        color: white;
        font-weight: bold;
      }

      tbody tr:nth-child(even) {
        background: #dbffcb;
      }

      td, th {
        padding: 10px;
        word-wrap: break-word;
        text-align: left;
        border: 1px solid #333;
      }

    </style>
  </head>
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
        <p>Contacts</p>
        <p>+91 9984191620</p>
        <p>+91 7705037757</p>
        <p>0522-4063725</p>
        <p>sunnyagencies1990@gmail.com</p>
      </div>
      <div class="account-details">
        <p>Account Details</p>
        <p>UPI ID: 9235686101@ybl</p>
        <p>Account Number: 50200011565440</p>
        <p>IFSC CODE: HDFC0000723</p>
      </div>
    </div>

    <div class="table-container">
      <h1>**List only for ${array.partyName}</h1>
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
          ${array.items?.map((item, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${item?.itemDetails?.itemName || ''}</td>
              <td>${item?.deal || '____'}</td>
              <td>${item?.discount || '__'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </body>
  </html>
  `;
};
