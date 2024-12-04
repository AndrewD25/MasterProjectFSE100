class Textbox {
  // This class is used to create the display boxes in the main screen
  constructor(x, y, w, h, text = '') {
    this.x = x;    
    this.y = y;    
    this.w = w;    
    this.h = h;    
    this.text = text; 
    this.fillColor = color(255); 
    this.textColor = 'black';
    this.letterState = '';
    this.isCorrect = null;
    this.isWordBox = false;
  }
  
  display() {
    // This method displays the text box according to input variables
    fill(this.fillColor);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER, CENTER);
    fill(this.textColor);
    textSize(50);
    
    if (this.isWordBox) {
      text(this.text, this.x + this.w / 2, this.y + this.h / 2);
    } else {
      text(this.letterState, this.x + this.w / 2, this.y + this.h / 2);
    }
  }

  updateLetter(input, correctLetter) {
    // This method checks the input letter
    if (input === correctLetter) {
      this.letterState = correctLetter;
      this.textColor = 'green';
      this.isCorrect = true;
    } else {
      this.letterState = 'X';
      this.textColor = 'red';
      this.isCorrect = false;
      if (missSound.isPlaying()) {
        missSound.stop();
      }
      missSound.play();
    }
  }

  reset() {
      this.letterState = '';
      this.textColor = 'black';
      this.isCorrect = null;
  }
}

let timer;
let menuBackground;
let successSound;
let missSound;
let wordBox1;
let letterBox1;
let letterBox2;
let letterBox3;
let letterBox4;
let currentWord;
let showingCorrect = false;
let correctTimer = 0;
let counter = 0;
let navBarButton;
let navBarGradient;  // Gradient for the navigation bar 
let finalPopupShown = false;
let backButton;
let popUpText = " ";
let gameLevel = 0;

//Button Hover Detection
let hitNavBar = false;

function preload() {
  menuBackground = loadImage('/assets/menuBackground.jpg');
}

const wordList = [
  "CATS", "DOGS", "BIRD", "FISH", "LION", "BEAR", "FROG", "WOLF", "DEER", "DUCK",
  "GOAT", "SEAL", "HAWK", /*"TUAH"*/ "MOLE", "TOAD", "COWS", "PIGS", "MICE", "ANTS", 
  "BATS", "CRAB", "CLAM", "BEES", "FOAL", "CALF", "ELKS", "MOAT", "SUNS", "RAIN",
  "SNOW", "STAR", "WIND", "TREE", "LEAF", "ROCK", "SEED", "ROOT", "VINE", "HILL",
  "CAVE", "BOAT", "CAMP", "FIRE", "POOL", "SURF", "SAND", "WAVE", "OWLS",
];

// This and the reversed dictionaries will be used to determine user keyboard input
const keyConversion = {
  'A':65,'B':66,'C':67,'D':68,'E':69,
  'F':70,'G':71,'H':72,'I':73,'J':74,
  'K':75,'L':76,'M':77,'N':78,'O':79,
  'P':80,'Q':81,'R':82,'S':83,'T':84,
  'U':85,'V':86,'W':87,'X':88,'Y':89,
  'Z':90
};

// value:key paris of keyConversion dict.
const reverseKeyConversion = Object.fromEntries(
  Object.entries(keyConversion).map(([key, value]) => [value, key])
);

function getRandomWord() {
  // function to grab random word from wordList
  const randomIndex = floor(random(wordList.length));
  return wordList[randomIndex];
}

function resetGame() {
  letterBox1.reset();
  letterBox2.reset();
  letterBox3.reset();
  letterBox4.reset();
  currentWord = getRandomWord();
  wordBox1.text = currentWord;
}

function popUp() {
  // background alpha
  fill(0, 0, 0, 100);
  rect(0, 0, 1200, 800);

  // draw the popup box with the calculated position
  fill(255);
  rect(400, 100, 400, 200, 20);

  // popup text, i think we can also grab from a list if we want different messages to display
  fill(0, 200, 0);
  textSize(64);
  textAlign(CENTER, CENTER);
  text("Correct!", 600, 200);
}

function levelPopUp() {
  // background alpha
  fill(0, 0, 0, 100);
  rect(0, 0, 1200, 800);

  // draw the popup box with the calculated position
  fill(255);
  rect(400, 100, 400, 200, 20);

  // popup text, i think we can also grab from a list if we want different messages to display
  fill(0, 200, 0);
  textSize(64);
  textAlign(CENTER, CENTER);
  text("Correct!", 600, 200);
}

