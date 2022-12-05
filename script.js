//Global Variables set
var downloadTimer;
var timeleft = 60;
var userScore = 0;
var initials;

//Quiz Questions & Answers
var questions = [
  {
    question: "What is 2 + 2?",
    answers: ["4", "22", "5", "2"],
    correctAnswer: "4",
  },
  {
    question: "What is 5 + 2?",
    answers: ["2", "7", "11", "6"],
    correctAnswer: "7",
  },
  {
    question: "What is 9 + 10?",
    answers: ["4", "21", "7", "19"],
    correctAnswer: "21",
  },
  {
    question: "What is 11 + 5?",
    answers: ["14", "12", "17", "16"],
    correctAnswer: "16",
  },
  {
    question: "What is 34 + 9?",
    answers: ["3", "34", "43", "4"],
    correctAnswer: "43",
  },
];

//Retrieve elements from external html using id
var startButton = document.getElementById("start-btn");
var starterScreen = document.getElementById("starterCode");
var nextButton = document.getElementById("next-btn");
var questionContainerElement = document.getElementById("question-container");
questionContainerElement.style.display = "none";
var questionElement = document.getElementById("questionAsked");
var answerButtonsElement = document.getElementById("answer-buttons");

//Start at question 1
var currentQuestionIndex = 0;
//When start button is clicked... question appears
startButton.addEventListener("click", startGame);

function startGame() {
  starterScreen.style.display = "none";
  questionContainerElement.style.display = "block";
  setNextQuestion();
}

//Function for when quiz is finished and or when timer has run out
function close() {
  clearInterval(downloadTimer);
  document.getElementById("countdown").innerHTML = "Time is up!";
  var containerMain = document.getElementById("container");
  containerMain.style.display = "none";

  initials = document.getElementById("userInput").value;

  document.getElementById("userInitials").innerHTML = initials;
  document.getElementById("score").innerHTML = userScore;

  var containerMain = document.getElementById("resultsContainer");
  containerMain.style.display = "block";

  localStorage.setItem("initials", initials);
  localStorage.setItem("score", userScore);

  var storedInitials = localStorage.getItem("initials");
  var storedScore = localStorage.getItem("score");

  alert(
    "Stored initials are " +
      storedInitials +
      " and the stored score is " +
      storedScore
  );
}

//timer countdown... if time has ran out then close
function function1() {
  document.getElementById("countdown").innerHTML =
    timeleft + "&nbsp" + "seconds remaining";

  timeleft -= 1;

  if (timeleft <= 0) {
    close();
  }
}

function setNextQuestion() {
  downloadTimer = setInterval(function1, 1000);
  //start timer and display the time remaining to the user
  showQuestion(questions[currentQuestionIndex]);
}
//user answer button interaction
function showQuestion(question) {
  questionElement.textContent = question.question;
  var answersArea = document.getElementById("answer-buttons");
  answersArea.innerHTML = "";
  for (var i = 0; i < question.answers.length; i++) {
    var answerButton = document.createElement("button");
    answerButton.setAttribute("value", question.answers[i]);
    answerButton.textContent = question.answers[i];
    answerButton.addEventListener("click", selectAnswer);
    answersArea.appendChild(answerButton);
  }
}

//correct and incorrect answers interaction
function selectAnswer() {
  if (this.value === questions[currentQuestionIndex].correctAnswer) {
    userScore = userScore + 1;
    alert("correct " + userScore);
  } else {
    if (userScore > 0) {
      userScore = userScore - 1;
    }

    alert("incorrect " + userScore);

    clearInterval(downloadTimer);
    timeleft -= 5;
    downloadTimer = setInterval(function1, 1000);
    // check if any time is remaining on timer and end quiz if not
    if (timeleft <= 0) {
      close();
    }
  }
  currentQuestionIndex++;

  var amountOfQuestions = questions.length;

  if (amountOfQuestions === currentQuestionIndex) {
    close();
  } else {
    showQuestion(questions[currentQuestionIndex]);
  }
}