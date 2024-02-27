const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true },
        date_time: { type: String, required: true },
        service: { type: String, default: "Real Estate" },
        message: { type: String, default: "Booking Request" },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);