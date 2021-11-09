const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ msg: err });
      return;
    }

    res.status(201).send({ msg: "User was registered successfully!" });
  });
};

exports.signin = (req, res) => {
  var token = jwt.sign({ id: req.currentUser.id }, config.secret, {
    expiresIn: 86400 // 24 hours
  });

  res.status(202).send({
    id: req.currentUser._id,
    username: req.currentUser.username,
    email: req.currentUser.email,
    accessToken: token
  });
};
