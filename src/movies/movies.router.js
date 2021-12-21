//dependencies
const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//get all movies
router.route("/")
  .get(controller.list)
  .all(methodNotAllowed);

//get movie by id
router.route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

//get all theaters for given movie
router.route("/:movieId/theaters")
  .get(controller.readTheaters);

//get all reviews for given movie
router.route("/:movieId/reviews")
  .get(controller.readReviews);

//exports
module.exports = router;