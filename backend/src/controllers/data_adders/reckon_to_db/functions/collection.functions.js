import { Collection } from "../../../../models/collection.model.js";
import { Party } from "../../../../models/party.model.js";

const add_collections_to_db = async (arr) => {
  try {
    const parties_not_found = [];
    const promises = await arr.map(async (data, index) => {
      
      if(data['SrNo'].length>13) {
        return;
      }
      const record_check = await Collection.findOne({entryNumber:data["Entry No"] , entryDate:data['Date'], partyCode:data['Code']});
      // console.log(record_check);
      if(record_check){
        
        // console.log("Hello world");
        return ;
      }
      console.log(data['SrNo'])

      if(data['SrNo']===1348){
        console.log(record_check)
      }
      
      const party = await Party.findOne({ partyCode: data["Code"] });

      if (!party) {
        parties_not_found.push(data['Code']);
        return ;
      } 


      const record = new Collection({
        entryDate: data['Date'],
        entryNumber: data['Entry No'],
        party: party._id,
        partyCode: data['Code'],
        amount: data['Amount'],
        narration: data['Narration'],
        chequeNumber: data['Chq No']
      })

      await record.save();
      // console.log(data['SrNo']);
      
      party.collections.push(record._id);

      await party.save();

    })

    await Promise.all(promises);

    const parties = await Party.find({})
    .populate("collections")
    .select(" -address -details -bills -purchases -paymentNotes -searchTags -analytics");

    return {parties, parties_not_found};

  }
  catch (err) {
    console.log(err);
  }
}

export { add_collections_to_db };