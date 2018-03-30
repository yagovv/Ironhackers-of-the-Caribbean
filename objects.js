function Component(canvas, ctx) {
  this.width = 50;
  this.height = 50;
  this.x = 0;
  this.y = canvas.height - this.height;
  this.canvas = canvas;
  this.ctx = ctx;
  this.speedX = 1;
  this.speedY = 1;
}
Component.prototype.handleKeys = function() {
  var RIGHT_KEY = 39;
  var LEFT_KEY = 37;
  var UP_KEY = 40;
  var DOWN_KEY = 38;
  document.onkeypress = function(event) {
    switch (event.keyCode) {
      case RIGHT_KEY:
        console.log("right key pressed");
        this.id = setInterval(function() {
          this.moveRight();
          console.log("moving right");
        }, 1000 / this.speedX);
        break;
      case LEFT_KEY:
        this.moveLeft();
        break;
      case UP_KEY:
        this.moveUp();
        break;
      case DOWN_KEY:
        this.moveDown();
        break;
    }
  }.bind(this);
  document.onkeyup = function(event) {
    switch (event.keyCode) {
      case RIGHT_KEY:
        clearInterval(this.id);
        break;
      case LEFT_KEY:
        this.moveLeft();
        break;
      case UP_KEY:
        this.moveUp();
        break;
      case DOWN_KEY:
        this.moveDown();
        break;
    }
  }.bind(this);
};

Component.prototype.draw = function() {
  this.ctx.fillStyle = "red";
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};
Component.prototype.moveRight = function() {
  this.x += this.speedX;
};
Component.prototype.moveLeft = function() {
  this.x -= this.speedX;
};
Component.prototype.moveUp = function() {
  this.y += this.speedY;
};
Component.prototype.moveDown = function() {
  this.y -= this.speedY;
};
Component.prototype.accelerateX = function() {
  this.speedX++;
};
Component.prototype.brakeX = function() {
  this.speedX--;
};
Component.prototype.accelerateY = function() {
  this.speedY++;
};
Component.prototype.brakeY = function() {
  this.speedY--;
};
