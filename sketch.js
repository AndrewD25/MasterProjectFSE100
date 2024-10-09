class Button {
  /*constructor(screen, x, y, width, height, text, textSize) {
    this.screen = screen;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.textSize = textSize;
  }*/

    constructor(screen, x, y, text, color) {
      this.screen = screen;
      this.x = x;
      this.y = y;
      this.text = text;
      this.color = textSize;
    }
}

/*function drawButton(btn) {
  
  //Create rect component

  rect(btn.x, btn.y, btn.width, btn.height);

  //Create text component
  fill(0, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(btn.textSize);
  text(btn.text, btn.x, btn.y);

}*/

let screen = 0;
//0 = mainß
//1 = games menu
//2-5 = each game

// Initialize interactive elements //
//const startBtn = new Button(0, 600, 550, 300, 150, "Start Games", 25);

let game1Preview = {
  screen: 0,
  x: 0,
  y: 0,
  width: 100,
  height: 100
}

// Main functions //

  //////////////////////////////
 // Runs at start of program //
//////////////////////////////
function setup() { 
  createCanvas(1200, 800);
}

  //////////////////////
 // Runs every frame //
//////////////////////
function draw() { 
  background(255, 255, 255);
  
  switch (screen) {
    case 0:
      mainMenu();
      break;
    case 1:
      gamesMenu();
      break;
    default:
      break;
  }
  
}

// User defined functions //

function mainMenu() {
  //Main menu (in an abstract form, has a title Text, a button Rect, and a character Image)
  //text();
  //image();

  //stroke(0, 0, 0); //black
  //drawButton(startBtn);
}

function gamesMenu() {
  
  stroke(0, 0, 0); //black
  
  //Previews of the 3 games, vertical on left side
  rect(0, 0, 100, 50);
  rect(0, 70, 100, 50);
  rect(0, 140, 100, 50);
}

function game1() {

}

function game2() {

}

function game3() {
  
}

function mouseClicked() {
  if (mouseX >= startBtn.x && mouseX <= startBtn.x + startBtn.width && mouseY >= startBtn.y && mouseY <= startBtn.y + startBtn.height) {
    backgroundColor = random(["red", "yellow", "blue", "green"]);
  }
}
