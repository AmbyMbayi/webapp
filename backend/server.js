const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/DB.js');

const passport = require("passport");

const users = require("./routes/api/users");



mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {useNewUrlParser: true}).then(
	()=>{console.log('database is connected')},
	err=>{console.log('can not connect to the database'+err)}

);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users",users);

app.listen(PORT, function(){
	console.log('server is running on Port: ', PORT);
});