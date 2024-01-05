const express = require("express");
const router = express.Router();
const user = require("../Models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const isNumber = /^\d{10}$/.test(emailId) && emailId;
    const findUser = await user.findOne({
      $or: [{ emailId }, { mobilenumber: isNumber }],
    });

    if (!findUser) {
      res.send({ message: "User doesnt exists" });
    } else {
      bcrypt.compare(password, findUser.password).then((result) => {
        if (result) {
          const token = jwt.sign(findUser.toJSON(), process.env.Secret_key);
          res.send({
            message: `Successfully logged in`,
            name: findUser.username,
            token,
          });
        } else
          res
            .status(401)
            .json({ message: "Invalid User , authentication failed" });
      });
    }
  } catch (err) {
    console.log(`Something went wrong`);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { emailId, mobilenumber, password, username } = req.body;
    const checkUser = await user.findOne({
      emailId,
      mobilenumber,
    });

    if (!checkUser) {
      const salt = 10;
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = await user.create({
        emailId,
        mobilenumber,
        password: hashPassword,
        username,
      });
      const token = jwt.sign(newUser.toJSON(), process.env.Secret_key);
      res.send({
        message: `${username} registered successfully`,
        name: username,
        token,
      });
    } else {
      res.send({ message: "User already exists, kindly login" });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map((err) => err.message);
      res.json({ errors: errorMessages });
    } else {
      console.log(err, "Something went wrong");
    }
  }
});

module.exports = router;
