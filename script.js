// Define variables
const startButton = document.getElementById("start-button");
const questionsDiv = document.getElementById("questions");
const endDiv = document.getElementById("end");
const questionEl = document.getElementById("question");
const answerButtons = document.querySelectorAll("input[name='answer']");
const scoreEl = document.getElementById("score");
const initialsEl = document.getElementById("initials");
const highscoresButton = document.getElementById("highscores");
const timeEl = document.getElementById("time");
let questionIndex = 0;
let score = 0;
let timeLeft = 75;

// Define Questions
const questions = [
    {
        question: "What does HTML stand for?",
        answers: {
            A: "Hypertext Markup Language",
            B: "High Text Markup Language",
            C: "Hyper Tabular Markup Language",
            D: "Hyper Technology Markup Language"
        },
        correctAnswer: "A"
    },
    {
        question: "What does CSS stand for?",
        answers: {
            A: "Cascading Style Sheets",
            B: "Computer Style Sheets",
            C: "Colorful Style Sheets",
            D: "Creative Style Sheets"
        },
        correctAnswer: "A"
    },
    {
        question: "What does JavaScript stand for?",
        answers: {
            A: "Just Simple Actionscript",
            B: "Java Syntax Application",
            C: "JavaScript Syntax Application",
            D: "Just Syntax Actionscript"
        },
        correctAnswer: "C"
    }
];

// Start the quiz when the start button is clicked
startButton.addEventListener("click", startQuiz);

// Set the timer and start the quiz
function startQuiz() {
    startButton.classList.add("hide");
    questionsDiv.classList.remove("hide");
    setTimer();
    renderQuestion();
}

// Set the timer
function setTimer() {
    let timerInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

// Render the questions
function renderQuestion() {
    questionEl.textContent = questions[questionIndex].question;
    const answers = Object.values(questions[questionIndex].answers);
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].value = answers[i];
        answerButtons[i].nextElementSibling.textContent = answers[i];
    }
}

// Check the answer
questionsDiv.addEventListener("submit", function(e) {
    e.preventDefault();
    const answer = document.querySelector("input[name='answer']:checked");
    if (answer.value === questions[questionIndex].correctAnswer) {
        score++;
    } else {
        timeLeft -= 10;
    }
    questionIndex++;
    if (questionIndex === questions.length) {
        endQuiz();
    } else {
        renderQuestion();
    }
});

// End the quiz
function endQuiz() {
    questionsDiv.classList.add("hide");
    endDiv.classList.remove("hide");
    scoreEl.textContent = score;
}

// Save the score
endDiv.addEventListener("submit", function(e) {
    e.preventDefault();
    const initials = initialsEl.value;
    localStorage.setItem("initials", initials);
    localStorage.setItem("score", score);
    window.location.href = "highscores.html";
});

// View the highscores
highscoresButton.addEventListener("click", function() {
    window.location.href = "highscores.html";
});