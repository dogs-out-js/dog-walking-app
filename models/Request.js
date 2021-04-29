mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
ObjectId = Schema.ObjectId;


const requestSchema = new Schema({
    date: Date,
    time: String,
    duration: Number,
    sentBy: { //owner id, ommitted while login is not working
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    sentTo: { //walker id
        type: mongoose.Schema.Types.ObjectId,
        ref: "Walker",
        required: true
    }
});

const Request = model("Request", requestSchema);

module.exports = Request;