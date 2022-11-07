const { default: mongoose } = require("mongoose");

const repleSchema = new mongoose.Schema(
  {
    reple: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    //해당 타입 id를 넣으면, 그 다른 객체의 데이터를 모두 할당? 한다.=> fk같은 느낌
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    collection: "reples",
    timestamps: true,
  }
);

const Reple = mongoose.model("Reple", repleSchema);

module.exports = { Reple };
