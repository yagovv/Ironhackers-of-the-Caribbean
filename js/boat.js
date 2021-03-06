class Boat {
  constructor(game, x, y) {
    this.game = game;
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
    this.img.src = "images/boatv2no.png";
    this.cannonBalls = [];
    this.width = 27;
    this.height = 80;
    this.sails = 0; //0 for no sails, 1, for low, 2, for medium, 3 for high
    // this.inertia = [];
    this.hitCircles = [];
    this.hitCircles.push(new hitCircle(this.game, this.x, this.y));
    this.hitCircles.push(new hitCircle(this.game, this.x - 10 * Math.cos(this.angle * Math.PI / 180), this.y - 10 * Math.sin(this.angle * Math.PI / 180)));
    this.hitCircles.push(new hitCircle(this.game, this.x - 20 * Math.cos(this.angle * Math.PI / 180), this.y - 20 * Math.sin(this.angle * Math.PI / 180)));
    this.hitCircles.push(new hitCircle(this.game, this.x - 25 * Math.cos(this.angle * Math.PI / 180), this.y - 25 * Math.sin(this.angle * Math.PI / 180)));
    this.hitCircles.push(new hitCircle(this.game, this.x + 10 * Math.cos(this.angle * Math.PI / 180), this.y + 10 * Math.sin(this.angle * Math.PI / 180)));
    this.hitCircles.push(new hitCircle(this.game, this.x + 20 * Math.cos(this.angle * Math.PI / 180), this.y + 20 * Math.sin(this.angle * Math.PI / 180)));
    this.hitCircles.push(new hitCircle(this.game, this.x + 25 * Math.cos(this.angle * Math.PI / 180), this.y + 25 * Math.sin(this.angle * Math.PI / 180)));
    this.healthIndicator = new HealthIndicator(game, this);
    this.loadingIndicator = new LoadingIndicators(game, this);
    this.cannons = [];
    this.createCannons(4);
  }
  createCannons(number) {
    var j = 0;
    var k = 0;
    for (var i = 0; i < number; i++) {
      if (i < number / 2) {
        this.cannons.push(new Cannon(this.game, this, j + 1, "right"));
        j++;
      }
      else {
        this.cannons.push(new Cannon(this.game, this, k + 1, "left"));
        k++;
      }
    }
  }
  loadCannons() {
    this.loadLeftCannons();
    this.loadRightCannons();
  }
  loadLeftCannons() {
    if (!this.leftCannonsLoaded) {
      this.loadingLeft += 0.25;
      if (this.loadingLeft == 50) {
        this.leftCannonsLoaded = true;
      }
    }
  }
  loadRightCannons() {
    if (!this.rightCannonsLoaded) {
      this.loadingRight += 0.25;
      if (this.loadingRight == 50) {
        this.rightCannonsLoaded = true;
      }
    }
  }
  shoot(side) {
    var angleRad = this.angle * (Math.PI / 180);
    var inertia = [];
    inertia[0] = this.speed * Math.cos(angleRad);
    inertia[1] = this.speed * Math.sin(angleRad);
    this.cannons.forEach(function (e) {
      if (e.side == side) {
        e.shoot(inertia, side);
      }
    });
  }
  shootLeft() {
    if (this.leftCannonsLoaded) {
      this.shoot("left");
    }
  }
  shootRight() {
    if (this.rightCannonsLoaded) {
      this.shoot("right");
    }
  }
  deleteCannonBall() {
    for (var i = 0; i < this.cannonBalls.length; i++) {
      if (this.cannonBalls[i].lifetime <= 0) {
        var x = this.cannonBalls[i].x;
        var y = this.cannonBalls[i].y;
        if (!this.cannonBalls[i].impacted) {
          //DIBUJO GUAY DE AGUA (al menos antes del refactor xd)
          this.drawMissed(x, y);
          //--------------------
        }
        else {
          this.drawImpacted(x, y);
        }
        this.cannonBalls.splice(i, 1);
      }
    }
  }
  rotateLeft() {
    this.angle -= 0.2;
    if (this.angle < 0) {
      this.angle = 360;
    }
  }
  rotateRight() {
    this.angle += 0.2;
    if (this.angle >= 360) {
      this.angle = 0;
    }
  }
  move() {
    var angleRad = this.angle * (Math.PI / 180); //angle in radians
    this.x = this.x + this.speed * Math.cos(angleRad);
    this.y = this.y + this.speed * Math.sin(angleRad);
    this.cannons.forEach(e => {
      e.move();
    });
    this.hitCircles[0].move(this.x, this.y);
    this.hitCircles[1].move(this.x - 10 * Math.cos(this.angle * Math.PI / 180), this.y - 10 * Math.sin(this.angle * Math.PI / 180));
    this.hitCircles[2].move(this.x - 20 * Math.cos(this.angle * Math.PI / 180), this.y - 20 * Math.sin(this.angle * Math.PI / 180));
    this.hitCircles[3].move(this.x - 25 * Math.cos(this.angle * Math.PI / 180), this.y - 25 * Math.sin(this.angle * Math.PI / 180));
    this.hitCircles[4].move(this.x + 10 * Math.cos(this.angle * Math.PI / 180), this.y + 10 * Math.sin(this.angle * Math.PI / 180));
    this.hitCircles[5].move(this.x + 20 * Math.cos(this.angle * Math.PI / 180), this.y + 20 * Math.sin(this.angle * Math.PI / 180));
    this.hitCircles[6].move(this.x + 25 * Math.cos(this.angle * Math.PI / 180), this.y + 25 * Math.sin(this.angle * Math.PI / 180));
  }
  raiseSails() {
    if (this.sails > 0) {
      this.sails--;
    }
  }
  lowerSails() {
    if (this.sails < 3) {
      this.sails++;
    }
  }
  getDirection() {
    if (this.angle <= 210 && this.angle > 150) {
      return "east";
    }
    if (this.angle >= 330 || this.angle < 30) {
      return "west";
    }
    if (this.angle <= 120 && this.angle > 60) {
      return "north";
    }
    if (this.angle <= 300 && this.angle > 240) {
      return "south";
    }
  }
  draw() {
    var width = this.img.width;
    var height = this.img.height;
    var angleInRadians = this.angle * (Math.PI / 180);
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(angleInRadians + Math.PI / 2);
    this.ctx.drawImage(this.img, -width / 2, -7.5 - height / 2, width, height);
    this.sailWidth = 1 + this.speed * 14;
    this.ctx.rotate(-Math.PI / 2);
    this.ctx.rotate(Math.PI / 2);
    this.ctx.rotate(-angleInRadians - Math.PI / 2);
    this.ctx.translate(-this.x, -this.y);
    this.cannons.forEach(function (e) {
      e.draw();
    });
    this.drawSails();
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
  }
  drawPath() { }
  drawHitbox(color) {
    // this.ctx.fillStyle = color;
    // this.ctx.translate(this.x, this.y);
    // this.ctx.rotate(-angleInRadians);
    // this.ctx.translate(-this.x, -this.y);
    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.ctx.strokeStyle = "red";
    var angleInRadians = this.angle * (Math.PI / 180);
    this.ctx.rotate(angleInRadians);
    this.ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
    this.ctx.rotate(-angleInRadians);
    this.ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
  }
  drawImpacted(x, y) {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(x, y, 10, 10);
  }
  drawMissed(x, y) {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(x, y, 10, 10);
  }
  drawSails() {
    var angleInRadians = this.angle * (Math.PI / 180);
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(angleInRadians + Math.PI / 2);
    this.ctx.rotate(-Math.PI / 2);
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, -30, this.sailWidth, 60);
    this.ctx.closePath();
    this.ctx.rotate(Math.PI / 2);
    this.ctx.rotate(-angleInRadians - Math.PI / 2);
    this.ctx.translate(-this.x, -this.y);
  }
}


