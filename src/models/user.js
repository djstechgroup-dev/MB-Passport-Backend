const bcrypt = require('bcryptjs')
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
  firstname: {
    type: String
  },
  lastname: {
    type: String
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
  business_name: {
    type: this.toString
  },
  password: String,
  role: {
    type: Number,
    default: 1
  },
  date_created: {
    type: Date,
    default: () => Date.now()
  }
})

UserScheme.pre('save', function(next) {

  // check if password is present and is modified.
  if ( this.password && this.isModified('password') ) {

    // call your hashPassword method here which will return the hashed password.
    this.password = bcrypt.hashSync(this.password, 10);

  }

  // everything is done, so let's call the next callback.
  next();

});

module.exports = mongoose.model("User", UserScheme)

