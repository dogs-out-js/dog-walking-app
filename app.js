// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");
// require('dotenv').config({path: '/config/.env'})

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// session configuration

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('./db/index');
const { urlencoded } = require("express");

//app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: 'keyboard cat',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'session',
      url: process.env.MONGODB_URI,
      adapter: 'connect-mongo'
    })
  })
)

// default value for title local
const projectName = "dogs-out";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} is an app created to help dog owners to find dog walkers in the nearby.`;

// 👇 Start handling routes here

//app.use("/", require("./routes/index"));
const index = require("./routes/index");
const owner = require("./routes/owner");
const walker = require("./routes/walker");
const auth = require("./routes/auth");
const request = require("./routes/request")
app.use("/", index);
 app.use("/owner", owner);
 app.use("/walker", walker);
 app.use("/auth", auth);
 app.use("/request", request);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

require("./config")(app);



module.exports = app;


