const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Post } = require("../Model/Post");
const { Counter } = require("../Model/Counter");
const { User } = require("../Model/User");

router.post("/submit", async (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;
      User.findOne({ uid: req.body.uid })
        .exec()
        .then((userInfo) => {
          temp.author = userInfo._id;
          const communityPost = new Post(temp);
          communityPost.save().then(() => {
            //Counter의 postNum을 증가
            Counter.updateOne(
              { name: "counter" },
              { $inc: { postNum: 1 } }
            ).then(() => {
              res.status(200).json({ success: true });
            });
          });
        });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/update", async (req, res) => {
  let temp = req.body;
  Post.updateOne(
    { postNum: temp.postNum },
    { $set: { title: temp.title, content: temp.content, image: temp.image } }
  )
    .then(() => {
      Post.findOne({ postNum: Number(temp.postNum) })
        .exec()
        .then((doc) => {
          res.status(200).json({ success: true, post: doc });
        });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/list", async (req, res) => {
  let sort = {};
  req.body.sort === "최신순" ? (sort.createdAt = -1) : (sort.repleNum = -1);
  Post.find({
    $or: [
      { title: { $regex: req.body.searchTerm } },
      { content: { $regex: req.body.searchTerm } },
    ],
  })
    .populate("author")
    .sort(sort)
    .skip(req.body.skip)
    .limit(5) //한번에 찾을 doc의 갯수 제한
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => res.status(400));
});

router.post("/detail", async (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) })
    .populate("author")
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => res.status(400));
});

router.post("/delete", async (req, res) => {
  let reqBody = req.body;
  Post.deleteOne({ postNum: reqBody.postNum })
    .then((results) => {
      if (results.acknowledged) {
        res.status(200).json({ success: true });
      }
    })
    .catch((err) => res.status(400));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/img/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400);
    } else {
      res.status(200).json({ success: true, filePath: res.req.file.path });
    }
  });
});
module.exports = router;
