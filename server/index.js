const express = require("express");
var bodyParser = require("body-parser");
const app = express();

var jsonParser = bodyParser.json();

var games = require("./data.json");

app.get("/api/getAllGames", (req, res) => {
  res.send(games);
});

app.post("/api/newGame", jsonParser, (req, res) => {
  const newGame = {
    id: games.length + 1,
    title: req.body.title,
    img: req.body.img,
    creator: req.body.creator,
    description: req.body.description,
    favorites: req.body.favorites,
    visits: req.body.visits,
    genre: req.body.genre,
  };
  games.push(newGame);
  res.send(newGame);
});

// req.body to get ID for delete
app.delete("/api/deleteGame", jsonParser, (req, res) => {
  for (let i = 0; i < games.length; i++) {
    if (req.body.id === games[i].id) {
        console.log("DELETING", games[i])
        games.splice(i, 1)
    }
  }
  res.send(games);
});

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

/*
NOTES:
Array.push = adding to array (end of array)
Array.splice = delete from array

*/