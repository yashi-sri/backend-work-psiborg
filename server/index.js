const express = require("express");
const app = express();
const cors = require("cors");

const modules = require("./modules");

const bodyparser = require("body-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

app.use(cors());
app.use(bodyparser.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

modules.sequelize.sync().then(async () => {
  console.log("DB connected");
});

app.listen(4000, () => {
  console.log("your device ready pair");
});
