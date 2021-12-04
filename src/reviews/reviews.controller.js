const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//validation
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
  next({
    status: 400,
    message: `Review cannot be found.`
  });
};


//update
async function update(req, res) {
  const { reviewId } = req.params;
  await service.update(reviewId, req.body.data);
  res.json({ data: await service.listUpdated(reviewId) });
};


//destroy
async function destroy(req, res) {
  const { reviewId } = req.params;
  await service.destroy(reviewId);
  res.sendStatus(204);
};




//exports
module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};