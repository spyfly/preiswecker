const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");

exports.createPriceAlert = (req, res) => {
  const userID = req.userId;
  var queryUser = User.findOne({ _id: userID })
  queryUser.exec().then(user => {
    if (user.priceAlerts !== undefined && user.priceAlerts !== null && user.priceAlerts.length > 0) {
      user.priceAlerts.push({
        name: req.body.name,
        targetPrice: req.body.targetPrice,
        filterUrl: req.body.filterUrl,
      });
    } else {
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

exports.updatePriceAlert = (req, res) => {
  const userID = req.userId;
  const priceAlertID = req.params.id;
  User.findOneAndUpdate({ _id: userID, priceAlerts: { $elemMatch: { _id: priceAlertID } } },
    {
      $set: {
        'priceAlerts.$.name': req.body.name,
        'priceAlerts.$.targetPrice': req.body.targetPrice,
        'priceAlerts.$.filterUrl': req.body.filterUrl,
      }
    }, (error, doc) => {
      if (doc) {
        res.status(200).send({ msg: "Price alert was updated successfully!" })
        return;
      } else {
        res.status(404).send({ msg: "Price alert with given ID doesn't exist!" })
        return;
      }
      if (error) {
        res.status(500).send({ msg: "Internal server error: " + error });
        return;
      }
      res.status(500).send({ msg: "Unknown error" });
    });
};

exports.getAllPriceAlerts = (req, res) => {
  const userID = req.userId;
  var queryUser = User.findOne({ _id: userID })
  queryUser.exec().then(user => {
    if (user.priceAlerts !== undefined && user.priceAlerts !== null && user.priceAlerts.length > 0) {
      res.status(200).send(user.priceAlerts);
      return;
    } else {
      res.status(404).send({ msg: "No price alerts saved for this user!" });
      return;
    }
  }).catch(err => {
    res.status(500).send({ msg: "Internal server error: " + err });
  });
};

exports.getPriceAlert = (req, res) => {
  const userID = req.userId;
  const priceAlertID = req.params.id;
  User.findOne({ _id: userID }).select({ priceAlerts: { $elemMatch: { _id: priceAlertID } } }).exec(function(err, obj) {
    if (obj) {
      res.status(200).send(obj.priceAlerts[0]);
      return;
    } else {
      res.status(404).send({ msg: "Price alert with given ID doesn't exist!"});
      return;
    }
});
};

exports.deletePriceAlert = (req, res) => {
  const userID = req.userId;
  const priceAlertID = req.params.id;
  User.updateOne({ _id: userID }, { "$pull": { "priceAlerts": { "_id": priceAlertID } } }, function (err, obj) {
    if (obj) {
      if (obj.modifiedCount > 0) {
        res.status(200).send({ msg: "Price alert was deleted successfully!" });
        return;
      } else {
        res.status(404).send({ msg: "Price alert with given ID doesn't exist!" });
        return;
      }
    }
    if (err) {
      res.status(404).send({ msg: "Price alert with given ID doesn't exist!" });
      return;
    }
    res.status(500).send({ msg: "Unknown error" });
  });
};