const express = require("express");
const router = express.Router();
const {
  getGrids,
  createGrid,
  updateGrid,
  deleteGrid,
} = require("../controllers/gridController");

// const { adminProtect } = require("../middleware/authMiddleware");

// TODO: re-add when admin users active
// router.route("/").get(adminProtect, getGrids).post(adminProtect, createGrid);
// router
//   .route("/:id")
//   .delete(adminProtect, deleteGrid)
//   .put(adminProtect, updateGrid);
router.route("/").get(getGrids).post(createGrid);
router.route("/:id").put(updateGrid).delete(deleteGrid);

module.exports = router;
