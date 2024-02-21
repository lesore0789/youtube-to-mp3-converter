const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

// Express Server
const app = express();

const PORT = process.env.PORT || 3000;

// set template engine
app.set("view engine", "ejs");

app.use(express.static("public"));

// Parse HTML data for POST request
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Routes
app.get("/", (req, res) =>{
  res.render('index.ejs')
})
// app.post("/", (req, res) =>{

// }

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
