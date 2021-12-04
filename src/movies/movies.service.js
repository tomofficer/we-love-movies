const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");


//list all movies - not sure if i need groupBy here... troubleshoot later
function list() {
  return knex("movies")
    .select("*")
    .groupBy('movies.movie_id')
}

//list movies currently playing
function listNowPlaying() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id")
};

//read
function read(id) {
  return knex("movies as m")
    .select("*")
    .where({ movie_id: id })
    .groupBy("m.movie_id")
    .first()
};

//list all theaters
function listTheaters(id) {
  return knex("movie_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("*")
    .where({ movie_id: id, is_showing: true })
};

//add critic helper
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

//list all reviews
function listReviews(id) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.movie_id": id })
    .then((result) => {
      const movieReviews = [];
      result.forEach((movie) => {
        const updated = addCritic(movie);
        movieReviews.push(updated);
      })
      return movieReviews;
    });
};


//exports
module.exports = {
  list, listNowPlaying, read, listTheaters, listReviews,
};