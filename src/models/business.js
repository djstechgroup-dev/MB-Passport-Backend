const mongoose = require("mongoose");

const businessSchema = mongoose.Schema({
  businessName: {
    type: String,
    default: 'Business',
    required: true,
  },
  imageURL: {
    type: String,
    default: 'image url',
    required: true
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'categories'
  },
  address: {
    type: String,
    default: 'address'
  },
  description: {
    type: String,
    default: 'description'
  },
  tagline: {
    type: String,
    default: 'tagline'
  },
  hourOpen: {
    type: Number,
    default: 1
  },
  webSiteURL: {
    type: String,
    default: "www.google.com"
  },
  hourClose: {
    type: Number,
    default: 1
  },
  totalOffers: {
    type: Number,
    default: 1
  },
  totalUsed: {
    type: Number,
    default: 1
  },
  date_created: {
    type: Date,
    default: () => Date.now()
  }
});

module.exports = mongoose.model("Business", businessSchema);
