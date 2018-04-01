function Boat(game) {
  this.canvas = game.canvas;
  this.ctx = game.ctx;
  this.x = this.canvas.width / 2;
  this.y = this.canvas.height / 2;
  this.angle = 270;
  this.speed = 0;
  this.level = 1;
  this.anchorDeployed = true;
  this.health = 100;
  this.sail = 1;
  this.cannonsLoaded = true;
  this.img = new Image();
  this.img.src = "images/boat0.png";
  this.cannonBalls = [];
  this.setHandlers();
}

Boat.prototype.loadCannons = function() {
  if (!this.cannonsLoaded) {
    console.log("loading cannons!");
    setTimeout(function() {
      console.log("timeout entered", this.cannonsLoaded);
      this.cannonsLoaded = true;
    }.bind(this), 1000);
  }
};
Boat.prototype.setHandlers = function() {
  var W_KEY = 87;
  var A_KEY = 65;
  var S_KEY = 83;
  var D_KEY = 68;
  var SPACE_KEY = 32;
  var RIGHT_KEY = 39;
  var LEFT_KEY = 37;
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case D_KEY:
        this.rotateRight();
        break;
      case A_KEY:
        this.rotateLeft();
        break;
      case W_KEY:
        this.lowerSails();
        break;
      case S_KEY:
        this.raiseSails();
        break;
      case RIGHT_KEY:
        this.shootRight();
        break;
      case LEFT_KEY:
        this.shootLeft();
        break;
    }
  }.bind(this);
};
Boat.prototype.shootLeft = function() {
  if (this.cannonsLoaded) {
    this.cannonBalls.push(new CannonBall(this, "left"));
    this.cannonsLoaded = false;
    this.loadCannons();
  }
};
Boat.prototype.shootRight = function() {
  if (this.cannonsLoaded) {
    this.cannonBalls.push(new CannonBall(this, "right"));
    this.cannonsLoaded = false;
    this.loadCannons();
  }
};
Boat.prototype.rotateLeft = function() {
  this.angle -= 3;
};
Boat.prototype.rotateRight = function() {
  this.angle += 3;
};
Boat.prototype.move = function() {
  var angleRad = this.angle * (Math.PI / 180); //angle in radians
  this.x = this.x + this.speed * Math.cos(angleRad);
  this.y = this.y + this.speed * Math.sin(angleRad);
};
Boat.prototype.raiseSails = function() {
  if (this.speed >= 0.2) {
    this.speed -= 0.2;
  }
};
Boat.prototype.lowerSails = function() {
  if (this.speed <= 0.6) {
    this.speed += 0.2;
  }
};
Boat.prototype.draw = function() {
  var width = this.img.width;
  var height = this.img.height;
  var angleInRadians = this.angle * (Math.PI / 180);
  this.ctx.translate(this.x, this.y);
  this.ctx.rotate(angleInRadians);
  this.ctx.drawImage(this.img, -width / 2, -height / 2, width, height);
  this.ctx.rotate(-angleInRadians);
  this.ctx.translate(-this.x, -this.y);
};
Boat.prototype.drawWaves = function() {};

Boat.prototype.drawHitbox = function(x, y, color) {
  this.ctx.fillStyle = color;
  this.ctx.fillRect(x, y, 30, 80);
};
Boat.prototype.healthIndicator = function() {

}
