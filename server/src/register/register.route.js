const router = require("express").Router();
const controller = require("./register.controller")

router.post("/signup", controller.signup);

module.exports = router;