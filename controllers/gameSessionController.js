const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");
const GameSession = require("../models/gameSessionModel");
// const User = require("../models/userModel");

// @desc Get game session
// @route GET /game-sessions/:id
const getGameSession = asyncHandler(async (req, res) => {
  const session = await GameSession.findOne({
    user: req.user.id,
    game: req.params.gameId,
  });

  if (!session) {
    res.status(400);
    throw new Error("session doesn't exist");
  }

  res.status(200).json({ session });
});
// @desc Get game sessions
// @route GET /game-sessions
const getGameSessions = asyncHandler(async (req, res) => {
  // Get all user game sessions from the gameId in the params
  const query = await GameSession.find({ user: req.user.id });
  res.status(200).json(query);
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
  // __Intial sanitisation checks__
  // Identify if game session exists
  const session = await GameSession.findOne({
    user: req.user.id,
    game: req.params.gameId,
  });

  if (!session) {
    res.status(400);
    throw new Error("Please add a valid gameId parameter");
  }

  // GameId in params must match the one in the request body
  if (req.params.gameId !== req.body.game) {
    res.status(400);
    throw new Error("Unable to amend game");
  }

  // Update the GameSession - Mongoose Model will validate the rest
  const updatedGameSession = await GameSession.findByIdAndUpdate(
    session.id,
    req.body,
    {
      // returns updated document
      new: true,
      // ensures validation runs on the update
      runValidators: true,
    }
  );

  res.status(200).json(updatedGameSession);
});
// @desc Delete game session
// @route DELETE /game-sessions/:id
const deleteGameSession = asyncHandler(async (req, res) => {
  // Intial sanitisation checks
  const session = await GameSession.findOne({
    user: req.user.id,
    game: req.params.gameId,
  });
  if (!session) {
    res.status(400);
    throw new Error("Please add a valid id parameter");
  }

  // Delete the grid
  await session.deleteOne();

  res.status(200).json({ id: req.params.gameId });
});

module.exports = {
  getGameSessions,
  getGameSession,
  createGameSession,
  updateGameSession,
  deleteGameSession,
};
