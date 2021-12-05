const { authJwt, verifyPriceAlertData } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/pricealert", [
    authJwt.verifyToken,
    verifyPriceAlertData.validatePriceAlertCreation
  ], controller.createPriceAlert);
  app.put("/api/user/pricealert/:id", [
    authJwt.verifyToken,
    verifyPriceAlertData.validatePriceAlertCreation
  ], controller.updatePriceAlert);
  app.get("/api/user/pricealert", [
    authJwt.verifyToken
  ], controller.getAllPriceAlerts);
  app.get("/api/user/pricealert/:id", [
    authJwt.verifyToken,
  ], controller.getPriceAlert);
  app.delete("/api/user/pricealert/:id", [
    authJwt.verifyToken,
  ], controller.deletePriceAlert);
};
