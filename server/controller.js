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
  

},

getStudyDeck: (req, res) => {
  const {amount,category,type,difficulty} = req.query
  
  if(type === undefined && difficulty === undefined){
    axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}`).then(response => {
      res.status(200).send(response.data.results)
    })
   }else if(type !== undefined && difficulty === undefined){
    axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}`).then(response => {
      res.status(200).send(response.data.results)
    })
   }else if(type === undefined && difficulty !== undefined){
    axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`).then(response => {
      res.status(200).send(response.data.results)
    })
   }else{
    axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`).then(response => {
      res.status(200).send(response.data.results)
    })
   }

}

}