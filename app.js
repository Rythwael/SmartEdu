const express = require("express"); // express module added.

const app = express(); // express func started.

//Routing
app.get("/", (req, res) => {
  res.send("INDEX SAYFASI");
});

const port = 3000; //Port
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
