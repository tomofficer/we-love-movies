const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//router
router.route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

//exports
module.exports = router;
