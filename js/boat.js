function Boat(game, x, y) {
  this.canvas = game.canvas;
  this.ctx = game.ctx;
  this.x = x;
  this.y = y;
  this.angle = 270;
  this.maxSpeed = 1;
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
  // this.inertia = [];
}

Boat.prototype.loadCannons = function() {
  if (!this.cannonsLoaded) {
    console.log("loading cannons!");
    setTimeout(
      function() {
        console.log("timeout entered", this.cannonsLoaded);
        this.cannonsLoaded = true;
      }.bind(this),
      1000
    );
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
    var inertia = [];
    var angleRad = this.angle * (Math.PI / 180);
    inertia[0] = this.speed * Math.cos(angleRad);
    inertia[1] = this.speed * Math.sin(angleRad);
    this.cannonBalls.push(new CannonBall(this, "left", inertia));
    this.cannonsLoaded = false;
    this.loadCannons();
    this.deleteCannonBall();
  }
};
Boat.prototype.shootRight = function() {
  if (this.cannonsLoaded) {
    var inertia = [];
    var angleRad = this.angle * (Math.PI / 180);
    inertia[0] = this.speed * Math.cos(angleRad);
    inertia[1] = this.speed * Math.sin(angleRad);
    this.cannonBalls.push(new CannonBall(this, "right", inertia));
    this.cannonsLoaded = false;
    this.loadCannons();
    this.deleteCannonBall();
  }
};
Boat.prototype.deleteCannonBall = function() {
  setTimeout(
    function() {
      console.log("Deleted", this.cannonBalls);
      var x = this.cannonBalls[0].x;
      var y = this.cannonBalls[0].y;
      var missedId = setInterval(function(){
        this.drawMissed(x,y);
      }.bind(this), 17);
      setTimeout (function(){
        clearInterval(missedId);
        console.log("cleared");
      }, 1000);
      this.cannonBalls.shift();
      console.log(this.cannonBalls);
    }.bind(this),
    2000
  );
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
  //this.inertia[0] =
  //this.inertia[1] = this.speed * Math.sin(angleRad);
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

  this.healthIndicator();

  // this.drawHitbox("brown");
};
Boat.prototype.drawWaves = function() {};

Boat.prototype.drawHitbox = function(color) {
  this.ctx.fillStyle = color;
  var angleInRadians = this.angle * (Math.PI / 180);
  // this.ctx.translate(this.x, this.y);
  this.ctx.rotate(angleInRadians);
  this.ctx.fillRect(this.x, this.y, 30, 80);
  // this.ctx.rotate(-angleInRadians);
  // this.ctx.translate(-this.x, -this.y);
};
Boat.prototype.drawMissed = function(x,y) {
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(x,y,10,10);
};
Boat.prototype.healthIndicator = function() {
  this.ctx.strokeRect(this.x - this.img.width/2 -10, this.y + this.img.height, 100, 10);
  this.ctx.fillStyle = "green";
  this.ctx.fillRect(this.x - this.img.width/2 - 10, this.y + this.img.height, this.health, 10);
};
