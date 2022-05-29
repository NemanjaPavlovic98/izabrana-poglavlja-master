const express = require("express");
const router = express.Router();
const controller = require("../controllers/training.controller");
const multer = require("../middleware/multer");

router.get("", controller.getTraining);
router.get("/:id", controller.getSingleTraining);
router.post("/create", multer, controller.createTraining);
router.post("/update", multer, controller.updateTraining);
router.delete("/delete/:id", controller.deleteTraining);

module.exports = router;
