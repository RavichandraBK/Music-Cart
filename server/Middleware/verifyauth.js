const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyauth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      res.status(401).send({ message: "Unauthorised Access" });
    } else {
      const decode = jwt.verify(token, process.env.Secret_key);
      next();
    }
  } catch (err) {
    console.log(err, "Error in token");
    res.status(401).send({ message: "Unauthorised" });
  }
};

module.exports = verifyauth;
