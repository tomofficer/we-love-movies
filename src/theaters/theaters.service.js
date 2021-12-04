const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");


//reducer, filter movies to only show necessary properties
const reduceMovies = reduceProperties("theater_id", {
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    image_url: ["movies", null, "image_url"],
});

//list all theaters
function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*")
    .then(reduceMovies);
};


//exports
module.exports = {
  list,
};