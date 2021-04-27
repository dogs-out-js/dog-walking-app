const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
    date: Date,
    time: String,
    duration: Number
    //include link to owner id
    //include link to walkerid / link to dog id
});

const Request = model("Request", requestSchema);

module.exports = Request;