let changeTimer = true;
function finalPopup() {
  fill(0, 0, 0, 100);
  rect(0, 0, 1200, 800);
  
  fill(255);
  rect(300, 100, 600, 400, 20);

  // popup text, i think we can also grab from a list if we want differnt messages to display
  fill(0, 200, 0);
  textSize(64);
  textAlign(CENTER, CENTER);
  text("Game Over!", 600, 200);

  if (changeTimer) {
    timer = millis() / 1000;
    changeTimer = false;

    //Save high score into local storage
    let HS = localStorage.getItem("typingScore");
    if (HS === null || HS === "null" || parseFloat(HS) > timer) {
      localStorage.setItem("typingScore", String(timer));
    }
  }

  fill(0, 0, 0);
  textSize(32);
  text("Time: " + timer, 600, 250);
  
  fill(255);
  stroke(0);
  textAlign(CENTER, CENTER);
  backButton.display();
} 

function mousePressed() {
  backButton.checkClick();
  navBarButton.checkClick();
}

function setup() {
  createCanvas(1200, 800);

  successSound = loadSound("/soundFX/success.mp3");
  missSound = loadSound("/soundFX/miss.mp3");
  
  wordBox1 = new Textbox(400, 150, 400, 100);
  wordBox1.isWordBox = true;
  
  letterBox1 = new Textbox(400, 300, 100, 100);
  letterBox2 = new Textbox(500, 300, 100, 100);
  letterBox3 = new Textbox(600, 300, 100, 100);
  letterBox4 = new Textbox(700, 300, 100, 100);
  
  currentWord = getRandomWord();
  wordBox1.text = currentWord;

  navBarGradient = createLinearGradient(PI / 2, 70);
  navBarGradient.colors(0, "blue", 1, color(99, 99, 255));

  backButton = new Button(375, 400, 450, 70, 255, 'Back to games', onBackClick, 1);
  navBarButton = new Button(0, 0, 900, 70, 255, ' ', onNavClick, 0);
}

let counterMax; 
switch (parseInt(localStorage.getItem("level"))) {
  case 1:
    counterMax = 3;
    break;
  case 3:
    counterMax = 10;
    break;
  default:
    counterMax = 5;
    break;
}

function draw() {
  /* Automatically shows popup screen upon correctly typing the full word.
     Popup screen will stay for one second before the game is reset, up to a maximum of 5 successful attempts.
  */
  background(255);
  image(menuBackground, 0, 0); //background

  
  if (counter < counterMax) {
    game1page(); // Display the game interface
    if (showingCorrect) {
      if (millis() - correctTimer > 1000) {
        showingCorrect = false;
        resetGame();
        counter++; // Increment the counter after a successful word
      } else {
        popUp();
      }
    }
  } else {
    // Show the final popup when the game is finished
    finalPopup();
  }
  
  navBarButton.display();
  navBar();

  hitNavBar = collidePointRect(mouseX, mouseY, 0, 0, 900, 70);

  fill("black");
  textSize(30);
  textAlign(CENTER);
  text("Type " + counterMax + " words using the letters on your keyboard!", 600, 600);
}

function checkWordComplete() {
  /* This function checks to make sure if ALL the letters in the word are correct.
     Once all the letters are determined to be correct, the showingCorrect variable is 
     set to true and the correctTimer variable begins incrementing.The correctTimer variable
     will be used in the draw function to display the congratulatory pop up message. 

  */
  if (letterBox1.isCorrect && letterBox2.isCorrect && 
      letterBox3.isCorrect && letterBox4.isCorrect) {
    showingCorrect = true;
    correctTimer = millis();
    if (successSound.isPlaying()) {
      successSound.stop();
    }
    successSound.play();
  }
}

function keyPressed() {
  /* We determine the user input by using the reserved keyword "keyCode" (returns user keyboard input as      an int) and our reversedKeyConversion dictionary.Then we check to see if each letter of the word          matches the keys of the user input. The letterBox objects will then be updated to reflect if the          user typed in the correct letter or not. 
  */ 
  let pressedLetter = reverseKeyConversion[keyCode];
  
  // Process key input for current word/letter
  if (!letterBox1.isCorrect) {
    letterBox1.updateLetter(pressedLetter, currentWord[0]);
    checkWordComplete();
  } else if (!letterBox2.isCorrect && letterBox1.isCorrect) {
    letterBox2.updateLetter(pressedLetter, currentWord[1]);
    checkWordComplete();
  } else if (!letterBox3.isCorrect && letterBox2.isCorrect) {
    letterBox3.updateLetter(pressedLetter, currentWord[2]);
    checkWordComplete();
  } else if (!letterBox4.isCorrect && letterBox3.isCorrect) {
    letterBox4.updateLetter(pressedLetter, currentWord[3]);
    checkWordComplete();
  }
}

function game1page() {
  wordBox1.display();
  letterBox1.display();
  letterBox2.display();
  letterBox3.display();
  letterBox4.display();
}

function navBar() {
  fillGradient(navBarGradient);
  rect(0, 0, 1200, 70);

  fill((hitNavBar) ? color(200,200,200) : "white");
  textSize(60);
  text("Learn4Kids - Motor Skill Games", 450, 35);
}

function onNavClick() {
  window.open('index.html', '_self');
}

function onBackClick() {
  window.open('index.html', '_self');                     // Go to Game menu page
}
