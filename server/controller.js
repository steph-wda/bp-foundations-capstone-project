const axios = require("axios");
let triviaQA = [];

module.exports = {
  buildDatabase: (req, res) => {
    axios.get("https://opentdb.com/api.php?amount=50").then((response) => {
      response.data.results.forEach((result) => {
        triviaQA.push(result);
      });
      res.status(200).send(triviaQA);
    });
  },

  getDaily: (req, res) => {
    axios
      .get("https://opentdb.com/api.php?amount=1")
      .then((response) => {
        res.status(200).send(response.data.results);
      })
      .catch((err) => console.log(err));
  },

  getRandomDeck: (req, res) => {
    axios
      .get("https://opentdb.com/api.php?amount=10")
      .then((response) => {
        res.status(200).send(response.data.results);
      })
      .catch((err) => console.log(err));
},

  getStudyDeck: (req, res) => {
    const { amount, category, type, difficulty } = req.query;

    if (type === undefined && difficulty === undefined) {
      axios
        .get(
          `https://opentdb.com/api.php?amount=${amount}&category=${category}`
        )
        .then((response) => {
          res.status(200).send(response.data.results);
        });
    } else if (type !== undefined && difficulty === undefined) {
      axios
        .get(
          `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}`
        )
        .then((response) => {
          res.status(200).send(response.data.results);
        });
    } else if (type === undefined && difficulty !== undefined) {
      axios
        .get(
          `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
        )
        .then((response) => {
          res.status(200).send(response.data.results);
        });
    } else {
      axios
        .get(
          `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
        )
        .then((response) => {
          res.status(200).send(response.data.results);
        });
    }
  },

  createQA: (req, res) => {
    let {
      category,
      type,
      difficulty,
      question,
      correct_answer,
      incorrect_answers,
    } = req.body;
    

    let newSet = {
      category,
      type,
      difficulty,
      question,
      correct_answer,
      incorrect_answers,
    };

    triviaQA.push(newSet);
    console.log(triviaQA)
    res.status(200).send(triviaQA)
  },
};

