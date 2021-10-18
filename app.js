const express = require('express'); // express module added.
const mongoose = require('mongoose'); // mongoose module added.

const pageRoute = require('./routes/pageRoute'); //pageRoute router added.
const courseRoute = require('./routes/courseRoute'); //courseRoute router added.

const app = express(); // express func started.

//Connect DB
mongoose.connect('mongodb://localhost/smartedu-db').then(() => {console.log('DB successfully connected')});

//Template Engine
app.set("view engine", "ejs"); //View engine setted as "ejs" module.

//Middlewares
app.use(express.static("public"));

//Routing
app.use("/", pageRoute);
app.use("/courses", pageRoute);

//Port
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
