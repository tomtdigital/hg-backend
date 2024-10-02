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
  solutionGuess: { type: String },
  correctSolution: {
    type: Boolean,
    required: [true, "Please add correctSolution"],
  },
  gameComplete: { type: Boolean, required: [true, "Please add gameComplete"] },
};

const gameSessionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Game",
    },
    gameData: {
      type: GameDataSchema,
      _id: false,
      validate: (v) => {
        const keys = [
          "stage",
          "cluesRevealed",
          "score",
          "lastCompletedGrid",
          "finishedGrids",
          "solutionGuess",
          "correctSolution",
          "gameComplete",
        ];
        return keys.every((key) => Object.keys(v.toJSON()).includes(key));
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GameSession", gameSessionSchema);
