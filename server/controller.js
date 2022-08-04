const axios = require("axios");



module.exports = {
  

  getDaily: (req, res) => {


    axios.get('https://opentdb.com/api.php?amount=1')
        .then((response) =>{
          res.status(200).send(response.data.results)
        })
        .catch((err) => console.log(err));
   
    
}

}