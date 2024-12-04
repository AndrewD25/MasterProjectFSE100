let backButton;

class Star {
    constructor(x, y, scale, col) {
      this.x = x;
      this.y = y;
      this.scale = scale;
      this.size = 50 * this.scale;  // Scaled size for the star
      this.col = col;
    }
  
    // Method to draw the star
    draw() {
      fill(this.col);
      noStroke();
      this.drawStar(this.x, this.y, this.size, this.size / 2, 5); // Draw a star with 5 points
    }
  
    // Helper function to draw the star shape
    drawStar(x, y, radius1, radius2, npoints) {
      let angle = TWO_PI / npoints;
      let halfAngle = angle / 2.0;
      beginShape();
      for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
      }
      endShape(CLOSE);
    }
  
    // Method to check if the mouse is hovering over the star
    isMouseOver() {
      let d = dist(mouseX, mouseY, this.x, this.y);
      if (d < this.size / 2) {
        return true;
      } else {
        return false;
      }
    }
  }
  
  
  let score = 0;
  let star1, star2, star3;
  let drawStar1 = true, drawStar2 = true, drawStar3 = true;
  let gameStart = false;
  let gameOver = false;
  let target;
  let targetText;
  let targetSize = 25;
  let successSound;
  let missSound;

  //Generate a dummy object click target
  const successTarget = document.createElement("div");
  successTarget.onclick = playSuccessSound;
  document.body.appendChild(successTarget);
  const failTarget = document.createElement("div");
  failTarget.onclick = playFailSound;
  document.body.appendChild(failTarget);

  function playSuccessSound() {
    successSound.play();
  }

  function playFailSound() {
    missSound.play();
  }

  function preload() {
    successSound = loadSound("/soundFX/success.mp3");
    missSound = loadSound("/soundFX/miss.mp3");
  }
  
  function setup() {
    createCanvas(1200, 800);
    successSound.setVolume(1.0); // Full volume
    missSound.setVolume(1.0);

    backButton = new Button(375, 400, 450, 70, 255, 'Back to games', onBackClick, 1);
  }
  
  function draw() {
    background(255);
    
    fill("red");
    
    // Draw the level
    switch (parseInt(localStorage.getItem("level"))) {
      case 1:
        drawO();
        break;
      case 2:
        drawX();
        break;
      default:
        drawA();
        break;
    }
    
    
    // Only draw the target if the game hasn't started yet
    if (!gameStart) {
      fill(0);
      textAlign(CENTER);
      textSize(15);
      target = circle(420, 600, targetSize);
      targetText = text("Click the circle to start playing!", 420, 640);
    }
  
    // Instructions
    fill(255);
    textSize(30);
    text("Use the mouse to collect the stars! But don't touch red or it's game over!", 600, 750);
    
    // If the game has started, check for collisions
    if (gameStart && !gameOver) {
      let pixelColor = getPixelColor(mouseX, mouseY);
      
      if (checkRedCollision(pixelColor) || (!drawStar1 && !drawStar2 && !drawStar3)) {
        if (score < 3) {
          failTarget.click();
        }
        gameOver = true;
      }
  
      // Check star collisions only if the game has started
      if (star1.isMouseOver()) {
        if (drawStar1) {
          successTarget.click();
          score++;
        }
        drawStar1 = false;
      }
      if (star2.isMouseOver()) {
        if (drawStar2) {
          successTarget.click();
          score++;
        }
        drawStar2 = false;
      }
      if (star3.isMouseOver()) {
        if (drawStar3) {
          successTarget.click();
          score++;
        }
        drawStar3 = false;
      }
    }
    
    if (gameOver) {
      finalPopup();
    }
  }

  function finalPopup() {
    fill(0, 0, 0, 100);
    rect(0, 0, 1200, 800);
    
    fill(255);
    rect(300, 100, 600, 400, 20);
  
    // popup text, i think we can also grab from a list if we want differnt messages to display
    fill(255, 0, 0);
    if (score === 3) {
      fill("green");
    }
    textSize(64);
    textAlign(CENTER, CENTER);
    text("Game Over!", 600, 200);
  
    
  
      //Save high score into local storage
      let HS = localStorage.getItem("writingScore");
      if (HS === null || HS === "null" || parseInt(HS) < score) {
        localStorage.setItem("writingScore", String(score));
      }
  
    fill(0, 0, 0);
    textSize(32);
    text("Score: " + score, 600, 250);
    
    fill(255);
    stroke(0);
    textAlign(CENTER, CENTER);
    backButton.display();
  } 
  
  function getPixelColor(x, y) {
    // Get the pixel data at the specified coordinates
    let pixelData = get(x, y);
    
    // Create a color object from the pixel data
    return color(pixelData[0], pixelData[1], pixelData[2]); 
  }
  
  function checkRedCollision(pixelColor) {
    if (red(pixelColor) === 255 && green(pixelColor) === 0 && blue(pixelColor) === 0) {
      return true;
    } else {
      return false;
    }
  }
  
  function drawA() {
    background(255, 0, 0);  // Red background
    noStroke();
    
    // Outer "A" shape (taller and wider)
    fill(255);
    beginShape();
    vertex(600, 50);   // Top of the "A"
    vertex(300, 750);  // Bottom left of the "A"
    vertex(900, 750);  // Bottom right of the "A"
    endShape(CLOSE);
    
    // Inner triangle (negative space) - wider and taller
    fill(255, 0, 0); 
    beginShape();
    vertex(600, 350);  // Top of the triangle
    vertex(450, 650);  // Bottom left of the triangle
    vertex(750, 650);  // Bottom right of the triangle
    endShape(CLOSE);
  
    // Horizontal bar of "A" - wider and positioned appropriately
    fill(255);
    beginShape();
    vertex(450, 500);  // Left point of the horizontal bar
    vertex(750, 500);  // Right point of the horizontal bar
    vertex(750, 550);  // Bottom right of the bar
    vertex(450, 550);  // Bottom left of the bar
    endShape(CLOSE);
    
    // Close off bottom (wider)
    fill(255, 0, 0);
    beginShape();
    vertex(300, 650);  // Bottom left of the "A"
    vertex(300, 750);  // Bottom left of the "A"
    vertex(900, 750);  // Bottom right of the "A"
    vertex(900, 650);  // Bottom right of the "A"
    endShape(CLOSE);
    
    // Add the star shapes
    if (drawStar1) {
      star1 = new Star(600, 190, 0.3, color(255, 204, 0));  // Scale 1 star in yellow
      star1.draw();  // Draw the star
    }
    
    if (drawStar2) {
      star2 = new Star(800, 600, 0.3, color(255, 204, 0));  // Scale 1 star in yellow
      star2.draw();  // Draw the star
    }
    
    if (drawStar3) {
      star3 = new Star(550, 520, 0.3, color(255, 204, 0));  // Scale 1 star in yellow
      star3.draw();  // Draw the star
    }
  }

  function drawO() {
    background(255, 0, 0);  // Red background
    noStroke();

    // Draw the outer white "O" circle
    fill(255);
    ellipse(600, 400, 600, 600);  // Outer circle of "O"
    
    // Draw the inner red circle (center)
    fill(255, 0, 0);
    ellipse(600, 400, 200, 200);  // Inner circle of "O"
  
    // Add the three stars
    if (drawStar1) {
      star1 = new Star(420, 400, 0.3, color(255, 204, 0));  // Star to the left
      star1.draw();  // Draw the star
    }
    
    if (drawStar2) {
      star2 = new Star(600, 200, 0.3, color(255, 204, 0));  // Star at the top
      star2.draw();  // Draw the star
    }
    
    if (drawStar3) {
      star3 = new Star(780, 500, 0.3, color(255, 204, 0));  // Star to the right
      star3.draw();  // Draw the star
    }
}

