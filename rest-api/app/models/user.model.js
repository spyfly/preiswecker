const mongoose = require("mongoose");

const User = mongoose.model(
  "users",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    priceAlerts: [{
      name: String,
      targetPrice: Number,
      filterUrl: String,
      created: { type: Date, default: Date.now }
    }]
  })
);

module.exports = User;
