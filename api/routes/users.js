const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

//CHAINING - GET ALL, CREATE
router.route("/")
  .get(verify, async (req, res) => {
    // console.log(req.query.new)
    const query = req.query.new;
    if (req.user.is_admin) {
      try {
        const users = query
          ? await User.find().sort({ _id: -1 }).limit(10)
          : await User.find().sort({ _id: -1 });

        const updated_users = users.map(user => {
          const { password, ...info } = user.toObject();
          return info;
        });

        res.status(200).json(updated_users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to see all users!");
    }
  })
  .post(verify, async (req, res) => {
    const new_user = new User({
      username: req.body.username,
      full_name: req.body.full_name,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
      staff_id: req.body.staff_id,
      is_admin: req.body.is_admin,
      is_active: req.body.is_active,
      profile_img: req.body.profile_img
    });
    try {
      const user = await new_user.save();
      const { password, ...info } = user._doc;
      res.status(201).json({ ...info });
      // res.status(201).json(user)
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET USER STATS
router.get("/stats", async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

// CHAINING - GET, UPDATE, DELETE USER
router.route("/:id")
  .get(verify, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .put(verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.is_admin) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account!");
    }
  })
  .delete(verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.is_admin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted successfully");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can delete only your account!");
    }
  })


module.exports = router;
