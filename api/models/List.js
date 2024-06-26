const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    category: { type: String, default: "Training" },
    type: { type: String, default: "Mandatory" },
    content:{type:Array}
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
