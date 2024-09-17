const express = require("express");
const router = express.Router();
const {
  getGame,
  getGames,
  createGame,
  updateGame,
  deleteGame,
} = require("../controllers/gameController");

// const { adminProtect } = require("../middleware/authMiddleware");

// TODO: re-add when admin users active (get is fine, but rest is protected)
// router.route("/").post(adminProtect, createGame);
// router
//   .route("/:id")
//   .delete(adminProtect, deleteGame)
//   .put(adminProtect, updateGame);
router.route("/").get(getGames).post(createGame);
router.route("/:id").get(getGame).delete(deleteGame).put(updateGame);

module.exports = router;
