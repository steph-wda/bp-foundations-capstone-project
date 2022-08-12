const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");

const modalContainerDiv = document.getElementById("my-modal");
const modalContentDiv = document.querySelector(".modal-content");

const dailyTriviaH2 = document.getElementById("daily-trivia-heading");
const dailyTriviaDiv = document.getElementById("daily-trivia");

const randomizeBtn = document.getElementById("random-qa");
const randomRow = document.querySelector(".random-row");

const studyBtn = document.getElementById("study-qa");
const studyRow = document.querySelector(".study-row");
const studyCategory = document.getElementById("deck-category");
const studyAmount = document.getElementById("deck-amount");
const studyType = document.getElementById("deck-type");
const studyDifficulty = document.getElementById("deck-difficulty");

const addQABtn = document.getElementById("sumbit-new-qa");
const addCategory = document.getElementById("question-category");
const addType = document.getElementById("question-type");
const addDifficulty = document.getElementById("question-difficulty");
const addQuestion = document.getElementById("trivia-question");
const addCorrectAnswer = document.getElementById("correct-answer");
const addIncorrectAnswer = document.getElementById("incorrect-answer");

const getDailyTriviaHeading = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  let day = weekdays[d.getDay()];
  let month = months[d.getMonth()];
  let date = d.getDate();

  dailyTriviaH2.innerHTML = `Daily Trivia For ${day}, ${month} ${date}`;
};

const displayResults = (results) => {
  if (document.getElementsByClassName("close") !== null) {
    modalContentDiv.innerHTML = "";
  }

  if (results.length < 1) {
    alert("No matches found");
  } else {
    let numberOfMatches = results.length / 2;
    let resultsHeading = document.createElement("h3");
    let mSpan = document.createElement("span");
    mSpan.setAttribute("class", "close");
    modalContentDiv.appendChild(mSpan);
    modalContentDiv.appendChild(resultsHeading);
    mSpan.innerHTML = `&times;`;
    resultsHeading.innerHTML = `${numberOfMatches} Matches Returned`;
    mSpan.onclick = function () {
      modalContainerDiv.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target === modalContainerDiv) {
        modalContainerDiv.style.display = "none";
      }
    };

    for (let i = 0; i < results.length; i = i + 2) {
      j = i + 1;
      let qPara = document.createElement("p");
      let aPara = document.createElement("p");
      modalContentDiv.appendChild(qPara);
      modalContentDiv.appendChild(aPara);
      modalContentDiv.append(document.createElement("hr"));
      qPara.innerHTML = results[i];
      aPara.innerHTML = results[j];
    }

    modalContainerDiv.style.display = "block";
  }
};

const getResults = (e) => {
  e.preventDefault();
  let searchArray = JSON.parse(localStorage.getItem("triviaDB"));
  console.log(typeof searchArray[0].question);

  let regex = new RegExp(searchInput.value, "i");

  console.log(searchInput.value);

  let results = [];

  searchArray.forEach((set) => {
    if (set.question.search(regex) !== -1) {
      console.log(set.question);
      results.push(set.question);
      results.push(set.correct_answer);
    }
  });
  displayResults(results);
};

const rightAnswerClicked = () => {
  alert("Correct!")
}

const wrongAnswerClicked = () => {
  alert("Incorrect! Try Again.")
};

const displayAnswers = (correct, incorrect, name) => {
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

  //used id because there was an issue when I used getElementsByClassName for this part
  let answerBody = document.getElementsByName(name);
  console.log(answerBody)

  answersArray.forEach((a) => {
    let count = 1;
    if (a === correct) {
      let correctAnswerPara = document.createElement("p");
      correctAnswerPara.setAttribute("name", "${count}ap");
      answerBody[0].appendChild(correctAnswerPara)
      correctAnswerPara.innerHTML = a;
      
      correctAnswerPara.addEventListener("click", rightAnswerClicked);
      count++;
    } else {
      let incorrectAnswerPara = document.createElement("p");
      incorrectAnswerPara.setAttribute("name", "${count}ap");
      answerBody[0].appendChild(incorrectAnswerPara)
      incorrectAnswerPara.innerHTML = a;
      incorrectAnswerPara.addEventListener("click", wrongAnswerClicked);
      count++;
    }
  });
};

