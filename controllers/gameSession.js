const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");
const GameSession = require("../models/gameSessionModel");
// const User = require("../models/userModel");

// @desc Get game session
// @route GET /game-sessions/:id
const getGameSession = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "to create" });
});
// @desc Get game sessions
// @route GET /game-sessions
const getGameSessions = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "to create" });
});
// @desc post game session
// @route POST /game-sessions
const createGameSession = asyncHandler(async (req, res) => {
  const user = req.user.id;

  //   If the game doesn't exist we can't create a session for it
  const gameExists = await Game.findOne({
    _id: req.body.game,
  });

  if (!gameExists) {
    res.status(400);
    throw new Error("game doesn't exist");
  }

  //   If the session already exists we shouldn't create one
  const sessionExists = await GameSession.findOne({
    user,
    game: req.body.game,
  });

  if (sessionExists) {
    res.status(400);
    throw new Error("session already exists");
  }

  // Create the session - Mongoose Model will validate the rest
  const gameSession = await GameSession.create({ user, ...req.body });

  // Send valid json status
  res.status(201).json({
    gameSession,
  });
});
// @desc Update game session
// @route UPDATE /game-sessions/:id
const updateGameSession = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "to create" });
});
// @desc Delete game session
// @route DELETE /game-sessions/:id
const deleteGameSession = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "to create" });
});

module.exports = {
  getGameSessions,
  getGameSession,
  createGameSession,
  updateGameSession,
  deleteGameSession,
};
