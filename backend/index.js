require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require('./db/conn');


app.use(express.json());

//config cors 
app.use(cors({ Credentials: true, origin: "http://localhost:3000" }));
//public
app.use(express.static("public"));

//Routes
const UserRoutes = require("./routes/UserRoutes");
const PetRoutes = require("./routes/PetRoutes");

app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);


app.listen(5000);
