import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  name: {
    type: String
  },
  updationDates: [String]
})

const Report = new mongoose.model("Reports", reportSchema)

export { Report }