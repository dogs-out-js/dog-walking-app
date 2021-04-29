const { Schema, model } = require("mongoose");

const ownerSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: String,
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
  dogSize: {
    type: String,
    options: ['small doggo', 'medium doggo', 'big doggo'],
  },
  dogsSpecialNeeds: String,
  dogImg: String,
  city: String,
  district: String,
  location: {
    type: String,
    city: String,
    district: String,
    street: String
  }
});

const Owner = model("Owner", ownerSchema);

module.exports = Owner;
