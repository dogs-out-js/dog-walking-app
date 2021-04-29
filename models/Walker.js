const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const geocoder = require("geocoder");

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
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  //request id, (bij opnieuw laden van pagina)
  //andere optie is push notificatie bij een walker, getriggert nadat request word aangemaakt(voor als gebruker al online is), software: pusher?.
});

walkerSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };
})

const Walker = mongoose.model("Walker", walkerSchema);

module.exports = Walker;