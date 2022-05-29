const express = require("express");
const router = express.Router();
const controller = require("../controllers/exercise.controller");

router.get("", controller.getExercise);
router.get("/:id", controller.getVezbeZaTrening);
router.post("/create", controller.createExercise);
router.post("/update", controller.updateExercise);
router.delete("/delete/:id", controller.deleteExercise);

module.exports = router;
