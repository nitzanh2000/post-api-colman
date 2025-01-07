const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const postsRouter = require("./routes/posts_route");
const commentsRouter = require("./routes/commants_route");
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
