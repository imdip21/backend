const startupDebugger = require('debug')("app:startup")
const dbDebugger = require('debug')("app:db")
const home = require("./homepage")
const config = require("config")
const express = require("express");
const helmet = require('helmet')
const morgen = require('morgan')
const logger = require("./logger");
const Joi = require("joi");
const app = express();
const courses = require("./courses")


console.log(`NODE_ENV:${process.env.NODE_ENV}`)
console.log(`app: ${app.get("env")}`)



console.log("Application Name: " + config.get("name"))
console.log("Mail server name: " + config.get("mail.host"))
console.log("Mail server password: " + config.get("mail.password"))



if (app.get("env") === "development") {
  app.use(morgen('tiny'))
  startupDebugger("Morgen is enable....")
}

app.use(express.json());
app.use(helmet());
app.use(express.static("public"));

app.use(logger)
app.use((req, res, next) => {
  console.log("Authentacating ...");
  next();
});


app.use("/", home);


app.use("/api/courses/", courses);

// request--------------------


//DB works
dbDebugger("Conntected to the database")







//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
