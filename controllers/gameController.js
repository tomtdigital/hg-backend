// TODO: remove this!
/* eslint-disable no-unused-vars */
const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");

// @desc Get games
// @route GET /api/games
// @access Public
const getGames = asyncHandler(async (req, res) => {
  const { limit, member } = req.query;
  // Organise query params relating to game membership status
  let queryParams = {};
  if (member === "true") queryParams = { member: true };
  if (member === "false") queryParams = { member: false };

  // Sorts all games by publish date (most recently 1), using the member/limt params
  const query = Game.find(queryParams)
    .sort({ publishDate: -1 })
    .limit(parseInt(limit) || 0);
  // Only return the fields we're interested in
  query.select("_id publishDate");
  const games = await query.exec();
  res.status(200).json(games);
});

// @desc Get game
// @route GET /api/games/:id
// @access Public
const getGame = asyncHandler(async (req, res) => {
  const game = await Game.findOne({ _id: req.params.id });
  res.status(200).json(game);
});

// @desc Create game
// @route POST /api/games
// @access Admin
const createGame = asyncHandler(async (req, res) => {
  // __Intial sanitisation checks__
  // Checks the date isn't in the past
  const now = +new Date().setHours(0, 0, 0, 0);
  const publishDate = +new Date(req.body.publishDate).setHours(0, 0, 0, 0);
  if (now > publishDate) {
    res.status(400);
    throw new Error("publishDate property cannot be in the past");
  }

  // Checks to see if there is a duplicate date/member combo in the db
  const member = req.body.member;
  const gameExists = await Game.findOne({
    publishDate: req.body.publishDate,
    member,
  });

  if (gameExists) {
    res.status(400);
    throw new Error(
      `${member ? "member" : "free"} game already exists at for this date`
    );
  }

  // Create the game - Mongoose Model will validate the rest
  const game = await Game.create(req.body);

  // Send valid json status
  res.status(201).json({
    game,
  });
});

// @desc Update game
// @route PUT /api/games/:id
// @access Admin
const updateGame = asyncHandler(async (req, res) => {
  // __Intial sanitisation checks__
  // Identify if game exists
  const { id } = req.params;
  const game = await Game.findById(id);

  if (!game) {
    res.status(400);
    throw new Error("Please add a valid id parameter");
  }

  // Check to see if there is a duplicate date in the db...
  const publishDateExists = await Game.findOne({
    publishDate: req.body.publishDate,
  });
  // ...and it doesn't match this one
  if (publishDateExists && publishDateExists.id !== id) {
    res.status(400);
    throw new Error("publishDate already exists");
  }

  // Update the game - Mongoose Model will validate the rest
  const updatedGame = await Game.findByIdAndUpdate(id, req.body, {
    // returns updated document
    new: true,
    // ensures validation runs on the update
    runValidators: true,
  });

  res.status(200).json(updatedGame);
});

// @desc Delete game
// @route DELETE /api/games/:id
// @access Admin
const deleteGame = asyncHandler(async (req, res) => {
  // Intial sanitisation checks
  const { id } = req.params;
  const game = await Game.findById(id);
  if (!game) {
    res.status(400);
    throw new Error("Please add a valid id parameter");
  }

  // Delete the game
  await game.deleteOne();

  res.status(200).json({ id });
});

module.exports = { getGames, getGame, createGame, updateGame, deleteGame };
