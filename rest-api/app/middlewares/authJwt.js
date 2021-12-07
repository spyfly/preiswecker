const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ msg: "No token provided!" });
  }

  if(token.includes("Bearer ")){
    token = token.split(" ")[1];
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ msg: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  }else{
    return res.status(403).send({ msg: "No Bearer token provided!" });
  }

};

const authJwt = {
  verifyToken
};
module.exports = authJwt;
