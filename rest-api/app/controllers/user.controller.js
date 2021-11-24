const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");

exports.createPriceAlert = async (req, res) => {
  const userID = req.userId;
  var queryUsername = User.findOne({ id: userID})
  queryUsername.exec().then(user => {
    if(user.priceAlerts !== undefined && user.priceAlerts !== null && user.priceAlerts.length > 0){
      user.priceAlerts.push({
        name: req.body.name,
        targetPrice: req.body.targetPrice,
        filterUrl: req.body.filterUrl,
      });
    }else{
      let priceAlerts = [{
        name: req.body.name,
        targetPrice: req.body.targetPrice,
        filterUrl: req.body.filterUrl,
      }]
      user.priceAlerts = priceAlerts;
    }
    user.save().then(savedDoc => {
      res.status(201).send({ msg: "Price alert was created successfully!" });
    }).catch(err => {
      res.status(500).send({ msg: "Internal server error: " + err });
    });
  });
};