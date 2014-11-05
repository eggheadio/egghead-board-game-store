var Sequelize = require('sequelize-sqlite').sequelize;
var sqlite = require('sequelize-sqlite').sqlite;

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

process.chdir(__dirname);

var app = express();

app.use('/images', express.static(__dirname + '/images'));

app.use(cors());
app.use(bodyParser.json());


var sequelize = new Sequelize('database', 'username', '', {
  dialect: 'sqlite',
  storage: './games.db'
})

var Game = sequelize.define('games',
  {
    "gameId": Sequelize.INTEGER,
    "name": Sequelize.STRING,
    "image": Sequelize.STRING,
    "thumbnail": Sequelize.STRING,
    "minPlayers": Sequelize.INTEGER,
    "maxPlayers": Sequelize.INTEGER,
    "playingTime": Sequelize.INTEGER,
    "isExpansion": Sequelize.BOOLEAN,
    "yearPublished": Sequelize.INTEGER,
    "bggRating": Sequelize.FLOAT,
    "averageRating": Sequelize.FLOAT,
    "rank": Sequelize.INTEGER,
    "numPlays": Sequelize.INTEGER,
    "rating": Sequelize.FLOAT,
    "owned": Sequelize.BOOLEAN,
    "preOrdered": Sequelize.BOOLEAN,
    "forTrade": Sequelize.BOOLEAN,
    "previousOwned": Sequelize.BOOLEAN,
    "want": Sequelize.BOOLEAN,
    "wantToPlay": Sequelize.BOOLEAN,
    "wantToBuy": Sequelize.BOOLEAN,
    "wishList": Sequelize.BOOLEAN,
    "userComment": Sequelize.STRING
  }
)

function connected() {
  app.route("/hello")
    .post(function (req, res) {
      res.json({"message": "Hello, " + req.body.name});
    })


  app.route("/game")
    .get(function (req, res) {
      Game.findAll().success(function (users) {
        res.send(users);
      })
    })
    .post(function (req, res) {
      Game.create(req.body).success(function (game) {
        res.json(game);
      })
    })


  app.route("/game/:id")
    .get(function (req, res) {
      var id = req.params.id;
      console.log(id);
      Game.find({where: {gameId: id}}).success(function (game) {
        res.json(game);
      })
    })
    .put(function (req, res) {
      var id = req.params.id;
      Game.find({where: {gameId: id}}).success(function (game) {
        game.updateAttributes(req.body).success(function () {
          res.json(game);
        })
      })
    })
    .delete(function (req, res) {
      var id = req.params.id;
      Game.find({where: {gameId: id}}).success(function (game) {
        game.destroy().success(function () {
          var message = "Deleted game " + id;
          res.send(message);
        })
      })
    });


  app.listen(3000, function () {
    console.log("listening on port 3000");
  })
}


sequelize.sync().success(connected);

