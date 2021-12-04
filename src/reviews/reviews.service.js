const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");


//read
function read(review_id) {
  return knex("reviews")
        .select("*")
        .where({ review_id })
        .first();
}; 

//update
function update(review_id, updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id })
    .update(updatedReview, "*");
};


//add critic helper
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

//list updated review
function listUpdated(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id })
    .first()
    .then((result) => {
      const updated = addCritic(result);
      updated.critic_id = updated.critic.critic_id;
      return updated;
    });
};

//destroy
function destroy(review_id) {
  return knex("reviews")
    .where({ review_id })
    .del();
}


//exports 
module.exports = {
  read,
  update,
  listUpdated,
  destroy,
};
