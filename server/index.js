const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mong = require("mongoose");
const auth = require("./Routes/auth");
const prod = require("./Routes/products");
const Cors = require("cors");
require("dotenv").config();

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/auth", auth);
app.use("/api/products", prod);

app.listen(process.env.PORT, async () => {
  try {
    await mong
      .connect(process.env.MongoDB_URL)
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((err) => console.log(err, "Couldnt connect to DB"));
    console.log(`Server is running at https://localhost:${4000}`);
  } catch (err) {
    console.log(err, "Couldnt connect to  Server");
  }
});
