fetch("starter-code/data.json")
  .then((response) => response.json())
  .then((data) => {
    const quizzes = data.quizzes;
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  })
  .catch((error) => {
    console.error("Error fetching JSON:", error);
  });

const storedQuizzes = localStorage.getItem("quizzes");
const quizzes = JSON.parse(storedQuizzes);
const menuButtons = document.querySelectorAll(".menu-button");
const menuContainer = document.querySelector("#menu-container");
const questionContainer = document.querySelector("#question-container");
const completedContainer = document.querySelector("#completed-container");
const questionElement = questionContainer.querySelector("#question");
const questionNumberElement = questionContainer.querySelector("#current-question-number");
const answerButtons = questionContainer.querySelectorAll(".answer-button");
const submitButton = document.querySelector("#submit-button");
const errorMessage = questionContainer.querySelector("#error-message");
const scoreElement = completedContainer.querySelector("#score");
const playAgainButton = document.querySelector("#play-again-button");
let currentQuiz = null;
let selectedButton = null;
let correctAnswerButton = null;

var score = 0;
var resetPage = () => {
  answerButtons.forEach((answerButton) => {
    answerButton.classList.remove("correct");
    answerButton.classList.remove("wrong");

    if (answerButton.children.length >= 3) {
      answerButton.removeChild(answerButton.children[2]);
    }
  });
  errorMessage.classList.add("hidden");
  selectedButton = null;
};

var handleAnswerButtonClick = (e) => {
  selectedButton = e.currentTarget;
};

var enableButtons = () => {
  answerButtons.forEach((answerButton) => {
    answerButton.disabled = false;
  });
};
var disableButtons = () => {
  answerButtons.forEach((answerButton) => {
    answerButton.disabled = true;
  });
};
var handleNextQuestionButtonClick = (e) => {
  resetPage();
  enableButtons();
  displayNextQuestion();

  const content = document
    .querySelector("#question-container")
    .querySelector(".content-container")
    .querySelector(".content");
  console.log(content);
  content.style.width = `${questionNumber * 10}%`;
  submitButton.textContent = "Submit Answer";
  questionNumberElement.textContent = questionNumber;

  submitButton.removeEventListener("click", handleNextQuestionButtonClick);
  submitButton.addEventListener("click", handleSubmitButtonClick);
};
var handleSubmitButtonClick = (e) => {
  if (selectedButton === null) {
    errorMessage.classList.remove("hidden");
    console.log("Error");
    return;
  } else {
    errorMessage.classList.add("hidden");
  }

  if (
    selectedButton.children[1].innerText ===
    currentQuiz.questions[questionNumber - 1].answer
  ) {
    selectedButton.classList.add("correct");
    score++;
    selectedButton.innerHTML += `<img class = "answer-icon"
              src="starter-code/assets/images/icon-correct.svg"
              alt="correct icon"/>`;
  } else {
    selectedButton.classList.add("wrong");
    selectedButton.innerHTML += `<img class = "answer-icon"
              src="starter-code/assets/images/icon-incorrect.svg"
              alt="incorrect icon"/>`;
    correctAnswerButton.innerHTML += `<img class = "answer-icon"
              src="starter-code/assets/images/icon-correct.svg"
              alt="correct icon"/>`;
  }
  console.log(score);
  disableButtons();
  if (questionNumber === currentQuiz.questions.length) {
    submitButton.textContent = "Finish Quiz";
  } else {
    submitButton.textContent = "Next Question";
  }

  submitButton.removeEventListener("click", handleSubmitButtonClick);
  submitButton.addEventListener("click", handleNextQuestionButtonClick);
};

