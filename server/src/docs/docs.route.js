const express = require("express")
const controller = require("./docs.controller")

const router = express.Router()

router.get("/", controller.index);
router.get("/index", controller.index);

module.exports = router;