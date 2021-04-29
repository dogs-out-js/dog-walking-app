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
  walkerImg: String,
  price: String,
  location: {
    city: String,
    district: String,
    street: String
  }
  //request id, (bij opnieuw laden van pagina)
  //andere optie is push notificatie bij een walker, getriggert nadat request word aangemaakt(voor als gebruker al online is), software: pusher?.
});

const Walker = model("Walker", walkerSchema);

module.exports = Walker;
