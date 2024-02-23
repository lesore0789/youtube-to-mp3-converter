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
app.post("/convert-mp3", async (req, res) =>{
  const videoId = req.body.videoID;
  if(videoId === undefined || videoId === "" || videoId === null) {
    return res.render("index", {success : false, message : "Please enter a video ID"})
  } else{
    const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
		    'X-RapidAPI-Host': process.env.API_HOST
      }
    });
    const fetchResponse = await fetchAPI.json();
    if(fetchResponse.status === "ok"){
      return res.render("index", {success : true, song_title: fetchResponse.title, song_link: fetchResponse.link})
    } else {
      return res.render("index", {success: false, message: fetchResponse.msg})
    }
  }
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
