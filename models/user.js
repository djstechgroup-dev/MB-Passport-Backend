const mongoose = require("mongoose");

const UserScheme = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  favouriteBusiness: {
    type: String
  },
  offerRedeemed: {
    type: String
  },
  savedDeals: {
    type: String
  },
  savingsEarned: {
    type: String
  },
  businessName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("user", UserScheme);
