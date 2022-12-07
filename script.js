var downloadTimer;
var timeleft = 60;
var userScore = 0;
var initials;


var questions = [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: ["<javascript>", "<js>", "<script>", "<scripting>"],
      correctAnswer: "<script>",
    },
    {
      question: "How does a for loop start?",
      answers: ["for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)", "for i = 1 to 5", "for (i <= 5; i++)"],
      correctAnswer: "for (i = 0; i <= 5; i++)",
    },
    {
      question: "How can you add a comment in a JavaScript?",
      answers: ["//This is a comment ", "'This is a comment", "<!--This is a comment-->", "#This is a comment"],
      correctAnswer: "//This is a comment",
    },
    {
      question: "In JavaScript, which of the following is a logical operator?",
      answers: ["|", "%", "/", "&&"],
      correctAnswer: "&&",
    },
    {
      question: "A named element in a JavaScript program that is used to store and retrieve data is a _____.",
      answers: ["Method", "assignment operator", "Variable", "string"],
      correctAnswer: "Variable",
    },
  ];


var startButton = document.getElementById("start-btn");
var starterScreen = document.getElementById("starterCode");
var nextButton = document.getElementById("next-btn");
var questionContainerElement = document.getElementById("question-container");
questionContainerElement.style.display = "none";
var questionElement = document.getElementById("questionAsked");
var answerButtonsElement = document.getElementById("answer-buttons");


var currentQuestionIndex = 0;

startButton.addEventListener("click", startGame);

function startGame() {
  starterScreen.style.display = "none";
  questionContainerElement.style.display = "block";
  setNextQuestion();
}


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
  
  showQuestion(questions[currentQuestionIndex]);
}

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