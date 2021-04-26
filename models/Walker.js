const { Schema, model } = require("mongoose");

const walkerSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: String,
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
  },
  walkerImg: String
});

const Walker = model("Walker", walkerSchema);

module.exports = Walker;
