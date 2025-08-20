const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const path = require("path"); // used for Mac and Window Users
const passport = require(path.join(__dirname, "./encryption/Passport.js"));

// Testing Route
const test = require(path.join(__dirname, "routes", "test"));
const user = require(path.join(__dirname, "routes", "user"));

// cookie middleware
app.use(cookieParser("helloworld"));

// Parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
const corsOptions = {
  origin: "http://127.0.0.1:5500", // Replace this with the frontend origin
  credentials: true, // Allow cookies or authentication headers
};
app.use(cors(corsOptions)); // Apply CORS to all routes

// Configure session options
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 3600000, // Set the cookie expiration time
      httpOnly: true,
    },
    credentials: true, // Enable credentials in cross-origin requests
  })
);

// Using passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/test", test);
app.use("/auth", user);
// app.use("/login", user);
// app.use("/newUser", user);
// app.use("/Authenticated", user);

// Original syntax
const db = require("./models");

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running: http://localhost:3001");
  });
});
