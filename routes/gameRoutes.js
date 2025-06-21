const express = require("express");
const router = express.Router();
const {
  getGame,
  getGames,
  createGame,
  updateGame,
  deleteGame,
} = require("../controllers/gameController");
const { userProtect, adminProtect } = require("../middleware/authMiddleware");

router.route("/").get(userProtect, getGames).post(adminProtect, createGame);
router
  .route("/:id")
  .get(userProtect, getGame)
  .delete(adminProtect, deleteGame)
  .put(adminProtect, updateGame);

module.exports = router;
