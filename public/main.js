const dailyTriviaDiv = document.getElementById("daily-trivia");
const randomizeBtn = document.getElementById("random-qa");
const randomDiv = document.getElementById("random-card-section");

const createCardBack = (correct, incorrect, cardNumber) => {
  
  //checks to see if an element with a class of card-body exists, if id does it will clear it
  if (document.getElementById("card-body") !== null) { 
    document.getElementById("card-body").innerHTML = "";
  }

  // will split string into an array
  let answersArray = incorrect.split(",");
  answersArray.push(correct);

  if(answersArray.length > 4){
    console.log('date')
  }
  
  //will randomize the answers so that the correct answer is not always in the same spot on the card
  for (let i = answersArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answersArray[i], answersArray[j]] = [answersArray[j], answersArray[i]];
  }
  
  let cardBack = `<div class="card-back">
  <div class="card-content">
  <div class="card-body-class" id="card-body"></div></div>
  </div>`;
  randomDiv.innerHTML += cardBack;

  //used id because there was an issue when I used getElementsByClassName for this part
  let answerBody = document.getElementById("card-body");


  answersArray.forEach((a) => {
    if (a === correct) {
      let correctAnswerPara = document.createElement("p");
      correctAnswerPara.setAttribute("class", "correct-answer");
      answerBody.appendChild(correctAnswerPara);
      correctAnswerPara.innerHTML = a;
    } else {
      let incorrectAnswerPara = document.createElement("p");
      incorrectAnswerPara.setAttribute("class", "incorrect-answer");
      answerBody.appendChild(incorrectAnswerPara);
      incorrectAnswerPara.innerHTML = a;
    }
  });
};

const createCardFront = (set) => {
  console.log(set);
  let currentCard = 1;
  let totalCards = 10;
  randomDiv.innerHTML = "";
  set.forEach((s) => {
    if (s.correct_answer.includes('"')) {
      console.log(`yes " ${currentCard}`);
      s.correct_answer = s.correct_answer.replace(/"/g, " ");
    }
    if (s.correct_answer.includes("&quot;")) {
      console.log(`yes quot ${currentCard}`);
      s.correct_answer = s.correct_answer.replace(/&quot;/g, " ");
      s.incorrect_answers = s.incorrect_answers.map((ic) => {
        return ic.replace(/&quot;/g, '"');
      });
    }
    if (s.correct_answer.includes("&#039;")) {
      console.log(`yes 39 ${currentCard}`);
      s.correct_answer = s.correct_answer.replace(/&#039;/g, "'");
      s.incorrect_answers = s.incorrect_answers.map((ic) => {
        return ic.replace(/&#039;/g, "'");
      });
    }

    let triviaCard = `<div class="inner">
        <div class="card-front">
        <div class="number-text"> ${currentCard} / ${totalCards}</div>
        <p class="qa-area">${s.question}</p>
        <div class="answer" onclick="createCardBack('${s.correct_answer}', '${s.incorrect_answers}','${currentCard}' )">Flip</div>
        </div>`;
    randomDiv.innerHTML += triviaCard;
    currentCard++;
  });
};

const getDailyTriviaHandler = () => {
  axios.get("/api/daily").then((res) => {
    let triviaCard = `<div class="trivia-card">
                   <p>${res.data[0].question}</p>
                   <p>${res.data[0].correct_answer}</p>
                  `;
    dailyTriviaDiv.innerHTML += triviaCard;
  });
};

const getRandomQAHandler = (e) => {
  e.preventDefault();
  axios.get("api/random").then((res) => {
    const randomSet = res.data;
    createCardFront(randomSet);
  });
};

//window.addEventListener("load", getDailyTriviaHandler)
//dailyTriviaDiv.addEventListener('load', getDailyTriviaHandler)
document.addEventListener("DOMContentLoaded", getDailyTriviaHandler);
randomizeBtn.addEventListener("click", getRandomQAHandler);
