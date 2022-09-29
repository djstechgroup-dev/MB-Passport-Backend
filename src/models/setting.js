const mongoose = require("mongoose");

const SettingSchema = mongoose.Schema({
  dealOfTheDay: {
    type: mongoose.Types.ObjectId,
    ref: 'Deal',
    default: null
  }
});

module.exports = mongoose.model("Setting", SettingSchema);
