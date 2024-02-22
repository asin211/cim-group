const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, default: "Training Video"},
    year: { type: String, default: "2023" },
    category: { type: String, default: "Training" },
    duration: { type: String, default: ""},
    type: { type: String, default: "Mandatory" },
    thumbnail: { type: String, default: "" },
    video: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
