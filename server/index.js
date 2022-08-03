const path = require('path')
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "/../public")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
  });




const SERVER_PORT = process.env.PORT || 4000
app.listen(`${SERVER_PORT}`, () => console.log(`Server running on ${SERVER_PORT}` ));