const router = require("express").Router();
const controller = require("./courses.controller")

router.post("/signup", controller.signup);
router.get("/test", controller.test);

module.exports = router;