const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const category = require("../controllers/categoria.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/category/add",
    [authJwt.verifyToken],
    category.addCategory
  );
  app.get(
    "/api/category/get",
    [authJwt.verifyToken],
    category.getCategory
  );
};
