const dailyTriviaDiv = document.getElementById("daily-trivia");
const randomizeBtn = document.getElementById("random-qa");
const randomDiv = document.getElementById("random-card-section");

// const displayTrivia = (trivia) => {
//     let divName = 0; //setting name for each div created. Will make it easier to delete when it comes time to
//     trivia.forEach((set) => {
//       let triviaCard = `<div class="trivia-card" name=${divName}>
//                       <p>${set.question}</p>
//                       <button onclick="displayAnswer(${set.correct_answer})" >Show answer</button>
//                       <button onclick="deleteTrivia(${set.id});makeCardInvisible(${divName})">Delete Question</button>
//                       </div>
//                       `;
//       triviaDiv.innerHTML += triviaCard;
//       divName++;
//     });
//   };

const createCard = (set) => {
    console.log(set)
    randomDiv.innerHTML=''
    set.forEach(s => {
        let triviaCard = `<div class="trivia-card">
        <p>${s.question}</p>
        <div class="answer">Click here to show answer</div>
        </div>`
       randomDiv.innerHTML += triviaCard;
    })
    

    
}

const getDailyTriviaHandler = () => {
  axios.get("/api/daily").then((res) => {
    
    let triviaCard = `<div class="trivia-card">
                   <p>${res.data[0].question}</p>
                  `;
    dailyTriviaDiv.innerHTML += triviaCard;
  });
};

const getRandomQAHandler = (e) => {
    e.preventDefault()
  axios.get("api/random").then((res) => {
    const randomSet = res.data
    createCard(randomSet)
  });
};

//window.addEventListener("load", getDailyTriviaHandler)
//dailyTriviaDiv.addEventListener('load', getDailyTriviaHandler)
document.addEventListener("DOMContentLoaded", getDailyTriviaHandler);
randomizeBtn.addEventListener("click", getRandomQAHandler);
