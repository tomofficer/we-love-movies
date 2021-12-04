const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


//list all theaters
async function list(req, res) {
  const data = await service.list(req.params)
  res.json({ data });
};


//exports
module.exports = {
  list,
}