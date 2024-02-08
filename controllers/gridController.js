const asyncHandler = require("express-async-handler");
const Grid = require("../models/gridModel");

// @desc Get grids
// @route GET /api/grids
// @access Admin
const getGrids = asyncHandler(async (req, res) => {
  // Sorts all grids by created at (most recently 1)
  const query = Grid.find().sort({ name: +1 });
  // Only return the fields we're interested in
  const grids = await query.exec();
  res.status(200).json(grids);
});

// @desc Create grid
// @route POST /api/grids
// @access Admin
const createGrid = asyncHandler(async (req, res) => {
  // __Intial sanitisation checks__
  // Checks to see if there is a duplicate grid in the db
  const gridExists = await Grid.findOne({
    name: req.body.name,
  });

  if (gridExists) {
    res.status(400);
    throw new Error("grid name already exists");
  }

  // Create the grid - Mongoose Model will validate the rest
  const grid = await Grid.create(req.body);

  // Send valid json status
  res.status(201).json({
    grid,
  });
});

// @desc Update grid
// @route PUT /api/grids/:id
// @access Admin
const updateGrid = asyncHandler(async (req, res) => {
  // __Intial sanitisation checks__
  // Identify if grid exists
  const { id } = req.params;
  const grid = await Grid.findById(id);

  if (!grid) {
    res.status(400);
    throw new Error("Please add a valid id parameter");
  }

  // Check to see if there is a duplicate name in the db...
  const nameExists = await Grid.findOne({
    name: req.body.name,
  });
  // ...and it doesn't match this one
  if (nameExists && nameExists.id !== id) {
    res.status(400);
    throw new Error("name already exists");
  }

  // Update the grid - Mongoose Model will validate the rest
  const updatedGrid = await Grid.findByIdAndUpdate(id, req.body, {
    // returns updated document
    new: true,
    // ensures validation runs on the update
    runValidators: true,
  });

  res.status(200).json(updatedGrid);
});

// @desc Delete grid
// @route DELETE /api/grids/:id
// @access Admin
const deleteGrid = asyncHandler(async (req, res) => {
  // Intial sanitisation checks
  const { id } = req.params;
  const grid = await Grid.findById(id);
  if (!grid) {
    res.status(400);
    throw new Error("Please add a valid id parameter");
  }

  // Delete the grid
  await grid.deleteOne();

  res.status(200).json({ id });
});

module.exports = {
  getGrids,
  createGrid,
  updateGrid,
  deleteGrid,
};
