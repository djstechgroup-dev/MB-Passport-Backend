const mongoose = require("mongoose");

const UserScheme = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  photoURL: String,
  favouriteBusiness: {
    type: String,
    default: '',
  },
  offerRedeemed: {
    type: String,
    default: '',
  },
  savedDeals: {
    type: String,
    default: '',
  },
  savingsEarned: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: () => Date.now()
  }
});

module.exports = mongoose.model("MobileUser", UserScheme);
