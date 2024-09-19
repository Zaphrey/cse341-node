const routes = require("express").Router();
const lesson01Controller = require("../controllers/lesson1")

routes.get("/", lesson01Controller.charlesRoute);
routes.get("/erin", lesson01Controller.erinRoute);
routes.get("/miley", lesson01Controller.mileyRoute);

module.exports = routes;