const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
    image: String,
    author: {
      //해당 타입 id를 넣으면, 그 다른 객체의 데이터를 모두 할당? 한다.=> fk같은 느낌
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    repleNum: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "posts",
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
