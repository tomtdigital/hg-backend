const mongoose = require("mongoose");
const { regexCheck } = require("../utils/regexCheck");

const WordDataSchema = [
  {
    _id: false,
    direction: {
      type: String,
      required: [true, "Please add a text value for direction"],
      validate: (v) => {
        const regex = /^(across|down)$/g;
        return regexCheck(v, regex);
      },
    },
    size: {
      type: Number,
      required: [true, "Please add a number value for size"],
    },
  },
];

const gridSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      // e.g. a-5, c-9
      validate: (v) => {
        const regex = /^[a-z]-[0-9]$/g;
        return regexCheck(v, regex);
      },
    },
    wordData: {
      type: WordDataSchema,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Grid", gridSchema);
