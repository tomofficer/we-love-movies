//dependencies
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//add critic, helper function
const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

//get review by Id
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

//update review by Id
function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => {
      return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .first()
        .then(addCritic);
    });
}

//delete review by Id
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

//exports
module.exports = {
  update,
  delete: destroy,
  read,
};
