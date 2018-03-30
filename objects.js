function Component(canvas, ctx) {
  this.width = 40;
  this.height = 40;
  this.x = 0;
  this.y = canvas.height - this.height;
  this.canvas = canvas;
  this.ctx = ctx;
  this.speedX = 1;
  this.speedY = 1;

  document.onkeydown = function (event) {
    var RIGHT_KEY = 39;
    var LEFT_KEY = 37;
    var UP_KEY = 40;
    var DOWN_KEY = 38;
    switch (event.keyCode) {
      case RIGHT_KEY:
        this.moveRight();
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
}
Component.prototype.draw = function() {
  this.ctx.fillStyle = 'red';
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

function Player(color, x, y) {
  this.color = color;
  this.x = x;
  this.y = y;
}
