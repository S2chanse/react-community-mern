const express = require("express");
const router = express.Router();
const multer = require("multer");

const { User } = require("../Model/User");
const { Counter } = require("../Model/Counter");

router.post("/register", async (req, res) => {
  let temp = req.body;
  try {
    let counter = await Counter.findOne({ name: "counter" }).exec();
    temp.userNum = counter.userNum;
    const registerUser = new User(temp);
    const result = await registerUser.save();
    //Counter의 postNum을 증가

    Counter.updateOne({ name: "counter" }, { $inc: { userNum: 1 } }).then(
      () => {
        res.status(200).json({ success: true });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
});

router.post("/nickNameCheck", async (req, res) => {
  try {
    const result = await User.findOne({
      displayName: req.body.nickName,
    }).exec();
    let nickNameCheck = false;
    if (!result) {
      nickNameCheck = true;
    }
    res.status(200).json({ success: true, check: nickNameCheck });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
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

router.post("/profile/img", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400);
    } else {
      console.log(res.req.file.path);
      res.status(200).json({ success: true, filePath: res.req.file.path });
    }
  });
});

router.post("/profile/update", async (req, res) => {
  let temp = req.body;
  console.log(temp);
  User.findOneAndUpdate(
    { uid: temp.uid },
    { $set: { photoURL: temp.photoURL } }
  )
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});
module.exports = router;
