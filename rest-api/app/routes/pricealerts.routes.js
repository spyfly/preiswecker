const { verifyPriceAlertData } = require("../middlewares");
const controller = require("../controllers/pricealerts.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/pricealerts", [], controller.getAllPriceAlerts);
  app.put("/api/pricealerts/:id", [verifyPriceAlertData.validateSetReached], controller.setPriceAlertReached);
};
