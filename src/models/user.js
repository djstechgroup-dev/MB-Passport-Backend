// const mongoose = require("mongoose");

// const UserScheme = mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     lowercase: true,
//     unique: true
//   },
//   firstName: {
//     type: String,
//     required: true
//   },
//   lastName: {
//     type: String,
//     required: true
//   },
//   favouriteBusiness: {
//     type: String
//   },
//   offerRedeemed: {
//     type: String
//   },
//   savedDeals: {
//     type: String
//   },
//   savingsEarned: {
//     type: String
//   },
//   business: {
//     type: mongoose.SchemaTypes.ObjectId,
//     ref: "Business",
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   date_created: {
//     type: Date,
//     default: () => Date.now()
//   }
// });

// module.exports = mongoose.model("User", UserScheme);

const mongoose = require("mongoose");

const UserScheme = mongoose.Schema({
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
  role: {
    type: Number,
    default: 1
  },
  date_created: {
    type: Date,
    default: () => Date.now()
  }
})

module.exports = mongoose.model("User", UserScheme)

