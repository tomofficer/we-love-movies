const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


//validation
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  } else {
      return next({
    status: 404,
    message: `Movie cannot be found.`
  });
  }
};

//list movies currently playing
async function list(req, res, next) {
  const isShowing = req.query.is_showing;
  if (isShowing) {
    res.json({ data: await service.listNowPlaying() })
  } else {
    res.json({ data: await service.list() })
  }
};

//read movie
async function read(req, res) {
  const { movie } = res.locals;
  const data = await service.read(movie.movie_id);
  res.json({ data });
};

//list theaters
async function listTheaters(req, res) {
  const { movie } = res.locals;
  const data = await service.listTheaters(movie.movie_id);
  res.json({ data });
};

//list reviews
async function listReviews(req, res) {
  const { movie } = res.locals;
  const data = await service.listReviews(movie.movie_id);
  res.json({ data });
};


//exports
module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
  listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)],
};