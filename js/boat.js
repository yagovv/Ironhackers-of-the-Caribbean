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
  this.width = 50;
  this.height = 80;
  // this.inertia = [];
}

Boat.prototype.loadCannons = function() {
  if (!this.cannonsLoaded) {
    console.log("loading cannons!");
    setTimeout(
      function() {
        this.cannonsLoaded = true;
      }.bind(this),
      1000
    );
  }
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
  for (var i = 0; i < this.cannonBalls.length; i++) {
    if (this.cannonBalls[i].lifetime <= 0) {
      var x = this.cannonBalls[i].x;
      var y = this.cannonBalls[i].y;
      if (!this.cannonBalls[i].impacted) {
        //DIBUJO GUAY DE AGUA (al menos antes del refactor xd)
        var missedId = setInterval(
          function() {
            this.drawMissed(x, y);
          }.bind(this),
          17
        );
        setTimeout(function() {
          clearInterval(missedId);
          console.log("cleared");
        }, 1000);
        //--------------------
      } else {
        var impactedId = setInterval(
          function() {
            this.drawImpacted(x, y);
          }.bind(this),
          17
        );
        setTimeout(function() {
          clearInterval(impactedId);
          console.log("impacted");
        }, 1000);
      }
      this.cannonBalls.splice(i, 1);
    }
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
  this.ctx.translate(this.x + this.img.width/2, this.y + this.img.height/2);
  this.ctx.rotate(angleInRadians);
  this.ctx.drawImage(this.img, -width / 2, -height / 2, width, height);
  this.ctx.rotate(-angleInRadians);
  this.ctx.translate(-this.x - this.img.width/2, -this.y - this.img.height/2);

  this.healthIndicator();
  this.drawHitbox();
  

  // this.drawHitbox("brown");
};
Boat.prototype.drawWaves = function() {};

Boat.prototype.drawHitbox = function(color) {
  // this.ctx.fillStyle = color;
  // this.ctx.translate(this.x, this.y);
  // this.ctx.rotate(-angleInRadians);
  // this.ctx.translate(-this.x, -this.y);
  this.ctx.translate(this.x, this.y);
  this.ctx.strokeStyle = "red";
  var angleInRadians = this.angle * (Math.PI / 180);
  this.ctx.rotate(angleInRadians);
  this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  this.ctx.rotate(-angleInRadians);
  this.ctx.translate(-this.x, -this.y);
};
Boat.prototype.drawImpacted = function(x, y) {
  this.ctx.fillStyle = "red";
  this.ctx.fillRect(x, y, 10, 10);
};
Boat.prototype.drawMissed = function(x, y) {
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(x, y, 10, 10);
};
Boat.prototype.healthIndicator = function() {
  this.ctx.strokeStyle = "black";
  this.ctx.strokeRect(
    this.x-10,
    this.y + this.img.height +20,
    100,
    10
  );
  this.ctx.fillStyle = "green";
  this.ctx.fillRect(
    this.x-10,
    this.y + this.img.height +20,
    this.health,
    10
  );
};
