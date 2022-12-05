var timerDownalod;
var timeleft = 60;
var playerrScore = 0;
var playerInitials;

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
var answerButtonsElement

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