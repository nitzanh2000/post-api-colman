const dotenv = require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT

app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
  });

mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const postsRouter = require("./routes/posts_route");
app.use("/posts", postsRouter);
