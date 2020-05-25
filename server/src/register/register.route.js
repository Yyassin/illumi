const router = require("express").Router();
const controller = require("./register.controller")

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.get("/test", controller.validate)

module.exports = router;