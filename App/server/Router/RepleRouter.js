const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Post } = require("../Model/Post");
const { Reple } = require("../Model/Reple");
const { User } = require("../Model/User");

router.post("/submit", async (req, res) => {
  let temp = {
    reple: req.body.reple,
  };
  try {
    const user = await User.findOne({ uid: req.body.uid }).exec();
    const post = await Post.findOne({ _id: req.body.postid }).exec();
    temp.author = user._id;
    temp.postId = post._id;
    console.log(temp);
    const newReple = new Reple(temp);
    newReple.save(() => {
      Post.updateOne({ _id: req.body.postid }, { $inc: { repleNum: 1 } })
        .exec()
        .then(() => {
          return res.status(200).json({ success: true });
        });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false });
  }
});

router.post("/getRepleList", async (req, res) => {
  try {
    const repleList = await Reple.find({ postId: req.body.postid })
      .populate("author")
      .exec();
    console.log(repleList);
    res.status(200).json({ success: true, repleList: repleList });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false });
  }
});
router.post("/delete", async (req, res) => {
  Reple.deleteOne({ _id: req.body._id })
    .exec()
    .then(() => {
      Post.findOneAndUpdate(
        { _id: req.body.postId },
        { $inc: { repleNum: -1 } }
      )
        .exec()
        .then(() => {
          res.status(200).json({ success: true });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ success: false });
    });
});

router.post("/edit", async (req, res) => {
  let body = {
    postId: req.body.postId,
    reple: req.body.reple,
    uid: req.body.uid,
  };
  Reple.findOneAndUpdate({ _id: req.body._id }, { $set: body })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ success: false });
    });
});
module.exports = router;