const createCardFrontRandom = (set) => {
  if (randomRow.innerHTML !== null) {
    randomRow.innerHTML = "";
  }
  let currentCard = 1;
  studyRow.innerHTML = "";
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

    let content = `<div class="card">
                      <div class="random-question">
                      <h3>${s.question}</h3>
                      <div>
                      <div class="content">
                      <div name="${currentCard}a"></div>
                      <div class="button" onclick="displayAnswers('${s.correct_answer}', '${s.incorrect_answers}','${currentCard}a' )">Click To Guess Answer</div>
                      </div>
                      </div>`;
    randomRow.innerHTML += content;
    currentCard++;
    
  });
  console.log(set);
};

const getRandomQAHandler = (e) => {
  e.preventDefault();
  axios.get("api/random").then((res) => {
    const randomSet = res.data;
    createCardFrontRandom(randomSet);
  });
};

const createDBHandler = () => {
  if (localStorage.length < 1) {
    axios.get("/api/db").then((res) => {
      let triviaDB = JSON.stringify(res.data);
      localStorage.setItem("triviaDB", triviaDB);
    });
  }
};

const revealAnswer = (name) => {
  let show = document.getElementsByName(name);
  show[0].style.fontStyle = "italic";
  show[0].style.display = "block";
};

const createStudySlides = (set) => {
  if (randomRow.innerHTML) {
    console.log("div detected");
    randomRow.innerHTML = "";
  }
  let currentCard = 1;
  studyRow.innerHTML = "";


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


    let content = ` <div class="card">
                      <div class="study-question">
                      <h3>${s.question}</h3>
                      </div>
                      <div style="text class="content">
                        <div class="revealed" style="display:none; color:white" name="${currentCard}">${s.correct_answer}</div>
                        <div class="button" onclick="revealAnswer('${currentCard}')">Reveal Answer</div>
                      </div>
                      </div>`;

                      
                   
    studyRow.innerHTML += content;
    currentCard++;
  });
};

const createStudyQAHandler = (e) => {
  e.preventDefault();
  let category = studyCategory.value;
  let amount = studyAmount.value;
  let type = studyType.value;
  let difficulty = studyDifficulty.value;

  if (type === "any" && difficulty === "any") {
    axios
      .get(`/api/study?amount=${amount}&category=${category}`)
      .then((res) => {
        const studySet = res.data;
        createStudySlides(studySet);
      });
  } else if (type !== "any" && difficulty === "any") {
    axios
      .get(`/api/study?amount=${amount}&category=${category}&type=${type}`)
      .then((res) => {
        const studySet = res.data;
        createStudySlides(studySet);
      });
  } else if (type === "any" && difficulty !== "any") {
    axios
      .get(
        `/api/study?amount=${amount}&category=${category}&difficulty=${difficulty}`
      )
      .then((res) => {
        const studySet = res.data;
        createStudySlides(studySet);
      });
  } else {
    axios
      .get(
        `/api/study?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
      )
      .then((res) => {
        const studySet = res.data;
        createStudySlides(studySet);
      });
  }
};

const addQuestionHandler = (e) => {
  e.preventDefault();
  let icArray;
  if (addIncorrectAnswer.value.includes(",")) {
    icArray = addIncorrectAnswer.value.split(",");
  } else {
    icArray = [];
    icArray.push(addIncorrectAnswer.value);
  }

  let bodyObj = {
    category: addCategory.value,
    type: addType.value,
    difficulty: addDifficulty.value,
    question: addQuestion.value,
    correct_answer: addCorrectAnswer.value,
    incorrect_answers: icArray,
  };

  axios.post("/api/addqa", bodyObj).then((response) => {
    let triviaDB = JSON.parse(localStorage.getItem("triviaDB"));
    let responseArray = response.data;
    if (responseArray.length > 1) {
      triviaDB.push(responseArray[responseArray.length - 1]);
    } else {
      triviaDB.push(responseArray[0]);
    }
    localStorage.setItem("triviaDB", JSON.stringify(triviaDB));
    alert("Your question and answer have been saved!");
  });
};

const getDailyTriviaHandler = () => {
  axios.get("/api/daily").then((res) => {
    let triviaCard = `<div class="trivia-card">
                   <p>${res.data[0].question}</p>
                   <p style="font-style:italic">${res.data[0].correct_answer}</p>
                   </div>
                  `;
    dailyTriviaDiv.innerHTML += triviaCard;
  });
};

document.addEventListener("DOMContentLoaded", getDailyTriviaHeading);
document.addEventListener("DOMContentLoaded", getDailyTriviaHandler);
document.addEventListener("DOMContentLoaded", createDBHandler);
randomizeBtn.addEventListener("click", getRandomQAHandler);
studyBtn.addEventListener("click", createStudyQAHandler);
addQABtn.addEventListener("click", addQuestionHandler);
searchBtn.addEventListener("click", getResults);
