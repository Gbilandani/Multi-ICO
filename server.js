const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const icoRoute = require("./routes/icoroutes");

app.use("/icoinstallment", icoRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT + "...");
});
