let teeth = [];
let brush;
let brushing = false;
let timer = 15;
let score = 0;
let gameState = 'start'; // start, playing, end
let plaque = [];
let particles = [];
let particleCount = 0;
let gameDifficulty = localStorage.getItem("level");
if (gameDifficulty === null || gameDifficulty === "null") gameDifficulty = '1';
let backButton;
let successSound;
let missSound;
let brushSound;

function preload() {
  successSound = loadSound("/soundFX/success.mp3");
  missSound = loadSound("/soundFX/miss.mp3");
  brushSound = loadSound("/soundFX/brushingSounds.wav");
}

function setup() {
  createCanvas(1200, 800);
  setupTeeth();
  setupBrush();
  setupPlaque();
  
  backButton = new Button(375, 400, 450, 70, 255, 'Back to games', onBackClick, 1);
}

function onBackClick() {
    window.open('index.html', '_self');                     // Go to Game menu page
}

function setupTeeth() {
  teeth = []; // Reset teeth array
  let startX = 400;
  let startY = -90;
  let toothWidth = 50;
  let toothHeight = 80;
  let gap = 0; // Gap between the rows

  // Create upper row
  for (let i = 0; i < 8; i++) {
    teeth.push({
      x: startX + i * toothWidth,
      y: (height / 2) - startY - toothHeight - gap,
      w: toothWidth,
      h: toothHeight,
      color: color(255, 255, 200), // slightly yellow teeth
      cleanliness: 0 // 0 to 100
    });
  }

  // Create lower row
  for (let i = 0; i < 8; i++) {
    teeth.push({
      x: startX + i * toothWidth,
      y: (height / 2) - startY + gap,
      w: toothWidth,
      h: toothHeight,
      color: color(255, 255, 200), // slightly yellow teeth
      cleanliness: 0 // 0 to 100
    });
  }
}

function drawGame() {
  // Draw mouth
  drawMouth();
  drawEyes();
  drawEyebrows();
  drawNose();
  
  
  // Draw teeth
  for (let tooth of teeth) {
    drawTooth(tooth);
  }
  
  // Draw plaque
  for (let p of plaque) {
    fill(215, 215, 175, 200);
    noStroke();
    circle(p.x, p.y, p.size);
  }
  
  // Draw particles
  for (let particle of particles) {
    fill(255, 255, 255, particle.alpha);
    noStroke();
    circle(particle.x, particle.y, particle.size);
  }
  
  // Draw toothbrush 
  if (brushing) {
    push();
    translate(mouseX, mouseY);
    rotate(PI / 4);
    image(brush, -50, -15);
    pop();
  }
  
  // Draw UI
  drawUI();
}

function setupBrush() {
  brush = createGraphics(120, 40);
  brush.background(220, 0); // Transparent background
  
  // Bristle base (head of toothbrush)
  brush.noStroke();
  brush.fill(0, 102, 204);
  brush.rect(5, 20, 120, 10, 3); // Bristle base is now positioned just below the handle
  
  // Add bristle groups
  brush.strokeWeight(1);
  
  // Outer bristles (longer)
  brush.stroke(255);
  for (let x = 7; x < 27; x += 2) {
    brush.line(x, 20, x, 12); // Outer bristles extending up from the base
  }
  
  // Inner bristles (shorter)
  brush.stroke(240);
  for (let x = 9; x < 25; x += 2) {
    brush.line(x, 23, x, 18); // Inner bristles extending from the base
  }
  
  // Add highlight/shadow effects
  brush.stroke(255, 255, 255, 50);
  brush.line(5, 20, 35, 20); // Top highlight
  brush.stroke(0, 0, 0, 20);
  brush.line(5, 30, 35, 30); // Bottom shadow
}

function setupPlaque() {
  for (let tooth of teeth) {
    let plaqueCount = 0;
    if (gameDifficulty === '1') {
      plaqueCount = random(1, 3);
    } else if (gameDifficulty === '2') {
      plaqueCount = random(6, 12);
    } else if (gameDifficulty === '3') {
      plaqueCount = random(24, 48); 
    }
    particleCount = plaqueCount;
    for (let i = 0; i < plaqueCount; i++) {
      plaque.push({
        x: random(tooth.x + 5, tooth.x + tooth.w - 5),
        y: random(tooth.y + 5, tooth.y + tooth.h - 5),
        size: random(5, 15),
        tooth: tooth
      });
    }
  }
}

function draw() {
  background(200);
  
  if (gameState === 'start') {
    drawStartScreen();
  } else if (gameState === 'playing') {
    drawGame();
    updateTimer();
    updateParticles();
  } else if (gameState === 'end') {
    drawEndScreen();
  }
}
function drawStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  text('Tooth Brushing Game!', width/2, height/3);
  textSize(20);
  text('Clean all teeth before time runs out!', width/2, height/2);
  text('Click to start', width/2, height * 2/3);
}

function drawMouth() {
  noFill();
  
  // Extracted variables for mouth positioning
  let mouthX = (width / 2);         // X position of the mouth
  let mouthY = (height / 4) + 200;  // Y position of the mouth
  let mouthWidth = 560;             // Width of the mouth arc
  let mouthHeight = 500;            // Height of the mouth arc
  let lineOffset = 280;             // Half of the mouth width for the line
  
  // Draw an upside-down half-circle for the mouth
  stroke(0);
  strokeWeight(3);
  arc(mouthX, mouthY, mouthWidth, mouthHeight, 0, PI); // Wider and flipped
  
  // Adjust the line to close off the half-circle
  line(mouthX - lineOffset, mouthY, mouthX + lineOffset, mouthY); // Matches arc width
}

