const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const event = require("../controllers/event.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/event/add",
    [authJwt.verifyToken],
    event.addEvent
  );
app.get(
   "/api/event/get",
   [authJwt.verifyToken],
   event.getEvent
 );
// app.delete(
//   "/api/category/delete/:id",
//   [authJwt.verifyToken],
//   category.deleteCategory
// );
};
