const router = require("express").Router();
const controller = require("./core.controller")

router.get("/test", controller.getServers);

router.post("/createserver", controller.createServer);

module.exports = router;