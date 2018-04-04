function Boat(game, x, y) {
  this.canvas = game.canvas;
  this.ctx = game.ctx;
  this.x = x;
  this.y = y;
  this.angle = 0;
  this.maxSpeed = 1;
  this.speed = 0;
  this.level = 1;
  this.anchorDeployed = true;
  this.health = 100;
  this.loadingRight = 50;
  this.loadingLeft = 50;
  this.rightCannonsLoaded = true;
  this.leftCannonsLoaded = true;
  this.img = new Image();
  this.img.src = "images/boatv3.png";
  this.cannonBalls = [];
  this.width = 27;
  this.height = 80;
  this.sails = 0; //0 for no sails, 1, for low, 2, for medium, 3 for high
  // this.inertia = [];
  this.hitCircles = [];
  this.hitCircles.push(new hitCircle(this.game, this.x, this.y));  
  this.hitCircles.push(new hitCircle(this.game, this.x - 10 * Math.cos(this.angle * Math.PI/180), this.y - 10 * Math.sin(this.angle * Math.PI/180)));  
  this.hitCircles.push(new hitCircle(this.game, this.x - 20 * Math.cos(this.angle * Math.PI/180), this.y - 20 * Math.sin(this.angle * Math.PI/180)));  
  this.hitCircles.push(new hitCircle(this.game, this.x - 25 * Math.cos(this.angle * Math.PI/180), this.y - 25 * Math.sin(this.angle * Math.PI/180)));  
  this.hitCircles.push(new hitCircle(this.game, this.x + 10 * Math.cos(this.angle * Math.PI/180), this.y + 10 * Math.sin(this.angle * Math.PI/180)));  
  this.hitCircles.push(new hitCircle(this.game, this.x + 20 * Math.cos(this.angle * Math.PI/180), this.y + 20 * Math.sin(this.angle * Math.PI/180)));  
  this.hitCircles.push(new hitCircle(this.game, this.x + 25 * Math.cos(this.angle * Math.PI/180), this.y + 25 * Math.sin(this.angle * Math.PI/180)));  

  this.healthIndicator = new HealthIndicator(game, this);
  this.loadingIndicator = new LoadingIndicators(game, this);
}
Boat.prototype.loadCannons = function (){
  this.loadLeftCannons();
  this.loadRightCannons();
}
Boat.prototype.loadLeftCannons = function() {
  if (!this.leftCannonsLoaded) {
    this.loadingLeft+= 0.25;
    if(this.loadingLeft == 50){
      this.leftCannonsLoaded = true;
    }
  }
};
Boat.prototype.loadRightCannons = function() {
  if (!this.rightCannonsLoaded) {
    this.loadingRight+= 0.25;
    if(this.loadingRight == 50){
      this.rightCannonsLoaded = true;
    }
  }
}
Boat.prototype.shootLeft = function() {
  if (this.leftCannonsLoaded) {
    var inertia = [];
    var angleRad = this.angle * (Math.PI / 180);
    inertia[0] = this.speed * Math.cos(angleRad);
    inertia[1] = this.speed * Math.sin(angleRad);
    this.cannonBalls.push(new CannonBall(this, "left", inertia, this.x + 14 * Math.cos(angleRad), this.y + 13 * Math.sin(angleRad)));
    this.cannonBalls.push(new CannonBall(this, "left", inertia, this.x - 8 * Math.cos(angleRad), this.y  -  8* Math.sin(angleRad)));
    this.leftCannonsLoaded = false;
    this.loadingLeft = 0;
    this.loadLeftCannons();
    this.deleteCannonBall();
  }
};
Boat.prototype.shootRight = function() {
  if (this.rightCannonsLoaded) {
    var inertia = [];
    var angleRad = this.angle * (Math.PI / 180);
    inertia[0] = this.speed * Math.cos(angleRad);
    inertia[1] = this.speed * Math.sin(angleRad);
    this.cannonBalls.push(new CannonBall(this, "right", inertia, this.x + 14 * Math.cos(angleRad), this.y + 13 * Math.sin(angleRad)));
    this.cannonBalls.push(new CannonBall(this, "right", inertia, this.x - 8 * Math.cos(angleRad), this.y  -  8* Math.sin(angleRad)));
    this.rightCannonsLoaded = false;
    this.loadingRight = 0;
    this.loadRightCannons();
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
            this.drawMissed(x, y);
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
  this.angle -= 0.2;
  if(this.angle < 0){
    this.angle = 360;
  }
};
Boat.prototype.rotateRight = function() {
  this.angle += 0.2;
  if(this.angle >= 360){
    this.angle = 0;
  }
};
Boat.prototype.move = function() {
  var angleRad = this.angle * (Math.PI / 180); //angle in radians
  this.x = this.x + this.speed * Math.cos(angleRad);
  this.y = this.y + this.speed * Math.sin(angleRad);
  this.hitCircles[0].move(this.x, this.y);  
  this.hitCircles[1].move(this.x - 10 * Math.cos(this.angle * Math.PI/180), this.y - 10 * Math.sin(this.angle * Math.PI/180));  
  this.hitCircles[2].move(this.x - 20 * Math.cos(this.angle * Math.PI/180), this.y - 20 * Math.sin(this.angle * Math.PI/180));  
  this.hitCircles[3].move(this.x - 25 * Math.cos(this.angle * Math.PI/180), this.y - 25 * Math.sin(this.angle * Math.PI/180));  
  this.hitCircles[4].move(this.x + 10 * Math.cos(this.angle * Math.PI/180), this.y + 10 * Math.sin(this.angle * Math.PI/180));  
  this.hitCircles[5].move(this.x + 20 * Math.cos(this.angle * Math.PI/180), this.y + 20 * Math.sin(this.angle * Math.PI/180));  
  this.hitCircles[6].move(this.x + 25 * Math.cos(this.angle * Math.PI/180), this.y + 25 * Math.sin(this.angle * Math.PI/180));  

};
Boat.prototype.raiseSails = function() {
  if(this.sails>0){
    this.sails--;
  }
};
Boat.prototype.lowerSails = function() {
  if(this.sails<3){
    this.sails++;
  }
};
Boat.prototype.getDirection = function() {
  if(this.angle <=210 && this.angle > 150){
    return "east";
  }
  if(this.angle >=330 || this.angle < 30){
    return "west";
  }
  if(this.angle <=120 && this.angle > 60){
    return "north";
  }
  if(this.angle <=300 && this.angle > 240){
    return "south";
  }
}
Boat.prototype.draw = function() {
  var width = this.img.width;
  var height = this.img.height;
  var angleInRadians = this.angle * (Math.PI / 180);
  this.ctx.translate(this.x, this.y);
  this.ctx.rotate(angleInRadians + Math.PI/2);
  this.ctx.drawImage(this.img, -width / 2, -7.5 -height / 2, width, height);
  this.sailWidth = 1 + this.speed * 14;
  this.ctx.rotate(-Math.PI/2);
  this.ctx.beginPath();
  this.ctx.fillStyle= "white";
  this.ctx.fillRect(0, -30, this.sailWidth, 60);
  this.ctx.closePath();
  this.ctx.rotate(Math.PI/2);
  this.ctx.rotate(-angleInRadians - Math.PI/2);
  this.ctx.translate(-this.x, -this.y);
  // DRAWING LOS CIRCLES DE LOS WEBS
  // this.hitCircles.forEach(e => {
  //   this.ctx.beginPath();
  //   this.ctx.arc(e.x, e.y, e.radius, 0, 2*Math.PI);
  //   this.ctx.stroke();
  //   this.ctx.closePath();
  // });
  //------------------------------
  this.healthIndicator.draw();
  this.loadingIndicator.draw();
};
Boat.prototype.drawPath = function() {};

Boat.prototype.drawHitbox = function(color) {
  // this.ctx.fillStyle = color;
  // this.ctx.translate(this.x, this.y);
  // this.ctx.rotate(-angleInRadians);
  // this.ctx.translate(-this.x, -this.y);
  this.ctx.translate(this.x + this.width/2, this.y + this.height/2);
  this.ctx.strokeStyle = "red";
  var angleInRadians = this.angle * (Math.PI / 180);
  this.ctx.rotate(angleInRadians);
  this.ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  this.ctx.rotate(-angleInRadians);
  this.ctx.translate(-this.x - this.width/2, -this.y - this.height/2);
};
Boat.prototype.drawImpacted = function(x, y) {
  this.ctx.fillStyle = "red";
  this.ctx.fillRect(x, y, 10, 10);
};
Boat.prototype.drawMissed = function(x, y) {
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(x, y, 10, 10);
};

