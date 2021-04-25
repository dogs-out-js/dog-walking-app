const { Schema, model } = require("mongoose");

const walkerSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  walkerExperience: {
    type: String,
    pro: {
      type: Boolean,
      default: false
    },
    newbie: {
      type: Boolean,
      default: false
    }
  }
});

const Walker = model("Walker", walkerSchema);

module.exports = Walker;
