var firebase = require("./firebase/firebase");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var admin = require("firebase-admin");

var serviceAccount = require("./config/cwdr-application-firebase-adminsdk-cifbw-3581e1d5ec.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let uid;
admin
  .auth()
  .createUser({
    email: "user13@example.com",
    emailVerified: false,
    password: "secretPassword",
    displayName: "John Doe",
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false,
  })
  .then(async (userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);

    await firebase.createUserProfileDocument(userRecord);

    uid = userRecord.uid;
    console.log(uid);
    admin
      .auth()
      .getUser(uid)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  })
  .catch((error) => {
    console.log("Error creating new user:", error);
  });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
