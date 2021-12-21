//dependencies
const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//get all theaters
async function list(req, res){
  const data = await service.list()  
  res.json({data})
}

//exports
module.exports = {
  list: asyncErrorBoundary(list)
};