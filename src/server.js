//dependencies
const express = require('express')
const cors = require('cors')

const app = express()
const router = express.Router()
const PORT = process.env.PORT || 5000

//routes
router.get('/', cors(), (req, res) => {
  res.json({ message:
  'Welcome! You can access the data using these routes: /movies, /reviews, /theaters, /reviews/:reviewId, /movies/:movieId, /movies/:movieId/theaters, and /movies/:movieId/reviews.'});
})

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} `);
})

//exports
module.exports = app;





























// const { PORT = 5000 } = process.env;

// const app = require("./app");
// const knex = require("./db/connection");

// const listener = () => console.log(`Listening on Port ${PORT}!`);

// knex.migrate
//   .latest()
//   .then((migrations) => {
//     console.log("migrations", migrations);
//     app.listen(PORT, listener);
//   })
//   .catch(console.error);
