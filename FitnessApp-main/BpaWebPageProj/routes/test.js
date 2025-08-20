const express = require("express");
const router = express.Router();

//Window and Mac use
const path = require("path");
const { Users } = require(path.resolve(__dirname, "../models"));

// testing to get cookies
router.get("/test1", (req, res) => {
  res.cookie("hello", "world", { maxAge: 50000 });
  res.status(201).send("Got this cookie");
});

router.get("/test", async (req, res) => {
  try {
    const users = await Users.findAll();
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addUser", async (req, res) => {
  try {
    const newUser = await Users.create({
      //could also use req.email and req.username to get the password and user name for login
      Username: "12",
      Email: " 1269@gmail.com",
      Password: " Jones123 ",
      Height: null,
      Weight: null,
      RoleID: 1,
    });
    return res
      .status(201)
      .json({ success: true, message: "User created", user: newUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
