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
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("mobile_user", UserScheme);
