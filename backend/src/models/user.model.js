import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: String,
  mobile: [String],
  role: {
    type: String,
    enum: ['supreme', 'admin', 'mr', 'user'],
    default: 'user'
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others']
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: String,
},
  {
    timestamps: true
  });

const User = mongoose.model("User", userSchema);

export { User }