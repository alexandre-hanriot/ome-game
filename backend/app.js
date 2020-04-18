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

// Synchronisation des modèles avec la bdd
const db = require("./models/index");

// L'option force permet de tout supprimer avant, et donc de tout recréer
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

db.sequelize.sync().then(() => {
    console.log("Synchronisation avec la bdd réalisée avec succès");
});

const app = express();

app.use(logger("dev"));

// Paramérage des CORS : A CONFIGURER
// var corsOptions = {
//     origin: "http://example.com",
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:8080",
    })
);

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

module.exports = app;
