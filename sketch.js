let navBarGradient;                 // Gradient for the navigation bar
let gameMenu = 0;                   // Game menu ID
let gameMenuIsUp = false;           // Tracks if the game menu is up


//Button Hover Detection
let hitNavBar = false;

// Defining menu buttons
let mainMenuButton;
let game1Button;
let game2Button;
let game3Button;
let backButton;
let homeButton;
let navBarButton;
let levelOneButton;
let levelTwoButton;
let levelThreeButton;
let level = 1;

//Preload images
let mascot;
let menuBackground;
let gameOneVisual;

function preload() {
  mascot = loadImage('/assets/mascot.png');
  menuBackground = loadImage('/assets/menuBackground.jpg');
  gameOneVisual = loadImage('/assets/gameOneVisual.png');
  gameTwoVisual = loadImage('/assets/gameTwoVisual.png');
  gameThreeVisual = loadImage('/assets/gameThreeVisual.png');
}

function mousePressed() {
  // Check which buttons are clicked based on the current page
  if (currentPage === 0) {
    mainMenuButton.checkClick();
  } else if (currentPage === 1) {
    game1Button.checkClick();
    game2Button.checkClick();
    game3Button.checkClick();
    navBarButton.checkClick();
  } else if (currentPage === 2 || currentPage === 3 || currentPage === 4) {
    backButton.checkClick();
    homeButton.checkClick();
  }

  if (gameMenuIsUp) {
    levelOneButton.checkClick();
    levelTwoButton.checkClick();
    levelThreeButton.checkClick();
  }

}

function onMainMenuClick() {
  currentPage = 1;                  // Go to Main Menu
}

function onGame1Click() {
  //window.open('game1.html', '_self');                     // Go to Game 1 page
  gameMenu = 1;
}

function onGame2Click() {
  //window.open('game2.html', '_self');                     // Go to Game 2 page
  gameMenu = 2;
}

function onGame3Click() {
  //window.open('game3.html', '_self');                     // Go to Game 3 page
  gameMenu = 3;
}

function onBackClick() {
  currentPage = 1;                  // Go back to the main menu
}

function onHomeClick() {
  currentPage = 0;                  // Go back to the home page
  gameMenu = 0;
}

function onNavBarClick() {
  currentPage = 0;
}

function startGame() {
  switch (gameMenu) {
    case 1:
      window.open('game1.html', '_self');
      break;
    case 2:
      window.open('game2.html', '_self');
      break;
    case 3:
      window.open('game3.html', '_self');  
      break;
    default:
      break;
  }
}

function onLevelOneClick() {
  localStorage.setItem("level", "1");
  startGame();
}

function onLevelTwoClick() {
  localStorage.setItem("level", "2");
  startGame();
}

function onLevelThreeClick() {
  localStorage.setItem("level", "3");
  startGame();
}

function setup() {
  createCanvas(1400, 800);
  // x, y, w, h, c, text, onClick
  stroke("blue");
  mainMenuButton = new Button(800, displayHeight / 2 - 50, 200, 100, 255, 'Play Games!', onMainMenuClick);
  game1Button = new Button(100, 150, 200, 100, 255, 'Typing', onGame1Click);
  game2Button = new Button(100, 350, 200, 100, 255, 'Brushing', onGame2Click);
  game3Button = new Button(100, 550, 200, 100, 255, 'Writing', onGame3Click);
  backButton = new Button(600, 550, 200, 100, 255, 'Back', onBackClick);
  homeButton = new Button(850, 550, 200, 100, 255, 'Home', onHomeClick);
  navBarButton = new Button(0, 0, 900, 70, 255, ' ', onHomeClick);
  levelOneButton  = new Button(450, 500, 200, 150, 255, 'Level 1', onLevelOneClick);
  levelTwoButton  = new Button(700, 500, 200, 150, 255, 'Level 2', onLevelTwoClick);
  levelThreeButton  = new Button(950, 500, 200, 150, 255, 'Level 3', onLevelThreeClick);

  //setup for the navbar gradient
  navBarGradient = createLinearGradient(PI / 2, 70);
  navBarGradient.colors(0, "blue", 1, color(99, 99, 255));
}

