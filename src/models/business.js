const mongoose = require("mongoose");

const businessSchema = mongoose.Schema({
  businessName: {
    type: String,
    default: 'Business',
    required: true,
  },
  imageURL: {
    type: String,
    default: 'http://imageUrl.com',
    required: true
  },
  category: {
    // type: mongoose.SchemaTypes.ObjectId,
    // ref: 'categories'
    type: String
  },
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
      minutes: new Date().getMinutes()
    })
  },
  closingTime: {
    type: Object,
    default: () => ({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    })
  },
  webSiteUrl: {
    type: String,
    default: "localhost"
  },
  date_created: {
    type: Date,
    default: () => Date.now()
  }
});

module.exports = mongoose.model("Business", businessSchema);
