const { default: axios } = require("axios")

const dailyTriviaDiv = document.getElementsByClassName('daily-trivia')


const getDailyTriviaHandler = () => {
    axios.get("/api/daily")
    .then(res => {
        
    })
}

dailyTriviaDiv.addEventListener('load', getDailyTriviaHandler)

