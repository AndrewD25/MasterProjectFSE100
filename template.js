class Button {
    constructor(x, y, w, h, c, text, onClick, target=99) {
      this.x = x;                     // x position of the rectangle
      this.y = y;                     // y position of the rectangle
      this.w = w;                     // width of the rectangle
      this.h = h;                     // height of the rectangl
      this.c = c;                     // fill color
      this.text = text;               // text for the rectangle
      this.onClick = onClick;         // function to call when the rectangle is clicked
      this.fillColor = color(c);    // Default fill color
      this.target = target;
    }
  
    // Method to display the button and the text
    display() {
      fill(this.fillColor);
      rect(this.x, this.y, this.w, this.h, 5);
      textAlign(CENTER, CENTER);
      fill("blue");                        // Set text color to black
      textSize(16);
      text(this.text, this.x + this.w / 2, this.y + this.h / 2);
    }
  
    // Method to check if the button was clicked
    checkClick() {
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        if (this.target != 99) {
          updateCurrentPage(this.target);
        }
        //debugger;
        this.onClick();               // Trigger the onClick action if the mouse is inside the button
      }
    }
}

if (localStorage.getItem("currentPage") === null) {
  updateCurrentPage(0);
}
let currentPage = parseInt(localStorage.getItem("currentPage"));

localStorage.setItem("currentPage", 0);

function updateCurrentPage(page) {
  localStorage.setItem("currentPage", page);
}