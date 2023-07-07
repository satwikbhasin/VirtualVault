var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
const bodyParser = require('body-parser');

var productsRouter = require("./routes/products");
var s3MethodsRouter = require("./routes/s3Methods");
var usersRouter = require("./routes/users");
var contactDetailsRouter = require("./routes/contactDetails");
var inquiryRouter = require("./routes/inquiry");

mongoose
  .connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
    }
  )
  .catch((err) => console.log(err));

var app = express();

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/products", productsRouter);
app.use("/s3Methods", s3MethodsRouter);
app.use("/users", usersRouter);
app.use("/contactDetails", contactDetailsRouter);
app.use("/inquiry", inquiryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
