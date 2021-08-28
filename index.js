require('dotenv').config()

const models = require("./models");
const express = require("express");
const path = require('path');
const handlebars = require("express-handlebars")
const bodyParser = require('body-parser');

const UserController = require('./controllers/user.controller');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, "/views/"));
app.engine('hbs', handlebars({
  extname: "hbs",
  defaultLayout: "default",
  layoutDir: __dirname + "views/layouts"
}))
app.set("view engine", "hbs");

app.get('/', (req, res) => {
  res.render('index')
});

app.use('/users', UserController);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`)
})