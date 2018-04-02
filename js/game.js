function Game(canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.player = new Player(this);
  this.boat = new Boat(this, 200, 200);
  this.boat2 = new Boat(this, 400, 400);
  this.sea = new Sea(this);
}
Game.prototype.start = function() {
  this.setHandlers();
  var frames = 0;
  this.idDraw = setInterval(
    function() {
      this.drawAll();
      this.moveAll();
      this.boat.cannonBalls.forEach(element => {
        this.checkImpacts(this.boat2, element);
      });
      this.boat2.cannonBalls.forEach(element => {
        this.checkImpacts(this.boat, element);
      });
     
      frames++;
      if (frames == 500) {
        this.sea.changeWind();
      }
      if (frames >= 1000) {
        frames = 0;
      }
    }.bind(this),
    18
  );
  // this.checkImpacts();
};
Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
Game.prototype.drawGrid = function() {
  var minor = 10;
  var major = minor * 5;
  var stroke = "#00FF00";
  var fill = "#009900";
  this.ctx.save();
  this.ctx.strokeStyle = stroke;
  this.ctx.fillStyle = fill;
  let width = this.ctx.canvas.width;
  let height = this.ctx.canvas.height;
  for (var x = 0; x < width; x += minor) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, 0);
    this.ctx.lineTo(x, height);
    this.ctx.lineWidth = x % major == 0 ? 0.5 : 0.25;
    this.ctx.stroke();
    if (x % major == 0) {
      this.ctx.fillText(x, x, 10);
    }
  }
  for (var y = 0; y < height; y += minor) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, y);
    this.ctx.lineTo(width, y);
    this.ctx.lineWidth = y % major == 0 ? 0.5 : 0.25;
    this.ctx.stroke();
    if (y % major == 0) {
      this.ctx.fillText(y, 0, y + 10);
    }
  }
  this.ctx.restore();
};
Game.prototype.drawAll = function() {
  this.clear();
  // this.scene.draw();
  this.boat.draw();
  this.boat2.draw();
  this.boat.cannonBalls.forEach(element => {
    element.draw();
  });
  this.boat2.cannonBalls.forEach(element => {
    element.draw();
  });
  this.sea.drawWind();
  //draws
};
Game.prototype.moveAll = function() {
  this.boat.move();
  this.boat2.move();
  this.boat.cannonBalls.forEach(function(e) {
    e.move();
  });
  this.boat2.cannonBalls.forEach(function(e) {
    e.move();
  });
};
Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
Game.prototype.checkImpacts = function(boat, cannonBall) {
  if (
    cannonBall.x < boat.x + boat.width &&
    cannonBall.x + cannonBall.radius > boat.x &&
    cannonBall.y < boat.y + boat.height &&
    cannonBall.y + cannonBall.radius > boat.y
  ) {
    this.handleImpact(boat);
      console.log("IMPACTO!!");

  }
};
Game.prototype.handleImpact = function(boat) {
  boat.health -= 10;
};
Game.prototype.setHandlers = function() {
  var W_KEY = 87;
  var A_KEY = 65;
  var S_KEY = 83;
  var D_KEY = 68;
  var UP_KEY = 38;
  var DOWN_KEY = 40;
  var SPACE_KEY = 32;
  var RIGHT_KEY = 39;
  var LEFT_KEY = 37;
  var F_KEY = 70;
  var G_KEY = 71;
  var DASH_KEY = 189;
  var PERIOD_KEY = 190;
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case D_KEY:
        this.boat.rotateRight();
        break;
      case A_KEY:
        this.boat.rotateLeft();
        break;
      case W_KEY:
        this.boat.lowerSails();
        break;
      case S_KEY:
        this.boat.raiseSails();
        break;
      case F_KEY:
        this.boat.shootLeft();
        break;
      case G_KEY:
        this.boat.shootRight();
        break;
      case RIGHT_KEY:
        this.boat2.rotateRight();
        break;
      case LEFT_KEY:
        this.boat2.rotateLeft();
        break;
      case UP_KEY:
        this.boat2.lowerSails();
        break;
      case DOWN_KEY:
        this.boat2.raiseSails();
        break;
      case DASH_KEY:
        this.boat2.shootRight();
        break;
      case PERIOD_KEY:
        this.boat2.shootLeft();
        break;
    }
  }.bind(this);
};
//poner los handlers en el game en vez de ship
//para evitar explosiones al crear 2 barcos para 2 players
