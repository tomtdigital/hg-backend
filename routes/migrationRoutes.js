const {
  renameWordCountToAdditionalInfo,
} = require("../controllers/migrationController");

const express = require("express");
const router = express.Router();

router.patch("/rename-word-count", renameWordCountToAdditionalInfo);

module.exports = router;
