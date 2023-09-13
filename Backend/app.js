const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

//routes

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const publicationsRouter = require("./routes/publications");
const authRouter = require("./routes/auth");
const addFriendRouter = require("./routes/addFriend");
const likePublication = require("./routes/likePublication");

const app = express();

const corsOptions = {
  origin: "192.168.1.21",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/publications", publicationsRouter);
app.use("/authentification", authRouter);
app.use("/friendship", addFriendRouter);
app.use("/likepublication", likePublication);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const port = 5000;

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Envoyer une réponse JSON avec le message d'erreur
  res.status(err.status || 500).json({ error: err.message });
});

// port listen
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`);
  }
});

module.exports = app;
