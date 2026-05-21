require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const port = process.env.PORT || 3001;
const app = express();

app.use(express.static("../frontend/dist"));

app.use(cookieParser());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", routes);

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("MongoDB connected!");

    app.listen(port, () => {
      console.log(`Server has been started on port ${port}...`);
    });
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  }
}

startServer();
