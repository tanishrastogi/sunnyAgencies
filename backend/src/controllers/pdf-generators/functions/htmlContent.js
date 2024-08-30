// party_item_history 


export const htmlContent = (array) => {
  return `
  <style>
    body{
      transform:scale(0.6);
    }
    table{
        margin:50px 20px;
        padding:20px;
        // background:red;
        width:920px;
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
        page-break-inside:avoid;
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

  </style>
  <div>
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
    ${
      array.items?.map((item, index) => {
      return `<tr>
          <td>${index + 1}</td>
          <td>${item?.itemDetails?.itemName}</td>
          <td>${item?.deal?item.deal:"-"}</td>
          <td>${item?.discount?item.discount:"-"}</td>
        </tr>`
      }) 
    }
    </tbody>
  </table>
  </div>
  `

}