const express = require("express");
const router = express.Router();
const controller = require("../controllers/history.controller");

router.get("/:id", controller.getHistoryForUser);
router.post("/create", controller.createHistory);

module.exports = router;
