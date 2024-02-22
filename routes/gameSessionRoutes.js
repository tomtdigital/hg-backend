const express = require("express");
const router = express.Router();
const {
  getGameSession,
  getGameSessions,
  createGameSession,
  updateGameSession,
  deleteGameSession,
} = require("../controllers/gameSession");

const { userProtect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(userProtect, getGameSessions)
  .post(userProtect, createGameSession);
router
  .route("/id")
  .get(userProtect, getGameSession)
  .delete(userProtect, deleteGameSession)
  .put(userProtect, updateGameSession);

module.exports = router;