function drawX() {
    background(255, 0, 0);  // Red background
    noStroke();

    // Draw the white "X" shape with an even wider layout
    fill(255);

    // Left diagonal of "X" (wider, same height)
    beginShape();
    vertex(200, 100);   // Top left of the X
    vertex(500, 100);   // Top right of the left diagonal
    vertex(950, 700);   // Bottom right of the left diagonal
    vertex(650, 700);   // Bottom left of the X
    endShape(CLOSE);

    // Right diagonal of "X" (wider, same height)
    beginShape();
    vertex(950, 100);   // Top right of the X
    vertex(650, 100);   // Top left of the right diagonal
    vertex(200, 700);   // Bottom left of the right diagonal
    vertex(500, 700);   // Bottom right of the right diagonal
    endShape(CLOSE);

    // Add the three stars
    if (drawStar1) {
      star1 = new Star(380, 140, 0.3, color(255, 204, 0));  // Star at the upper left
      star1.draw();  // Draw the star
    }
    
    if (drawStar2) {
      star2 = new Star(800, 160, 0.3, color(255, 204, 0));  // Star in the center
      star2.draw();  // Draw the star
    }
    
    if (drawStar3) {
      star3 = new Star(760, 650, 0.3, color(255, 204, 0));  // Star at the lower right
      star3.draw();  // Draw the star
    }
}


  
  function mousePressed() {
    // Check if the mouse is inside the target circle when clicked
    if (dist(mouseX, mouseY, 420, 600) < targetSize / 2) {
      gameStart = true;
    }

  // Check if any other buttons (like backButton) need to handle mouse clicks
    if (gameOver) {
      backButton.checkClick();
    }
  }

  function onBackClick() {
    window.open('index.html', '_self');                     // Go to Game menu page
  }