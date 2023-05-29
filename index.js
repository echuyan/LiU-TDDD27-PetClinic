
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const signUp = require("./server/api/SignUp");
const logIn = require("./server/api/LogIn");
const homepage = require("./server/api/Homepage");
const users = require("./server/api/Users.js");
const pets = require("./server/api/Pets.js");
const http = require("http");
const server = http.createServer(app);
app.use(express.static('./client/src/static'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", signUp);
app.use("/", logIn);
app.use("/", homepage);
app.use("/", users);
app.use("/", pets);

// Port of the server
const PORT = process.env.PORT || 8080;
server.listen(PORT);
