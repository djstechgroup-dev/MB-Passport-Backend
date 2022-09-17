const mongoose = require("mongoose");


const businessSchema = mongoose.Schema({
  businessName: {
    type: String,
    default: 'Business',
    required: true,
  },
  businessCode: {
    type: String,
    default: '000000'
  },
  imageUrl: String,
  imagePath: String,
  category: String,
  address: {
    type: String,
    default: 'address'
  },
  description: {
    type: String,
    default: 'description'
  },
  openingTime: {
    type: Object,
    default: () => ({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds()
    })
  },
  closingTime: {
    type: Object,
    default: () => ({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds()
    })
  },
  webSiteUrl: {
    type: String,
    default: "localhost"
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  locations: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Location'
    }
  ],
  deals: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Deal'
    }
  ],
  active: {
    type: Boolean,
    default: 1
  },
  date_created: {
    type: Date,
    default: () => Date.now()
  }
});

module.exports = mongoose.model("Business", businessSchema);
