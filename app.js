const express = require("express"); // express module added.

const pageRoute = require('./routes/pageRoute');

const app = express(); // express func started.

//Template Engine
app.set("view engine", "ejs"); //View engine setted as "ejs" module.

//Middlewares
app.use(express.static("public"));

//Routing
app.use("/", pageRoute);

//Port
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
