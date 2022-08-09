const dailyTriviaDiv = document.getElementById("daily-trivia");
const randomizeBtn = document.getElementById("random-qa");
const randomDiv = document.getElementById("random-card-section");
const studyCategory = document.getElementById("deck-category")
const studyAmount = document.getElementById("deck-amount")
const studyType = document.getElementById("deck-type")
const studyDifficulty = document.getElementById("deck-difficulty")
const studyBtn = document.getElementById("study-qa");
const studyDiv = document.getElementById("study-card-section");




const rightAnswerClicked = () => {
  let right = document.getElementById("card-correct-answer");
  let rightSpan = document.createElement("span");
  right.appendChild(rightSpan);
  rightSpan.innerHTML = "Correct! &#128522;";
};

const wrongAnswerClicked = () => {
  //   if(document.getElementsByTagName('span').length !== 0){
  //     document.getElementById('card-incorrect-answer').removeChild('span')
  // }
  let wrong = document.getElementById("card-incorrect-answer");
  let wrongSpan = document.createElement("span");
  wrong.appendChild(wrongSpan);
  wrongSpan.innerHTML = "Incorrect! &#128542;";
  console.log(wrong);
  console.log(wrongSpan);
};

const createCardBack = (correct, incorrect) => {
  //checks to see if an element with a class of card-body exists, if id does it will clear it
  if (document.getElementById("card-body") !== null) {
    document.getElementById("card-body").innerHTML = "";
  }

  // will split string into an array
  let answersArray = incorrect.split(",");
  answersArray.push(correct);

  if (answersArray.length > 4) {
    console.log("date");

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
      correctAnswerPara.setAttribute("id", "card-correct-answer");
      answerBody.appendChild(correctAnswerPara);
      correctAnswerPara.innerHTML = a;
      correctAnswerPara.addEventListener("click", rightAnswerClicked);
    } else {
      let incorrectAnswerPara = document.createElement("p");
      incorrectAnswerPara.setAttribute("id", "card-incorrect-answer");
      answerBody.appendChild(incorrectAnswerPara);
      incorrectAnswerPara.innerHTML = a;
      incorrectAnswerPara.addEventListener("click", wrongAnswerClicked);
    }
  });
};

const createCardFrontRandom = (set) => {
  if(studyDiv.innerHTML){
    console.log('div detected')
    studyDiv.innerHTML=''
  }
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

    let triviaCard = `<div class="random-inner">
                      <div class="random-card-front">
                      <div class="number-text"> ${currentCard} / ${totalCards}</div>
                      <p class="qa-area">${s.question}</p>
                      <div class="random-answer" onclick="createCardBack('${s.correct_answer}', '${s.incorrect_answers}' )">Flip</div>
                      </div>`;
    randomDiv.innerHTML += triviaCard;
    currentCard++;
  });
};


const getRandomQAHandler = (e) => {
  e.preventDefault();
  axios.get("api/random").then((res) => {
    const randomSet = res.data;
    createCardFrontRandom(randomSet);
  });
}

const createDBHandler = () => {
  if(localStorage.length > 0){
    localStorage.clear()
  }
  axios.get("/api/db").then(res => {
    let triviaDB = JSON.stringify(res)
    localStorage.setItem('triviaDB', triviaDB)
  })
}


const createCardBackStudy = (correct) => {
  //checks to see if an element with a class of card-body exists, if id does it will clear it
  if (document.getElementById("card-body") !== null) {
    document.getElementById("card-body").innerHTML = "";
  }

  let cardBack = `<div class="card-back">
  <div class="card-content">
  <div class="card-body-class" id="card-body"></div></div>
  </div>`;
  studyDiv.innerHTML += cardBack;

  //used id because there was an issue when I used getElementsByClassName for this part
  let answerBody = document.getElementById("card-body");

  let correctAnswerPara = document.createElement("p");
  correctAnswerPara.setAttribute("id", "card-correct-answer");
  answerBody.appendChild(correctAnswerPara);
  correctAnswerPara.innerHTML = correct;
      
}


const createFrontCardStudy = (set) => {
  if(randomDiv.innerHTML){
    console.log('div detected')
    randomDiv.innerHTML=''
  }

  console.log(set);
  let currentCard = 1;
  let totalCards = set.length;
  studyDiv.innerHTML = "";
  set.forEach((s) => {
    if (s.correct_answer.includes('"')) {
      console.log(`yes " ${currentCard}`);
      s.correct_answer = s.correct_answer.replace(/"/g, " ");
      

    }
    if (s.correct_answer.includes("&quot;")) {
      console.log(`yes quot ${currentCard}`);
      s.correct_answer = s.correct_answer.replace(/&quot;/g, " ");
    }
    if (s.correct_answer.includes("&#039;")) {
      console.log(`yes 39 ${currentCard}`);
      s.correct_answer = s.correct_answer.replace(/&#039;/g, "'");
    }

    let triviaCard = `<div class="study-inner">
                      <div class="study-card-front">
                      <div class="number-text"> ${currentCard} / ${totalCards}</div>
                      <p class="sq-area">${s.question}</p>
                      <div class="study-answer" onclick="createCardBackStudy('${s.correct_answer}')">Flip</div>
                      </div>`;
    studyDiv.innerHTML += triviaCard;
    currentCard++;
  });

}

const createStudyQAHandler = (e) => {
  e.preventDefault()
  let category = studyCategory.value
  let amount = studyAmount.value
  let type = studyType.value
  let difficulty = studyDifficulty.value

  if(type === 'any' && difficulty === 'any'){
    axios.get(`/api/study?amount=${amount}&category=${category}`).then(res => {
      const studySet = res.data;
      createFrontCardStudy(studySet)
    })
   }else if(type !== 'any' && difficulty === 'any'){
    axios.get(`/api/study?amount=${amount}&category=${category}&type=${type}`).then(res => {
      const studySet = res.data;
      createFrontCardStudy(studySet)
    })
   }else if(type === 'any' && difficulty !== 'any'){
    axios.get(`/api/study?amount=${amount}&category=${category}&difficulty=${difficulty}`).then(res => {
      const studySet = res.data;
      createFrontCardStudy(studySet)
    })
   }else{
    axios.get(`/api/study?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`).then(res => {
      const studySet = res.data;
      createFrontCardStudy(studySet)
    })
   }
}




const getDailyTriviaHandler = () => {
  axios.get("/api/daily").then((res) => {
    let triviaCard = `<div class="trivia-card">
                   <p>${res.data[0].question}</p>
                   <p>${res.data[0].correct_answer}</p>
                  `;
    dailyTriviaDiv.innerHTML += triviaCard;
  });
};

document.addEventListener("DOMContentLoaded", getDailyTriviaHandler);
document.addEventListener("DOMContentLoaded", createDBHandler);
randomizeBtn.addEventListener("click", getRandomQAHandler);
studyBtn.addEventListener('click', createStudyQAHandler)
