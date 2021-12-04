const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//get all movies
router.route("/").get(controller.list).all(methodNotAllowed);

//get movie by id
router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

//get all theaters where given movie is playing
router
  .route("/:movieId/theaters")
  .get(controller.listTheaters)
  .all(methodNotAllowed);

//get all reviews for given movie
router
  .route("/:movieId/reviews")
  .get(controller.listReviews)
  .all(methodNotAllowed);

module.exports = router;