const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const customerRoutes = require("./routes/customers");
const { createUser, login } = require("./controllers/user");
const { auth } = require("./middlewares/auth");
const { mongoRoute, mongoSettings } = require("./utils/mongoSettings");

const app = express();

mongoose.connect(mongoRoute, mongoSettings);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

app.post("/signin", login);
app.post("/signup", createUser);

app.use("/users", auth, userRoutes);
app.use("/cards", auth, cardRoutes);
app.use("/customers", auth, customerRoutes);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });

  next();
});

app.use("*", (req, res) => {
  res.send("Это не те роуты, которых вы ищете", 404);
});

app.listen(5000, () => {});
