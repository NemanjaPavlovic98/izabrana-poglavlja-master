const express = require("express");
const router = express.Router();
const controller = require("../controllers/muscles.controller");

router.get("", controller.getMuscles);
router.get("/:id", controller.getSingleMuscles);

module.exports = router;
