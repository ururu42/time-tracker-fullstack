require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const port = 3001;
const app = express();

app.use(express.static("../frontend/dist"));

app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(port, () => {
      console.log(`Server has been started on port ${port}...`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
