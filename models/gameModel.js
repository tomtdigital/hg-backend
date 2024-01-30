const mongoose = require("mongoose");

const DataSchema = [
  {
    _id: false,
    anagram: {
      type: String,
      required: [true, "Please add a text value for anagram"],
    },
    word: {
      type: String,
      required: [true, "Please add a text value for word"],
    },
    clue: {
      type: String,
      required: [true, "Please add a text value for clue"],
    },
    details: {
      pronoun: { type: Boolean },
      wordCount: { type: String },
    },
  },
];

const MainSchema = [
  {
    _id: false,
    grid: {
      type: String,
      required: [true, "Please add a text value for grid"],
    },
    data: {
      type: DataSchema,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
  },
];

const gameSchema = mongoose.Schema(
  {
    main: {
      type: MainSchema,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    bonus: {
      category: {
        type: String,
        required: [true, "Please add a text value for category"],
      },
    },
    publishDate: { type: Date, required: [true, "Please add a publishDate"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);