function drawTooth(tooth) {
  // Draw tooth base
  fill(lerpColor(color(255, 255, 240), color(255), tooth.cleanliness / 100));
  stroke(0);
  strokeWeight(1);
  rect(tooth.x, tooth.y, tooth.w, tooth.h, 10);
  
  // Draw shine
  if (tooth.cleanliness > 50) {
    noStroke();
    fill(255, 255, 255, map(tooth.cleanliness, 50, 100, 0, 100));
    circle(tooth.x + tooth.w * 0.2, tooth.y + tooth.h * 0.2, 10);
  }
}

function drawEyes() {
  fill(255); // White for the eyeballs
  let eyeY = (height / 4) + 150; // Y position for the eyes
  // Draw left eye
  ellipse(width / 2 - 80, eyeY, 40, 20); // Left eye
  fill(0); // Black for pupils
  ellipse(width / 2 - 80, eyeY, 10, 10); // Left pupil
  
  // Draw right eye
  fill(255); // White for the eyeball
  ellipse(width / 2 + 80, eyeY, 40, 20); // Right eye
  fill(0); // Black for pupils
  ellipse(width / 2 + 80, eyeY, 10, 10); // Right pupil
}

function drawEyebrows() {
  stroke(0); // Black color for eyebrows
  strokeWeight(4); // Adjust thickness
  
  // Left eyebrow (curved)
  noFill();
  arc(width / 2 - 80, (height / 4) + 135, 60, 20, PI, TWO_PI); // Curved eyebrow
  
  // Right eyebrow (curved)
  arc(width / 2 + 80, (height / 4) + 135, 60, 20, PI, TWO_PI); // Curved eyebrow
}

function drawNose() {
  fill(200, 150, 150); // Nose color
  let noseX = width / 2;
  let noseY = (height / 4) + 175; // Y position for the nose
  ellipse(noseX, noseY, 30, 20); // Nose shape
}
function drawUI() {
  // Draw timer
  fill(0);
  noStroke();
  textSize(24);
  textAlign(LEFT, TOP);
  text(`Time: ${ceil(timer)}s`, 20, 20);
  
  // Draw score
  text(`Score: ${score}`, 20, 50);
  
  // Draw progress bar
  let avgCleanliness = teeth.reduce((sum, tooth) => sum + tooth.cleanliness, 0) / teeth.length;
  fill(200);
  rect(width - 120, 20, 100, 20);
  fill(100, 255, 100);
  rect(width - 120, 20, map(avgCleanliness, 0, 100, 0, 100), 20);
  textSize(12);
  fill(0);
  text('Cleanliness', width - 120, 45);
}

function updateTimer() {
  if (particleCount > 0 && timer > 0 ) {
    timer -= (1 / 60);
  } else {
    
    gameState = 'end';
  }
}

function createParticle(x, y) {
  particles.push({
    x: x,
    y: y,
    vx: random(-2, 2),
    vy: random(-2, 0),
    size: random(2, 5),
    alpha: 255,
    life: 255
  });
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 5;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

function mousePressed() {

  if (gameState === 'start') {
    gameState = 'playing';
    timer = 15;
    score = 0;
    resetGame();
    } else if (gameState === 'end') {
        backButton.checkClick();
    } else {
        brushing = true;
    }
}

function mouseReleased() {
  if (gameState === 'playing') {
    brushing = false;
  }
}

function mouseDragged() {
  if (gameState === 'playing' && brushing) {
    // Check plaque collision
    for (let i = plaque.length - 1; i >= 0; i--) {
      let p = plaque[i];
      let d = dist(mouseX, mouseY, p.x, p.y);
      if (d < 20) {

        // Remove plaque
        if (!brushSound.isPlaying()) {
          brushSound.play();
        }

        plaque.splice(i, 1);
        score += 10;
        // Increase tooth cleanliness
        p.tooth.cleanliness = min(100, p.tooth.cleanliness + 5);
        // Create particles
        for (let j = 0; j < 5; j++) {
          createParticle(p.x, p.y);
        }
      }
    }
  }
}

let soundPlayed = false;
function drawEndScreen() {
  if (!soundPlayed) {
    soundPlayed = true;
    if (timer <= 0) {
      missSound.play();
    } else {
      successSound.play();
    }
  }

  // Create a semi-transparent background
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);
  
  //Menu background
  fill(255);
  rect(300, 100, 600, 400, 20);

  // Display the score
  textAlign(CENTER, CENTER);
  textSize(64);
  fill(0, 255, 0); // White color for the text
  text(`Game Over!`, width / 2, height / 2 - 210);
  fill(0);
  textSize(32);
  text(`Your Score: ${score}`, width / 2, height / 2 - 120);
  
  stroke(0);
  backButton.display();

  //Save score into local storage
  let HS = localStorage.getItem("brushingScore");
    if (HS === null || HS === "null" || parseInt(HS) < score) {
      localStorage.setItem("brushingScore", String(score));
    }
}

function draw() {
    background(200);
  
    if (gameState === 'start') {
      drawStartScreen();
    } else if (gameState === 'playing') {
      drawGame();
      updateTimer();
      updateParticles();
  
      // Check if the game should end
      if (plaque.length === 0 || timer <= 0) {
        gameState = 'end'; // Change to end state when all plaque is gone or timer runs out
      }
    } else if (gameState === 'end') {
      drawEndScreen(); // Call the end screen function
    }
  }
  

function resetGame() {
  // Reset teeth
  for (let tooth of teeth) {
    tooth.cleanliness = 0;
  }
  // Reset plaque
  plaque = [];
  setupPlaque();
  // Reset particles
  particles = [];
}