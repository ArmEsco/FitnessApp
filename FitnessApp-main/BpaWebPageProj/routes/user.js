const express = require("express");
const router = express.Router();
const passport = require("../encryption/Passport");
const path = require("path");
const { Users } = require(path.resolve(__dirname, "../models"));
const { hashPassword, comparePassword } = require("../encryption/HashPassword");
const { Op } = require("sequelize");

router.post("/login", function (req, res, next) {
  //Check to see if email and password are valid
  if (!req.body.email) {
    return res
      .status(400)
      .json({ success: false, message: " Email is required" });
  }

  if (!req.body.password) {
    return res
      .status(400)
      .json({ success: false, message: "Password is required" });
  }

  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: " Incorrect email or password",
        info: info,
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res
        .status(200)
        .json({ success: true, message: "Login successful" });
    });
  })(req, res, next);
});

router.get("/Authenticated", (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({ auth: true });
    } else {
      return res.status(401).json({ auth: false });
    }
  } catch (error) {
    console.error("Error checking authentication", error);
    return res.status(500).json({ message: " Internal Server Error" });
  }
});

// create new user
router.post("/newUser", async (req, res) => {
  console.log(req.body);
  let { userName, email, password, firstName, lastName } = req.body;

  try {
    if (!userName) {
      return res.status(400).json({ message: " UserName is required" });
    }

    email = email.toLowerCase();

    if (!email) {
      return res.status(400).json({ message: " Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: " Password is required" });
    }
    if (!firstName) {
      return res.status(400).json({ message: "First Name required" });
    }
    if (!lastName) {
      return res.status(400).json({ message: " Last name is required" });
    }

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email is not valid" });
    }

    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [{ Email: email }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: " Email already exist" });
    }

    const newUser = await Users.create({
      Username: userName,
      Email: email,
      Password: hashPassword(password),
      FirstName: firstName,
      LastName: lastName,
      Height: null,
      Weight: null,
      RoleId: 1,
    });
    return res
      .status(201)
      .json({ success: true, message: " User Created", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
