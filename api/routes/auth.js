const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const new_user = new User({
    username: req.body.username,
    // full_name: req.body.full_name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
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

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Please check your email!");

    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (originalPassword !== req.body.password) {
        res.status(401).json("Please check your password!");
      } else {
        const access_token = jwt.sign(
          { id: user._id, is_admin: user.is_admin },
          process.env.SECRET_KEY,
          { expiresIn: "7d" }
        );
        const { password, ...info } = user._doc;
        res.status(200).json({ ...info, access_token });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
