const axios = require("axios");
let triviaQA =[]
globalId = 50



module.exports = {
  
  buildDatabase: (req, res) => {
    id = 0
    axios.get('https://opentdb.com/api.php?amount=50')
          .then((response) =>{
            response.data.results.forEach(result => {
                result.id = id
                id++
                triviaQA.push(result)
            })
            res.status(200).send(triviaQA)
          })
          .catch((err) => console.log(err));
  },

  getDaily: (req, res) => {


    axios.get('https://opentdb.com/api.php?amount=1')
        .then((response) =>{
          res.status(200).send(response.data.results)
        })
        .catch((err) => console.log(err));  
},

getRandomDeck: (req, res) => {
  axios.get('https://opentdb.com/api.php?amount=10')
        .then((response) =>{
          res.status(200).send(response.data.results)
        })
        .catch((err) => console.log(err));  
  

}

}