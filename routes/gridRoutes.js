const express = require("express");
const router = express.Router();
const {
  getGrids,
  createGrid,
  updateGrid,
  deleteGrid,
} = require("../controllers/gridController");

const { adminProtect } = require("../middleware/authMiddleware");

router.route("/").get(adminProtect, getGrids).post(adminProtect, createGrid);
router
  .route("/:id")
  .put(adminProtect, updateGrid)
  .delete(adminProtect, deleteGrid);

module.exports = router;
