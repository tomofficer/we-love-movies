if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();

//require cors
const cors = require("cors");
app.use(cors());

app.use(express.json());

//router vars
const moviesRouter = require('./movies/movies.router');
const theatersRouter = require('./theaters/theaters.router');
const reviewsRouter = require('./reviews/reviews.router');

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);



module.exports = app;