function draw() {
  background(255);                   // Clear the background each frame

  // Switch statement to determine which page to display
  switch (currentPage) {
    case 0:
      drawPage1();
      break;
    case 1:
      drawPage2();
      break;
    case 2:
      drawPage3();
      break;
    case 3:
      drawPage4();
      break;
    case 4:
      drawPage5();
      break;
    default:
      break;
  }

  // Switch statement to determine what details for which game to display on the game menu
  switch (gameMenu) {
    case 1:
      gameMenuIsUp = true;
      drawGameMenuBG();
      gameOneDetails();
      break;
    case 2:
      gameMenuIsUp = true;
      drawGameMenuBG();
      gameTwoDetails();
      break;
    case 3:
      gameMenuIsUp = true;
      drawGameMenuBG();
      gameThreeDetails();
      break;
    default:
      gameMenuIsUp = false;
      break;
  }

  //Navbar
  hitNavBar = collidePointRect(mouseX, mouseY, 0, 0, 900, 70);
  navBar();
}


function navBar() {
  fillGradient(navBarGradient);
  rect(0, 0, 1200, 70);

  fill((hitNavBar) ? color(200,200,200) : "white");
  textSize(60);
  text("Learn4Kids - Motor Skill Games", 450, 35);
}

function drawPage1() {
  // Function to draw content for the home page
  image(menuBackground, 0, 0);
  textSize(80);
  fill("blue");
  text('Learn4Kids', 500, 200);
  mainMenuButton.display();
  image(mascot, 250, 400);
}

function drawPage2() {
  // Function to draw content for the menu page
  image(menuBackground, 0, 0);
  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(4);
  text('Select a Game', 800, 400);
  fill(0);
  stroke("blue");
  strokeWeight(1);
  game1Button.display();
  game2Button.display();
  game3Button.display();
  navBarButton.display();
}

function drawPage3() {
  // Function to draw content for Game 1 page
  textSize(32);
  fill(0);
  text('Typing', 600, 200);
  backButton.display();
  homeButton.display();
}

function drawPage4() {
  // Function to draw content for Game 2 page
  textSize(32);
  fill(0);
  text('Brushing', 600, 200);
  backButton.display();
  homeButton.display();
}

function drawPage5() {
  // Function to draw content for Game 3 page
  textSize(32);
  fill(0);
  text('Writing', 600, 200);
  backButton.display();
  homeButton.display();
}

function drawGameMenuBG() {
  // Function to draw the rectangle bg for the game menu
  fill(255);
  stroke(0);
  rect(425, 100, 750, 600, 20);
  fill(0);
  stroke("blue");
}

/*TODO: 
-Replace the rectangles with the Game Visual text with actual images
-Add how the game works for each game
-Have the best score display actually work
-Have the buttons that take you to different levels work*/

//Set high score to N/A if non-existant
let tscore = localStorage.getItem("typingScore");
if (tscore === "null" || tscore === null) {
  tscore = "N/A";
}
let bscore = localStorage.getItem("brushingScore");
if (bscore === "null" || bscore === null) {
  bscore = "N/A";
}
let wscore = localStorage.getItem("writingScore");
if (wscore === "null" || wscore === null) {
  wscore = "N/A";
}

function gameOneDetails() {
  fill(255);
  stroke(0);
  rect(450, 150, 300, 300);
  image(gameOneVisual, 450, 150);
  fill(0);
  textSize(32);
  text('Game 1: Typing', 800, 125);
  //text('Game Visual Idk', 600, 300);
  text('Type the words on screen\nusing your keyboard!\n\nSpell the words correctly\n to win!', 960, 260);
  text('Best Time: ' + tscore, 960, 425);
  stroke("blue");
  levelOneButton.display();
  levelTwoButton.display();
  levelThreeButton.display();
}

function gameTwoDetails() {
  fill(255);
  stroke(0);
  rect(450, 150, 300, 300);
  image(gameTwoVisual, 450, 150);
  fill(0);
  textSize(32);
  text('Game 2: Brushing', 800, 125);
  //text('Game Visual Idk', 600, 300);
  text("Keep your teeth healthy!\nBrush away all the\n plaque to win!", 960, 220);
  text('Best Score: ' + bscore, 960, 425);
  stroke("blue");
  levelOneButton.display();
  levelTwoButton.display();
  levelThreeButton.display();
}

function gameThreeDetails() {
  fill(255);
  stroke(0);
  rect(450, 150, 300, 300);
  image(gameThreeVisual, 450, 150);
  fill(0);
  textSize(32);
  text('Game 3: Writing', 800, 125);
  //text('Game Visual Idk', 600, 300);
  text('Trace the letters,\ncollect all the starts to win!', 960, 200);
  text('Best Score: ' + wscore, 960, 425);
  stroke("blue");
  levelOneButton.display();
  levelTwoButton.display();
  levelThreeButton.display();
}