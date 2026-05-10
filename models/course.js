const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    cover: {
      type: String,
      required: true,
    },

    support: {
      type: String,
      required: true,
    },

    href: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },

    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    creator: {
      type: mongoose.Types.ObjectId,
      ref: "Teacher",
      required: true,
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

schema.virtual("Sessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "course",
});

schema.virtual("Comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "course",
});

const model = mongoose.model("Course", schema);

module.exports = model;