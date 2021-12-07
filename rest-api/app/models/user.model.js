const mongoose = require("mongoose");

const User = mongoose.model(
  "users",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    priceAlerts: [{
      name: String,
      reached: { type: Boolean, default: false },
      targetPrice: Number,
      reachedPrice: { type: Number, default: 0 },
      filterUrl: String,
      created: { type: Date, default: Date.now }
    }]
  })
);

module.exports = User;
