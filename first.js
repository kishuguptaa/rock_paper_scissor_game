let userScore = 0;
let compScore = 0;
let roundsPlayed = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const playGame = (userChoice) => {
  //Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    //Draw Game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      //scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      //rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
  
  roundsPlayed++;

  if (userScore === 10 || compScore === 10 || roundsPlayed === 10) {
    if (userScore > compScore) {
      msg.innerText = "Congratulations! You win the game!";
      msg.style.backgroundColor = "green";
    } else if (userScore < compScore) {
      msg.innerText = "Sorry! You lost the game!";
      msg.style.backgroundColor = "red";
    } else {
      msg.innerText = "It's a draw! Try again!";
      msg.style.backgroundColor = "#081b31";
    }
    // Disable further choices after game ends
    choices.forEach(choice => choice.removeEventListener("click"));
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (roundsPlayed < 10) {
      const userChoice = choice.getAttribute("id");
      playGame(userChoice);
    }
  });
});
