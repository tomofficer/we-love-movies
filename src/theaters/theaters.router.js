const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


//router
router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

  
//exports
module.exports = router;