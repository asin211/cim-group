const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    full_name: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    staff_id: { type: String, default: "" },
    is_admin: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    profile_img: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
