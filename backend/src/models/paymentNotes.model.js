import mongoose from "mongoose";
import moment from "moment-timezone";

const paymentNotesModelSchema = new mongoose.Schema({
  billNumber:String,
  billDate:String,
  party:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Party"
  },
  narration:String,
  createdAt:{
    type:Date,
    default:()=>{
      return moment(Date.now()).tz("Asia/Kolkata").format()
    }
  }
});

paymentNotesModelSchema.pre("save", function (next) {
  const user = this;
  const IST = moment.tz("Asia/Kolkata");
  user.createdAt = IST.format();
  user.updatedAt = IST.format();

  console.log(moment(user.createdAt).tz("Asia/Kolkata").format())
  next();
});

export const PaymentNotes = mongoose.model("PaymentNote", paymentNotesModelSchema);

