const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    mobile: { type: Number },
    media_url: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserModel);
