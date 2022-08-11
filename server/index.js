const path = require('path')
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static("public"));

const { 
  buildDatabase,
  getDaily, 
  getRandomDeck,
  getStudyDeck,
  createQA
} = require('./controller')

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });


app.get("/api/db", buildDatabase)
app.get("/api/daily", getDaily)
app.get("/api/random", getRandomDeck)
app.get("/api/study", getStudyDeck)
app.post("/api/addqa", createQA)





const SERVER_PORT = process.env.PORT || 4000
app.listen(`${SERVER_PORT}`, () => console.log(`Server running on ${SERVER_PORT}` ));