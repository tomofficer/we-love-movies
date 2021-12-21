if (process.env.USER) require("dotenv").config();

//require express
const express = require("express");
const app = express();
//require cors
const cors = require("cors");

//router vars
const moviesRouter = require('./movies/movies.router');
const theatersRouter = require('./theaters/theaters.router');
const reviewsRouter = require('./reviews/reviews.router');

//error vars
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const asyncErrorBoundary = require("./errors/asyncErrorBoundary");

//cors + express
app.use(cors());
app.use(express.json());

//routes
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

//errors
app.use(notFound)
app.use(errorHandler)
app.use(asyncErrorBoundary)

//exports
module.exports = app;
