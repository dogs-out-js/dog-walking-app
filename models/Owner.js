const { Schema, model } = require("mongoose");

const ownerSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  dogBreed: String,
  dogName: String,
  dogAge: {
    type: Number,
    seniorDog: {
      type: Boolean,
      default: false
    },
    juniorDog: {
      type: Boolean,
      default: false
    }
  },
  dogsSpecialNeeds: String,
  ownerImg: String
});

const Owner = model("Owner", ownerSchema);

module.exports = Owner;
