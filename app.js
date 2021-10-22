const express = require('express'); // express module added.
const mongoose = require('mongoose'); // mongoose module added.
const session = require('express-session'); // session module added.
const MongoStore = require('connect-mongo'); // Connect-mongo module added.

const pageRoute = require('./routes/pageRoute'); //pageRoute router added.
const courseRoute = require('./routes/courseRoute'); //courseRoute router added.
const categoryRoute = require('./routes/categoryRoute'); //categoryRoute router added.
const userRoute = require('./routes/userRoute'); //categoryRoute router added.

const app = express(); // express func started.

//Connect DB
mongoose.connect('mongodb://localhost/smartedu-db').then(() => {console.log('DB successfully connected')});

//Template Engine
app.set("view engine", "ejs"); //View engine setted as "ejs" module.

//Global Variable
global.userIN = null;


//Middlewares
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'my_keyboard_cat',
  resave:false,
  saveUninitialized:true,
  store: MongoStore.create( { mongoUrl: 'mongodb://localhost/smartedu-db' } )
}))

//Routing
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
})
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);



//Port
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
