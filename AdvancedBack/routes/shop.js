const express = require("express");
const router = express.Router();

const User = require("../model/User");

const auth = require("../middleware/auth");

router.get("/list", auth, async (req, res) => {
  try {
  	const user = await User.findById(req.user.id);
  	res.json(user.shoppinglist);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

router.post("/add", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.shoppinglist.push(req.body.item);
        User.findByIdAndUpdate(req.user.id, {shoppinglist : user.shoppinglist}, (error) => {
            if (error) {
                res.json({ status: "Error when add item: not added" })
            } else {
              res.json(user.shoppinglist);
          }
        });
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
});

router.delete("/delete", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.shoppinglist = user.shoppinglist.filter(e => e !== req.body.item);
        User.findByIdAndUpdate(req.user.id, {shoppinglist : user.shoppinglist}, (error) => {
            if (error) {
                res.json({ status: "Error when deleted item: not deleted" })
            } else {
              res.json(user.shoppinglist);
          }
        });
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
});

module.exports = router;