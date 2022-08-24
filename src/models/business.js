const mongoose = require("mongoose");


const businessSchema = mongoose.Schema({
  businessName: {
    type: String,
    default: 'Business',
    required: true,
  },
  imageUrl: String,
  imagePath: String,
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
  date_created: {
    type: Date,
    default: () => Date.now()
  }
});

module.exports = mongoose.model("Business", businessSchema);
