const express = require("express"); // express module added.

const app = express(); // express func started.

//Template Engine
app.set("view engine", "ejs"); //View engine setted as "ejs" module.

//Middlewares
app.use(express.static("public"));

//Routing
app.get("/", (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
});
app.get("/about", (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
});

const port = 3000; //Port
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
