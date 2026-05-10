const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },

    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isAccept: {
      type: Number,
      required: true,
    },

    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    isAnswer: {
      type: Number,
      required: true,
    },

    mainCommentID: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,

    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },

    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const model = mongoose.model("Comment", schema);

module.exports = model;