var handlePlayAgainButton = (e) => {
  completedContainer.classList.add("hidden");
  menuContainer.classList.remove("hidden");

  const gameModeDetails = document.querySelector(".game-details-container");
  gameModeDetails.classList.add("hidden");
};
var handleMenuButtonClick = (e) => {
  const gameModeDetails = document.querySelector(".game-details-container");
  const gameModeIconWrapper = gameModeDetails.querySelector(".image-wrapper");

  const gameModeIcon = gameModeIconWrapper.querySelector(".game-mode-icon");
  const gameModeName = gameModeDetails.querySelector(".game-mode-name");

  menuContainer.classList.add("hidden");
  gameModeDetails.classList.remove("hidden");
  questionContainer.classList.remove("hidden");
  const type = e.currentTarget.textContent.trim();

  if (type === "HTML") {
    currentQuiz = quizzes[0];
  } else if (type === "CSS") {
    currentQuiz = quizzes[1];
  } else if (type === "JavaScript") {
    currentQuiz = quizzes[2];
  } else if (type === "Python") {
    currentQuiz = quizzes[3];
  } 

  gameModeIcon.setAttribute("src", currentQuiz.icon);
  gameModeIconWrapper.classList.add(currentQuiz.title);
  gameModeName.textContent = currentQuiz.title;

  displayNextQuestion();
};

var questionNumber = 0;
var handleEndOfQuiz = () => {
  completedContainer.classList.remove("hidden");
  questionContainer.classList.add("hidden");
  scoreElement.innerText = score;

  const resultContainer = document.querySelector(".result-container");

  const gameModeDetails = resultContainer.querySelector(".game-details-container");
  const gameModeIconWrapper = gameModeDetails.querySelector(".image-wrapper");

  const gameModeIcon = gameModeIconWrapper.querySelector(".game-mode-icon");
  const gameModeName = gameModeDetails.querySelector(".game-mode-name");

  gameModeIcon.setAttribute("src", currentQuiz.icon);
  gameModeIconWrapper.classList.add(currentQuiz.title);

  gameModeName.textContent = currentQuiz.title.trim();
  questionNumber = 0;
  score = 0;
};
var displayNextQuestion = () => {
  if (questionNumber >= currentQuiz.questions.length) {
    handleEndOfQuiz();
    return;
  }

  const currentQuestion = currentQuiz.questions[questionNumber];

  const question = currentQuestion.question;
  const options = currentQuestion.options;
  const answer = currentQuestion.answer;

  questionElement.textContent = question;
  let i = 0;
  answerButtons.forEach((answerButton) => {
    if (options[i] === answer) {
      correctAnswerButton = answerButton;
    }
    answerButton.children[1].textContent = options[i];
    i++;
  });

  questionNumber++;
};
menuButtons.forEach((menuButton) => {
  menuButton.addEventListener("click", handleMenuButtonClick);
});

answerButtons.forEach((answerButton) => {
  answerButton.addEventListener("click", handleAnswerButtonClick);
});

submitButton.addEventListener("click", handleSubmitButtonClick);

playAgainButton.addEventListener("click", handlePlayAgainButton);

/* Theme Buttons*/
const themeButton = document.querySelector("#toggle-button");
var handleThemeButton = () => {
  const ball = themeButton.querySelector("#ball");
  ball.classList.toggle("toggle-right");
  ball.classList.toggle("toggle-left");

  const sunElement = document.querySelector("#sun");
  const moonElement = document.querySelector("#moon");

  const sunDark = "starter-code/assets/images/icon-sun-dark.svg";
  const moonDark = "starter-code/assets/images/icon-moon-dark.svg";

  const sunLight = "starter-code/assets/images/icon-sun-light.svg";
  const moonLight = "starter-code/assets/images/icon-moon-light.svg";

  if (sunElement.src.endsWith(sunDark)) {
    sunElement.src = sunLight;
  } else {
    sunElement.src = sunDark;
  }

  if (moonElement.src.endsWith(moonDark)) {
    moonElement.src = moonLight;
  } else {
    moonElement.src = moonDark;
  }

  const allElements = document.querySelectorAll("*");

  console.log(allElements);
  allElements.forEach((element) => {
    element.classList.toggle("dark-theme");
  });
};

themeButton.addEventListener("click", handleThemeButton);