const router = require("express").Router();
const Booking = require("../models/Booking");
const verify = require("../verifyToken");

// CHAINING - GET ALL, CREATE BOOKING
router.route("/")
    .get(verify, async (req, res) => {
        if (req.user.is_admin) {
            try {
                const bookings = await Booking.find();
                res.status(200).json(bookings.reverse());
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json("You are not allowed!");
        }
    })
    .post(verify, async (req, res) => {
        if (req.user) {
            const newBooking = new Booking(req.body);
            try {
                const savedBooking = await newBooking.save();
                res.status(201).json(savedBooking);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json("You are not allowed!");
        }
    });

// GET BOOKING
router.get("/:id", verify, async (req, res) => {
        try {
            if (req.user.is_admin) {
                const booking = await Booking.findById(req.params.id);
                res.status(200).json(booking);
            } else {
                res.status(403).json("You are not allowed!");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    })

module.exports = router;
