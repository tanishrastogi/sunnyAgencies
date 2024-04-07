import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  name: {
    type: String
  },
  updationDates: [String]
})

const Report = mongoose.model("Reports", reportSchema)

export { Report }