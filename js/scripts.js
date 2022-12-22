import { randomItems, shuffle } from "./arrUtil.mjs";
import readQuestions from "./read.mjs";

var StartingMinutes = 2;
var StartingSeconds = StartingMinutes * 60;
const MaxQuestions = 12;

// Pet Number
var petNumber = 1; 

var gameModeNumber = 1;

//Pet Name stored
var inputVal;

//game loaded boolean
var loadingGame = false;

//needs
var hunger;
var fun;
var hygiene;
var energy;

/**
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */


function coolLog(thing) {
  console.log(JSON.stringify(thing))
}

function hide(selector) {
  document.querySelector(selector).style.display = "none";
}

function show(selector, display) {
  document.querySelector(selector).style.display = display;
}

function toggleResults() {
  hide(".resultsContainer");
  show(".endScreenContainer", "flex");
}


window.onload = async () => {
  const allQuestions = await readQuestions();
  const questionText = document.getElementById("question");
  const answerElements = Array.from(document.getElementsByClassName("answer-text"));

  let scoreText = document.getElementById("scoreText");
  const restartBtn = document.getElementById("restart");
  const wrongOverlay = document.getElementById("wrongAnswer");
  wrongOverlay.style.visibility = "hidden";
  const wrongOverlay2 = document.getElementById("wrongAnswer2");
  wrongOverlay2.style.visibility = "hidden";
  const countDownText = document.getElementById("countdown");
  const countDownTextSurv = document.getElementById("countdownSurvive");

  //Lose Screen Image
  let loseImage = document.getElementById("lostScreenImage");

  

  function startScreen() {
    hide(".endScreenContainer");
    hide(".winScreenContainer");
    hide(".gameContainer");
    hide(".resultsContainer");
    hide(".instructions");
    hide(".survival-mode-game");
    
 
    //add to not have them while loading in the beginning
    hide(".instructions");

    show(".startScreenContainer", "flex");

   //set needs to 1
   energy = 20;
   fun = 20;
   hygiene = 20;
   hunger = 20;

    //Buttons
    const startGameBtn = document.getElementById("confirmBtn");
    const showDescriptionBtn = document.getElementById("showDescriptionBtn");
    const backToStartScreenBtn = document.getElementById("backToStartScreenBtn");



    //Arrows for character change
    const arrowLeft = document.getElementById("arrowLeft");
    const arrowRight =  document.getElementById("arrowRight");
    arrowLeft.addEventListener("click", changePetPrevious);
    arrowRight.addEventListener("click", changePetNext);

    function changePetPrevious(){
      if (petNumber == 1){
        petNumber = 2;
        document.getElementById("pet1Happy").src = "/PetHappy2.png";
      } else if(petNumber == 2){
        document.getElementById("pet1Happy").src = "/pet1happy.gif";
        petNumber =1;
      }
      }
      
      function changePetNext(){
        if (petNumber == 1){
        petNumber = 2;
        document.getElementById("pet1Happy").src = "/PetHappy2.png";
      } else if(petNumber == 2){
        document.getElementById("pet1Happy").src = "/pet1happy.gif";
        petNumber =1;
      }
      }

     //Mode Picker Icon Buttons
   
     const survivalModeBtn = document.getElementById("Survival-Mode-Icon");
     const quizModeBtn =  document.getElementById("Quiz-Mode-Icon");
     survivalModeBtn.addEventListener("click", pickedSurvivalMode);
     quizModeBtn.addEventListener("click", pickedQuizMode);

     function pickedSurvivalMode(){
      //console.log("picked survival mode and mnumber is: " + gameModeNumber);
      gameModeNumber = 1;
         //change color of image
         if(gameModeNumber==1){
    document.getElementById("Survival-Mode-Icon").src = "/Survival-Mode-Selected.png";
    document.getElementById("Quiz-Mode-Icon").src = "/Quiz-Mode.png";
     }
    }

     function pickedQuizMode(){
      //console.log("picked quiz mode and mnumber is: " + gameModeNumber);
      gameModeNumber = 2;
           //change color of image
           if(gameModeNumber==2){
            document.getElementById("Quiz-Mode-Icon").src = "/Quiz-Mode-Selected.png";
            document.getElementById("Survival-Mode-Icon").src = "/Survival-Mode.png";
           } 
    
     }
   

    //add event listener to buttons
    startGameBtn.addEventListener("click", pickMode);
    showDescriptionBtn.addEventListener("click", showInstructionsClick);
    backToStartScreenBtn.addEventListener("click", hideInstructionsClick);

    

    function showInstructionsClick() {
      show(".instructions", "flex");
    }

    function hideInstructionsClick() {
      hide(".instructions");
    }

  }

  function pickMode(){
  if(gameModeNumber == 1){
    //show(".survival-mode-game")
    //hide(".gameContainer");
    startSurvivalGame();
    //console.log("started survival mode");
  }

  if(gameModeNumber == 2){
    //hide(".survival-mode-game")
    //show(".gameContainer"); 
    startQuizGame();
    //console.log("started quiz mode");
  }
  }

  //load Game!
document.getElementById("BtnLoad").onclick = loadGame;

function loadGame(){
  //console.log("load button is clicked");

  petNumber = window.localStorage.getItem("PetType", petNumber);
  document.getElementById("petNameOutputSurv").innerHTML =  window.localStorage.getItem("PetName", inputVal);
  //if(btnClicked >= 11){
  //  document.getElementById("evolve").style.visibility = "visible";
  //}
  loadingGame = true;
  startSurvivalGame();
}

  function startSurvivalGame(){
    hide(".startScreenContainer");
    show(".survival-mode-game", "flex");

//try for save
let minutes;
let seconds;

  //save Game!!
  document.getElementById("saveBtn").onclick = saveGame;

  function saveGame(){
  window.localStorage.setItem("Hunger", hunger);
  window.localStorage.setItem("Fun", fun);
  window.localStorage.setItem("Hygiene", hygiene);
  window.localStorage.setItem("Energy", energy);
  window.localStorage.setItem("Evolve", btnClicked);
  window.localStorage.setItem("PetType", petNumber);
  window.localStorage.setItem("PetName", document.getElementById("petName").value);
  window.localStorage.setItem("TimeMinutes", minutes);
  window.localStorage.setItem("TimeSeconds", seconds);
  //countDownTextSurv.innerHTML
  //console.log("save btn clicked");
  }

    //get name of pet
    function getInputValue(){
      var inputVal = document.getElementById("petName").value;
      document.getElementById("petNameOutputSurv").innerHTML = inputVal;
      //alert(inputVal);
      }
  
      

    if(petNumber == 2){
      document.getElementById("Pet1Happy").src = "/petHappy2.png";
    }

    //hide bubbles at start
    document.getElementById("food-image1").style.visibility = "hidden";
    document.getElementById("play-image1").style.visibility = "hidden";
    document.getElementById("bath-image1").style.visibility = "hidden";
    document.getElementById("sleep-image1").style.visibility = "hidden";

    //set needs and depletion and Pet name
if(loadingGame == true){
  //set and deplete needs when loading previous game
  hunger = window.localStorage.getItem("Hunger");
  var clock1 = setInterval(depleteHunger, 350); //Hunger decrement Speed
  fun = window.localStorage.getItem("Fun");
  var clock2 = setInterval(depleteFun, 350);
  hygiene = window.localStorage.getItem("Hygiene");
  var clock3 = setInterval(depleteHygiene, 350);
  energy = window.localStorage.getItem("Energy");
  var clock4 = setInterval(depleteEnergy, 350);
  btnClicked = window.localStorage.getItem("Evolve");

 // minutes = window.localStorage.getItem("TimeMinutes", minutes);
  //seconds = window.localStorage.getItem("TimeSeconds", seconds);

StartingMinutes = window.localStorage.getItem("TimeMinutes" + 10);
StartingSeconds = window.localStorage.getItem("TimeSeconds");
  
  //setting loading to false again
  loadingGame = false;

} else {
  //set and deplete needs
  hunger = 100;
  var clock1 = setInterval(depleteHunger, 350); //Hunger decrement Speed
  fun = 100;
  var clock2 = setInterval(depleteFun, 350);
  hygiene = 100;
  var clock3 = setInterval(depleteHygiene, 350);
  energy = 100;
  var clock4 = setInterval(depleteEnergy, 350);
  var btnClicked = 0;
//get name of pet
  getInputValue();
}

    

     //need buttons
     const BtnHunger = document.getElementById("BtnHunger");
     BtnHunger.addEventListener("click", fillHunger);
 
     const BtnFun =  document.getElementById("BtnFun");
     BtnFun.addEventListener("click", fillFun);
 
     const BtnHygiene =  document.getElementById("BtnHygiene");
     BtnHygiene.addEventListener("click", fillHygiene);
 
     const BtnEnergy =  document.getElementById("BtnEnergy");
     BtnEnergy.addEventListener("click", fillEnergy);


     //deplete Needs
     function depleteHunger(){
    if(gameModeNumber == 1 && hunger == 0){
    clearInterval(clock1);
    } else if (gameModeNumber == 1){
    hunger--;
    document.getElementById("HungerBar").value = hunger;
    }
}

      function depleteFun(){
     if(gameModeNumber == 1 && fun == 0){
    clearInterval(clock2);
     } else if (gameModeNumber == 1){
    fun--;
    document.getElementById("FunBar").value = fun;
    }
}

    function depleteHygiene(){
     if(gameModeNumber == 1 && hygiene == 0){
    clearInterval(clock3);
  } else if (gameModeNumber == 1){
    hygiene--;
    document.getElementById("HygieneBar").value = hygiene;
    }
}

    function depleteEnergy(){
    if(gameModeNumber == 1 && energy == 0){
    clearInterval(clock4);
  } else if (gameModeNumber == 1){
    energy--;
    document.getElementById("EnergyBar").value = energy;
  }
}


//Fill the needs with button clicks
function fillHunger(){
  //console.log("You have clicked the btn: " + btnClicked);
  if(hunger <= 100 && hunger != 0){
    hunger += 5;
    hygiene -= 1;
    btnClicked++;
  } else if (hunger == 0){
    hunger += 0;
  }
  if(btnClicked >= 11){
    //document.getElementById("evolve").style.visibility = "visible";
    console.log("Evolved");
  }
}

function fillFun(){
  if(fun <= 100 && fun != 0){
    fun += 5;
    energy -= 1;
  } else if (fun == 0){
    fun += 0;
  }
}

function fillHygiene(){
  if(hygiene <= 100 && hygiene != 0){
    hygiene += 5;
    fun -= 1;
  } else if (hygiene == 0){
    hygiene += 0;
  }
}

function fillEnergy(){
  if(energy <= 100 && energy != 0){
    energy += 5;
    hunger -=1;
  } else if (energy == 0){
    energy += 0;
  }
}

//gets called every Second
setInterval(function(){ 
  spriteHandler();
  bubbleHandler();
  gameOver();
  //console.log("Your game state is: " + gameState)
  //console.log("hunger value: " + hunger);
  //console.log(document.getElementById("HungerBar").value);

  //console.log("hunger: " + hunger + "hygiene: " + hygiene + "fun: " + fun + "energy: " + energy);
  
}, 1000);


//handels the bubbles
function bubbleHandler(){
  if(hunger <= 50){
    document.getElementById("food-image1").style.visibility = "visible";
    //console.log("hunger kleiner als 50"+document.getElementById("HungerBar").value);
  } else {
    document.getElementById("food-image1").style.visibility = "hidden";
    //console.log("hunger größer als 50"+document.getElementById("HungerBar").value);
  }
  
  if(fun <= 45){
    document.getElementById("play-image1").style.visibility = "visible";
  } else {
    document.getElementById("play-image1").style.visibility = "hidden";
  }
  
  if(hygiene <= 40){
    document.getElementById("bath-image1").style.visibility = "visible";
  } else {
    document.getElementById("bath-image1").style.visibility = "hidden";
  }
  
  if(energy <= 35){
      document.getElementById("sleep-image1").style.visibility = "visible";
    } else {
      document.getElementById("sleep-image1").style.visibility = "hidden";
    }
  }

  //handles the sad and happy sprite
function spriteHandler(){
  if((gameModeNumber == 1) && (petNumber == 1) && (hunger <= 50 || fun <= 45 || hygiene <= 40 || energy <= 35)){
    document.getElementById("Pet1Happy").src = "/Pet1Sad.gif";
    //console.log("pet 1 sad");
} else if (gameModeNumber == 1 && petNumber == 1){
  document.getElementById("Pet1Happy").src = "/pet1Happy.gif";
  //console.log("pet 1 happy");
}

if ((gameModeNumber == 1) && (petNumber == 2) && (hunger <= 50 || fun <= 45 || hygiene <= 40 || energy <= 35)){
  document.getElementById("Pet1Happy").src = "/PetSad2.png";
} else if (gameModeNumber == 1 && petNumber == 2){
  document.getElementById("Pet1Happy").src = "/PetHappy2.png";
}
}

//timer try
let timerReference = 0;
let remainingSeconds = StartingSeconds;



function updateClock() {
  minutes = Math.floor(remainingSeconds / 60);
  seconds = remainingSeconds % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  countDownTextSurv.innerHTML = `${minutes}:${seconds}`;
  //`${minutes}:${seconds}`
}

function setRemainingSeconds(seconds) {
  remainingSeconds = Math.max(seconds, 0);
  updateClock();
}

function decreaseRemainingSeconds(seconds) {
  setRemainingSeconds(remainingSeconds - seconds);
}

function countDown() {
  decreaseRemainingSeconds(1)
  if (remainingSeconds === 0) {
    //loseImage.src = "/Pet-Lost.png";
    displayWinScreen();
  } else {
    startOneSecondTimeout();
  }
}

function startOneSecondTimeout() {
  updateClock();
  timerReference = setTimeout(countDown, 1000);
}

function stopTimer() {
  clearTimeout(timerReference);
}

function displayWinScreen() {
  stopTimer();
  hide(".survival-mode-game");
  show(".winScreenContainer", "flex");
  //Buttons
  const playAgainBtnWin = document.getElementById("playAgainButtonWin");
  playAgainBtnWin.addEventListener("click", startScreen); 
}

function gameOver(){
if ((gameModeNumber==1) && (hunger <= 0 || fun <= 0 || hygiene <= 0 || energy <= 0)){
  show(".endScreenContainer", "flex");
  hide(".survival-mode-game");
  //empty scoreText
  let scoreText = document.getElementById("scoreText");
  scoreText.innerHTML = "";
  //hide resultsButton
  document.getElementById("resultsButton").style.visibility = "hidden";
  //PLay Again Buttons
  const playAgainBtn = document.getElementById("playAgainButton");
  //add event listener to play again button
  playAgainBtn.addEventListener("click", startScreen);
  hunger = 0;
  fun = 0;
  hygiene = 0;
  energy = 0;
  stopTimer();
}
  }

  startOneSecondTimeout() // Start timer first time
}

  function startQuizGame() {
    hide(".startScreenContainer");
    let score = 0;
    let remainingSeconds = StartingSeconds
    let timerReference = 0
    let isAcceptingAnswers = true;
    let remainingQuestions = randomItems(allQuestions, MaxQuestions);

    hunger = 1;
    fun = 1;
    hygiene = 1;
    energy = 1;

    document.getElementById("HungerBarQuiz").value = hunger;
    document.getElementById("FunBarQuiz").value = fun;
    document.getElementById("HygieneBarQuiz").value = hygiene;
    document.getElementById("EnergyBarQuiz").value = energy;

 

     //PET NAME:  get input value aka pet name from text field
  function getInputValue(){
    var inputVal = document.getElementById("petName").value;
    document.getElementById("petNameOutput").innerHTML = inputVal;
    //alert(inputVal);
    }

    getInputValue();

    if(petNumber == 2){
      document.getElementById("quizPetHappy").src = "/petHappy2.png";
    }
    //For the Results
    //let wrongAnsweredQuestions = randomItems(allQuestions, MaxQuestions);

    //set needs to 0

    /**
     * @type {Question[]}
     */
    let wrongAnsweredQuestions = [];

  
    hide(".endScreenContainer");
    hide(".winScreenContainer");

    /**
      * @param {number} value 
      */
    function setScore(value) {
      score = value;
      scoreText.innerHTML = score + "/12 Questions correct";
    }

    function updateClock() {
      const minutes = Math.floor(remainingSeconds / 60);
      let seconds = remainingSeconds % 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      countDownText.innerHTML = `${minutes}:${seconds}`;
    }

    function setRemainingSeconds(seconds) {
      remainingSeconds = Math.max(seconds, 0)
      updateClock()
    }

    function decreaseRemainingSeconds(seconds) {
      setRemainingSeconds(remainingSeconds - seconds)
    }

    function countDown() {
      decreaseRemainingSeconds(1)
      if (remainingSeconds === 0) {
        loseImage.src = "/Pet-Lost.png";
        displayEndScreen();
      } else {
        startOneSecondTimeout()
      }
    }

    function startOneSecondTimeout() {
      updateClock();
      timerReference = setTimeout(countDown, 1000)
    }

    function stopTimer() {
      clearTimeout(timerReference)
    }

    //setInterval gets called every second for Main Screen///////////
setInterval(function(){ 
  quizWin();
}, 1000);

function quizWin(){
  if (hunger >= 100 && fun >= 100 && hygiene >= 100 && energy >= 100){
    displayWinScreen();
    hunger = 1;
    fun = 1;
    hygiene = 1;
    energy = 1;
  }
}

    function displayWinScreen() {
      stopTimer();
      hide(".gameContainer");
      show(".winScreenContainer", "flex");
      isAcceptingAnswers = false;
      //Buttons
      const playAgainBtnWin = document.getElementById("playAgainButtonWin");
      playAgainBtnWin.addEventListener("click", startScreen); 
    }

//function for random number
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function to randomly fill needs
function fillNeeds(){
  //random number von 1-4
  var randNumber = randomInteger(1,4);


  //1=hunger, 2= fun, 3=hygiene, 4=energy
 if(randNumber == 1 && hunger <100){
  fillHungerQuiz();
 } else if (randNumber == 2 && fun < 100){
fillFunQuiz();
 } else if (randNumber == 3 && hygiene < 100){
fillHygieneQuiz();
 } else if (randNumber == 4 && energy < 100){
  fillEnergyQuiz();
 } else {
  fillNeeds();
 }

}

//Fill the needs with button clicks
function fillHungerQuiz(){
  //console.log("You have clicked the btn: " + btnClicked);
  if(hunger <= 100 && hunger != 0){
    hunger += 33;
    document.getElementById("HungerBarQuiz").value = hunger;
    //console.log("Frage ist korrekt" + hunger);
  } else if (hunger == 0){
    hunger += 0;
  } else if (hunger >= 100) {
    //displayWinScreen();
    fillNeeds();
    //console.log("hunger need is already full");
  }
}

function fillFunQuiz(){
  if(fun <= 100 && fun != 0){
    fun += 33;
    document.getElementById("FunBarQuiz").value = fun;
    //console.log("Frage ist korrekt" + fun);
  } else if (fun == 0){
    fun += 0;
  } else if (fun >= 100) {
    //displayWinScreen();
    fillNeeds();
    //console.log("fun need is already full");
  }
}

function fillHygieneQuiz(){
  if(hygiene <= 100 && hygiene != 0){
    hygiene += 33;
    document.getElementById("HygieneBarQuiz").value = hygiene;
    //console.log("Frage ist korrekt" + hygiene);
  } else if (hygiene == 0){
    hygiene += 0;
  } else if (hygiene >= 100) {
    //displayWinScreen();
    fillNeeds();
    //console.log("hygiene need is already full");
  }
}

function fillEnergyQuiz(){
  if(energy <= 100 && energy != 0){
    energy += 33;
    document.getElementById("EnergyBarQuiz").value = energy;
    //console.log("Frage ist korrekt" + energy);
  } else if (energy == 0){
    energy += 0;
  } else if (energy >= 100) {
    //displayWinScreen();
    fillNeeds();
    //console.log("energy need is already full");
  }
}

    function displayEndScreen() {
      hide(".gameContainer");
      wrongOverlay.style.visibility = "hidden";
      wrongOverlay2.style.visibility = "hidden";
      stopTimer()
      //hide(".gameContainer");
      show(".endScreenContainer", "flex");
      isAcceptingAnswers = false;

      //Buttons
      const resultsBtn = document.getElementById("resultsButton");
      const playAgainBtn = document.getElementById("playAgainButton");

      //add event listener to buttons
      resultsBtn.addEventListener("click", displayResults);
      playAgainBtn.addEventListener("click", startScreen);
    }

    function displayResults() {
      let resultIndex = 0;

      //Result Screen Buttons
      const backBtn = document.querySelector("#backButton");
      const nextResultBtn = document.getElementById("nextResultButton");
      const previousResultButton = document.getElementById("previousResultButton");

      const resultQuestionText = document.getElementById("result-question");
      const resultAnswerElements = Array.from(document.getElementsByClassName("result-answer-text"));

      hide(".endScreenContainer");
      show(".resultsContainer", "flex");

      //add event listener to back button
      backBtn.addEventListener("click", toggleResults);

      function incrementResultIndex() {
        //länge ist anzahl der tatsächlichen elemente/beginnt bei 1 und nicht bei 0
        if (resultIndex < wrongAnsweredQuestions.length - 1) {
          resultIndex++;
        }
        displayCurrentQuestion();
      }

      function decrementResultIndex() {
        if (resultIndex > 0) {
          resultIndex--;
        }
        displayCurrentQuestion();
      }

      function displayCurrentQuestion() {
        let currentResultQuestion = wrongAnsweredQuestions[resultIndex];
        resultQuestionText.innerText = currentResultQuestion.text;

        resultAnswerElements.forEach(function (element, index) {
          let currentResultAnswer = currentResultQuestion.answers[index]
          element.innerText = currentResultAnswer.text;

          if (currentResultAnswer.isCorrect) {
            element.parentElement.className = "correct"
          } else {
            element.parentElement.className = "incorrect"
          }
        })
      }

      nextResultBtn.addEventListener("click", incrementResultIndex);
      previousResultButton.addEventListener("click", decrementResultIndex);
      displayCurrentQuestion();
    }


  function displayNextQuestion() {
    if (remainingQuestions.length === 0) {
      //displayWinScreen();
      return;
    }
    //löscht erste Frage aus dem Array und gibt sie in Variable
    const currentQuestion = remainingQuestions.shift();
    const currentAnswers = shuffle(currentQuestion.answers);

    function callMum() {
      //phone overlay
      wrongOverlay2.style.visibility = "visible";
      decreaseRemainingSeconds(10)
  
      //set pet to sad when wrong answer
      if (petNumber == 1){
        document.getElementById("quizPetHappy").src = "/Pet1Sad.gif";
      } else if(petNumber == 2){
        document.getElementById("quizPetHappy").src = "/PetSad2.png";
      }
    }

    function displayWrongAnswer() {
        callMum();
    }
    /**
     * 
     * @param {HTMLElement} element 
     * @param {Answer} answer 
     */
    function giveAnswer(element, answer) {
      isAcceptingAnswers = false;
      let classToApply = "incorrect";
      let classToApplyText = "selectedElementText";

      if (answer.isCorrect) {
        fillNeeds();
        setScore(score + 1);
        classToApply = "correct";
        classToApplyText = "selectedElementText";
        //add to value
        //coolLog(wrongAnsweredQuestions);
        //wenn die frage im wrongAnswered array ist und ich sie richtig beantworte dann rauslöschen
        if(wrongAnsweredQuestions.indexOf(currentQuestion) > -1){
          //console.log("Frage ist schon im Array");
          wrongAnsweredQuestions = wrongAnsweredQuestions.filter(questions => questions.Question != currentQuestion);
        }
      } else {
        displayWrongAnswer();
        //push wrong question into array
        remainingQuestions.push(currentQuestion);
        //wrongAnsweredQuestions.push(currentQuestion);

        //nicht die gleiche Frage zwei Mal hinzufügen, falls zwei Mal falsch beantwortet
        //gibts trotzdem öfter rein!
        if(wrongAnsweredQuestions.indexOf(currentQuestion) === -1){
          wrongAnsweredQuestions.push(currentQuestion);
        }
        
        //coolLog(wrongAnsweredQuestions);
      }

      element.parentElement.classList.add(classToApply);
      element.classList.add(classToApplyText);

      setTimeout(() => {
        element.parentElement.classList.remove(classToApply);
        element.classList.remove(classToApplyText);
        displayNextQuestion();
        isAcceptingAnswers = true;
        wrongOverlay.style.visibility = "hidden";
        wrongOverlay2.style.visibility = "hidden";

        //set pet to happy again
              //set pet to sad when wrong answer
      if (petNumber == 1){
        document.getElementById("quizPetHappy").src = "/pet1happy.gif";
      } else if(petNumber == 2){
        document.getElementById("quizPetHappy").src = "/PetHappy2.png";
      }
      }, 2000);
    }

    questionText.innerText = currentQuestion.text;

    answerElements.forEach((element, index) => {
      //speichert current answer an der stelle index in variable
      const answer = currentAnswers[index];
      //coolLog(answer);
      element.innerText = answer.text;
      element.onclick = function () {
        if (!isAcceptingAnswers) {
          return;
        }
        giveAnswer(element, answer);
      };
    });
  }

  show(".gameContainer", "flex");
  hide(".resultsContainer");

  displayNextQuestion();
  wrongOverlay.style.visibility = "hidden";
  countDownText.style.visibility = "visible";

  startOneSecondTimeout() // Start timer first time

}
restartBtn.addEventListener("click", startQuizGame);
//startGame();
startScreen();
}


