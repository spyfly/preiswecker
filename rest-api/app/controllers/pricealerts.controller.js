const db = require("../models");
const User = db.user;

exports.getAllPriceAlerts = (req, res) => {
    let priceAlertsFromUsers = [];

    User.find({}, 'priceAlerts _id', function(err, users){
        if(err){
            res.status(500).send({ msg: "Internal server error: " + err });
        } else{
            if(users === undefined || users === null || users.length < 1){
                res.status(404).send({ msg: "No price alerts available." }); 
            }else{
                users.forEach(function(user) {
                    priceAlertsFromUsers.push({userID: user._id, priceAlerts: user.priceAlerts});
                });
                if(priceAlertsFromUsers === undefined || priceAlertsFromUsers === null || priceAlertsFromUsers.length < 1){
                    res.status(404).send({ msg: "No price alerts available." }); 
                }else{
                    res.status(200).send({priceAlertsFromUsers});
                }
            }
        }
    })
};

exports.setPriceAlertReached = (req, res) => {
    const priceAlertID = req.params.id;
    const reachedPrice = req.body.reachedPrice;
    const userID = req.body.userID;

    User.findOneAndUpdate({ _id: userID, priceAlerts: { $elemMatch: { _id: priceAlertID } } },
        {
          $set: {
            'priceAlerts.$.reached': true,
            'priceAlerts.$.reachedPrice': reachedPrice,
          }
        }, (error, doc) => {
          if (doc) {
            res.status(200).send({ msg: "Price alert reached-status was updated successfully!" })
            return;
          } else {
            res.status(404).send({ msg: "Price alert with given price-alert-/user-ID doesn't exist!" })
            return;
          }
          if (error) {
            res.status(500).send({ msg: "Internal server error: " + error });
            return;
          }
          res.status(500).send({ msg: "Unknown error" });
        });
}