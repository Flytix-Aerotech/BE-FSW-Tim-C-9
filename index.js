require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { sequelize: db } = require("./models/index.js");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", function (req, res) {
  res.send("testing");
});

app.use(require("./routes"));

// running app
db.authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT} and successfully connected to database`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

