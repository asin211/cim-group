const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

// CHAINING - GET, CREATE LIST
router.route("/")
  .get(verify, async (req, res) => {
    const category_query = req.query.category;
    const type_query = req.query.type;
    let list = [];
    try {
      if (category_query) {
        if (type_query) {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { category: category_query, type: type_query } },
          ]);
        } else {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: type_query } },
          ]);
        }
      } else {
        list = await List.aggregate([{ $sample: { size: 100 } }]);
      }
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(verify, async (req, res) => {
    if (req.user.is_admin) {
      const newList = new List(req.body);
      try {
        const savedList = await newList.save();
        res.status(201).json(savedList);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });

// UPDATE, DELETE
router.route("/:id")
  .put(verify, async (req, res) => {
    if (req.user.is_admin) {
      try {
        const updatedList = await List.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedList);
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
        await List.findByIdAndDelete(req.params.id);
        res.status(201).json("The list has been deleted successfully");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  })

module.exports = router;
