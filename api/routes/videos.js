const router = require("express").Router();
const Video = require("../models/Video");
const verify = require("../verifyToken");

// CHAINING - GET ALL, CREATE
router.route("/")
  .get(verify, async (req, res) => {
    if (req.user) {
      try {
        const videos = await Video.find();
        res.status(200).json(videos.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  })
  .post(verify, async (req, res) => {
    if (req.user.is_admin) {
      const newVideo = new Video(req.body);
      try {
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });

//GET RANDOM
router.get("/random", verify, async (req, res) => {
  const is_confidential = req.query.new;
  let video;
  // console.log(req.query)
  try {
    if (is_confidential) {
      console.log(1)
      video = await Video.aggregate([
        { $match: { is_confidential: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      console.log(2)
      video = await Video.aggregate([
        // { $match: { is_confidential: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(video);
    console.log(video)
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET VIDEO STATS
router.get("/stats", async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await Video.aggregate([
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

// CHAINING - GET, UPDATE, DELETE VIDEO
router.route("/:id")
  .get(verify, async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      res.status(200).json(video);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .put(verify, async (req, res) => {
    if (req.user.is_admin) {
      try {
        const updatedVideo = await Video.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedVideo);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  })
  .delete(verify, async (req, res) => {
    if (req.user.is_admin) {
      try {
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json("The video has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });

module.exports = router;
