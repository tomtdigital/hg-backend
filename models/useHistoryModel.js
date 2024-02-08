const mongoose = require("mongoose");

const CompletedGridSchema = [
  {
    cell: { type: Number, required: [true, "Please add cell"] },
    guess: { type: String, required: [true, "Please add guess"] },
    answer: { type: String, required: [true, "Please add answer"] },
  },
];

const GameDataSchema = {
  stage: { type: Number, required: [true, "Please add stage"] },
  cluesRevealed: [
    {
      type: String,
    },
  ],
  score: { type: Number, required: [true, "Please add score"] },
  lastCompletedGrid: {
    type: CompletedGridSchema,
    validate: (v) => Array.isArray(v),
  },
  finishedGrids: {
    type: CompletedGridSchema,
    validate: (v) => Array.isArray(v),
  },
  bonusUnlocked: {
    type: Boolean,
    required: [true, "Please add bonusUnlocked"],
  },
  bonusGuess: { type: String, required: [true, "Please add bonusGuess"] },
  gameComplete: { type: Boolean, required: [true, "Please add gameComplete"] },
};

const GamesSchema = [
  {
    _id: false,
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    gameData: {
      type: GameDataSchema,
      validate: (v) => {
        const keys = [
          "stage",
          "cluesRevealed",
          "score",
          "lastCompletedGrid",
          "finishedGrids",
          "bonusUnlocked",
          "bonusGuess",
          "gameComplete",
        ];
        return v.every((key) => Object.keys(keys).includes(key));
      },
    },
  },
];

const userHistorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    games: { type: GamesSchema, validate: (v) => Array.isArray(v) },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserHistory", userHistorySchema);
