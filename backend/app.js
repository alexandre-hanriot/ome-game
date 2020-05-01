const express = require("express");

// Autres imports
const path = require("path");
var cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Importation des routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const offersRouter = require("./routes/offer");
const reservationsRouter = require("./routes/reservation");
const gamesRouter = require("./routes/game");
const game_categoriesRouter = require("./routes/game_category");
const favoritesRouter = require("./routes/favorite");
const messagesRouter = require("./routes/message");
const uploadRouter = require("./routes/upload");

// Synchronisation des modèles avec la bdd
const db = require("./models/index");

// L'option force permet de tout supprimer avant, et donc de tout recréer
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

db.sequelize.sync().then(() => {
  console.log("Synchronisation avec la bdd réalisée avec succès");
});

console.log(process.env);

const app = express();

app.use(logger("dev"));

// Paramérage des CORS : A CONFIGURER
// var corsOptions = {
//     origin: "http://example.com",
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));
const whitelist = [
  "http://localhost:8080",
  "http://ec2-54-167-103-17.compute-1.amazonaws.com",
];
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // temporaire pour insomnia, A supprimer
        // callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Protège de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP
var helmet = require("helmet");
app.use(helmet());

// Paramétrage des requêtes et réponses
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Définition des routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/offers", offersRouter);
app.use("/reservations", reservationsRouter);
app.use("/games", gamesRouter);
app.use("/game_categories", game_categoriesRouter);
app.use("/favorites", favoritesRouter);
app.use("/messages", messagesRouter);
app.use("/upload", uploadRouter);

module.exports = app;
