function Game(canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.player = new Player(this);
  this.boat = new Boat(this, 200, 200);
  this.boat2 = new Boat(this, 400, 400);
  this.sea = new Sea(this);
  this.soundtrack = new Audio("sounds/soundtrack.mp3");
}
Game.prototype.start = function() {
  this.soundtrack.play();
  this.setHandlers();
  var frames = 0;
  this.idDraw = setInterval(
    function() {
      this.drawAll();
      this.moveAll();
      this.accelerateBoat(this.boat);
      this.accelerateBoat(this.boat2);
      this.windPush(this.boat);
      this.windPush(this.boat2);
      this.boat.cannonBalls.forEach(element => {
        this.checkImpacts(this.boat2, element);
        element.lifetime -= 1;
      });
      this.boat2.cannonBalls.forEach(element => {
        this.checkImpacts(this.boat, element);
        element.lifetime -= 1;
      });
     this.boat.deleteCannonBall();
     this.boat2.deleteCannonBall();
      frames++;
      if (frames == 5000) {
        this.sea.changeWind();
      }
      if (frames >= 10000) {
        frames = 0;
      }
    }.bind(this),
    18
  );
  // this.checkImpacts();
};
Game.prototype.accelerateBoat = function(boat){
  if(boat.sails == 0){
    boat.speed = 0;
  } 
  if(boat.sails == 1){
    boat.speed = boat.maxSpeed * 0.1;   
  }
  if(boat.sails ==2){
    boat.speed = boat.maxSpeed *0.2;
  }
  if(boat.sails ==3){
    boat.speed = boat.maxSpeed * 0.3;
  }
}
Game.prototype.windPush = function(boat){
  if(this.sea.wind === boat.getDirection()){
    boat.maxSpeed = 2;
  }
  if(this.sea.wind != boat.getDirection() && (boat.maxSpeed ==2 || boat.maxSpeed ==0.5)){
    boat.maxSpeed = 1.5;
  }
  if(this.sea.backWind == boat.getDirection()){
    boat.maxSpeed = 0.5;
  }
}
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
  // this.drawGrid();
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
Game.prototype.checkColisions = function(){
  if(this.boat.x + this.boat.width){
  
  }
}
Game.prototype.checkImpacts = function(boat, cannonBall) {
  //algoritmo de la muerte que solo causa sufrimiento y destrucción
  // if (
  //   cannonBall.x - cannonBall.radius < boat.x + boat.width &&
  //   cannonBall.x + cannonBall.radius > boat.x &&
  //   cannonBall.y + cannonBall.radius < boat.y + boat.height &&
  //   cannonBall.y + cannonBall.radius > boat.y
  // ) {
  //   cannonBall.impacted = true;
  //   cannonBall.lifetime = 0;
  //   this.handleImpact(boat);
  // }
  //algoritmo maravilloso que trae vida y felicidad
  boat.hitCircles.forEach(e => {
    if( Math.abs(e.x - cannonBall.x) < (e.radius + cannonBall.radius) &&
    Math.abs(e.y - cannonBall.y) < (e.radius + cannonBall.radius) ) {
      cannonBall.impacted = true;
      cannonBall.lifetime = 0;
      this.handleImpact(boat);
    }
  });
  
};
Game.prototype.handleImpact = function(boat) {
  if(boat.health >= 10){
    boat.health -= 10;
  }else{
    clearInterval(this.idDraw);
  }

  
  
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
