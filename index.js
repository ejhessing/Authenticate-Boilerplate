const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const LocalStrategy = require('passport-local').Strategy;


const PORT = process.env.PORT || 3000;
const app = express();

require('./auth/passport')(passport);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

app.use(sessions({ secret: 'whatever' }));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/index')(passport);



app.get("/", (req,res) => {
  res.render('index')
})

app.listen(PORT, () => console.log('Listening on port: ' + PORT));
