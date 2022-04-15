const express = require("express");
const router = express.Router();
const controller = require("../controllers/trening.controller");

router.get("/getTrening", controller.getTrening);
router.delete("/getTrening/:id", controller.getSingleTrening);

module.exports = router;
