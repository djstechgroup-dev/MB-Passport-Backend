const mongoose = require("mongoose");

const MobileUserScheme = mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  photo_url: String,
  phone: String,
  favouriteBusiness: [{
    type: mongoose.Types.ObjectId,
    ref: 'Business'
  }],
  offerRedeemed: [{
    type: mongoose.Types.ObjectId,
    ref: 'Deal'
  }],
  savedDeals: [{
    type: mongoose.Types.ObjectId,
    ref: 'Deal'
  }],
  savingsEarned: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("MobileUser", MobileUserScheme);
