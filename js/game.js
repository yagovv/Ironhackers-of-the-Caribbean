/*TODO:
  "POWER UPS" -> BARRILES DE RON PARA RECARGAR MAS RAPIDO!!
  SIRENAS QUE BAJAN LA VELOCIDAD Y VELOCIDAD DE RECARGA!!
  AÑADIR ISLAS !!NO
  AÑADIR TORMENTAS !!NO
  MENU PARA ELEGIR BARCO (CON PERSONAJES) !!!
  INTRODUCCION CON "HISTORIA"-?
*/
function Game(canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
  // this.player = new Player(this);
  this.boat = new Boat(this, 100, this.canvas.height/2);
  this.boat2 = new Boat(this, this.canvas.width-100, this.canvas.height/2);
  this.boat2.angle = 180;
  this.sea = new Sea(this);
  this.soundtrack = new Audio("sounds/fight_bso.mp3");
  this.recentlyCollided = false;
  this.keys = new Keys(this);
}
Game.prototype.start = function() {
  this.soundtrack.play();
  this.setHandlers();
  var frames = 0;
  this.idDraw = setInterval(
    function() {
      this.checkBoundaries();
      this.checkWinner();
      this.handle();
      this.drawAll();
      this.moveAll();
      this.accelerateBoat(this.boat);
      this.accelerateBoat(this.boat2);
      this.boat.loadCannons();
      this.boat2.loadCannons();
      this.windPush(this.boat);
      this.windPush(this.boat2);
      this.checkColisions();
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
      if (frames % 40 == 0) {
        this.sea.frameIndex *= -1;
      } 
      if (frames % 1000 == 0) {
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
Game.prototype.accelerateBoat = function(boat) {
  if (boat.sails == 0) {
    boat.speed = 0;
  }
  if (boat.sails == 1) {
    boat.speed = boat.maxSpeed * 0.1;
  }
  if (boat.sails == 2) {
    boat.speed = boat.maxSpeed * 0.2;
  }
  if (boat.sails == 3) {
    boat.speed = boat.maxSpeed * 0.3;
  }
};
Game.prototype.windPush = function(boat) {
  if (this.sea.wind === boat.getDirection()) {
    boat.maxSpeed = 2;
  }
  if (
    this.sea.wind != boat.getDirection() &&
    (boat.maxSpeed == 2 || boat.maxSpeed == 0.5)
  ) {
    boat.maxSpeed = 1;
  }
  if (this.sea.backWind == boat.getDirection()) {
    boat.maxSpeed = 0.5;
  }
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
  // this.drawGrid();
  // this.scene.draw();
  this.sea.draw();
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
Game.prototype.checkColisions = function() {
  this.boat.hitCircles.forEach(e => {
    this.boat2.hitCircles.forEach(o => {
      if (
        Math.abs(e.x - o.x) < e.radius + o.radius &&
        Math.abs(e.y - o.y) < e.radius + o.radius
      ) {
        if (!this.recentlyCollided) {
          this.boat.health -= 20;
          this.boat2.health -= 20;
          this.recentlyCollided = true;
          setTimeout(() => {
            this.recentlyCollided = false;
          }, 7000);
        }
        this.boat.speed = 0;
        this.boat2.speed = 0;
      }
    });
  });
};
Game.prototype.checkImpacts = function(boat, cannonBall) {
  //algoritmo maravilloso que trae vida y felicidad
  boat.hitCircles.forEach(e => {
    if (
      Math.abs(e.x - cannonBall.x) < e.radius + cannonBall.radius &&
      Math.abs(e.y - cannonBall.y) < e.radius + cannonBall.radius
    ) {
      cannonBall.impacted = true;
      cannonBall.lifetime = 0;
      this.handleImpact(boat);
    }
  });
};
Game.prototype.checkBoundaries = function(){
  this.boat.hitCircles.forEach(e => {
    if(e.x + e.radius >= this.canvas.width || 
      e.x - e.radius <= 0 ||
      e.y + e.radius >= this.canvas.height ||
      e.y - e.radius <= 0){
      this.boat.speed = 0.1;
    }
  });
  this.boat2.hitCircles.forEach(e => {
    if(e.x + e.radius >= this.canvas.width || 
      e.x - e.radius <= 0 ||
      e.y + e.radius >= this.canvas.height ||
      e.y - e.radius <= 0){
      this.boat2.speed = 0.1;
    }
  });

}
Game.prototype.handleImpact = function(boat) {
  if (boat.health >= 10) {
    boat.health -= 10;
  }
};
Game.prototype.checkWinner = function() {
  if (this.boat.health <= 0) {
    this.printWinner(2);
    clearInterval(this.idDraw);
  } else if (this.boat2.health <= 0) {
    this.printWinner(1);
    clearInterval(this.idDraw);
  }
};
Game.prototype.printWinner = function(winner) {
  setInterval(
    function() {
      this.ctx.beginPath();
      this.ctx.fillStyle = "red";
      this.ctx.font = "80px Georgia";
      this.ctx.fillText(
        "Player " + winner + " WINS",
        this.canvas.width / 4 - 120,
        this.canvas.height / 2 - 100
      );
      this.ctx.strokeText("Player " + winner + " WINS",
      this.canvas.width / 4 - 120,
      this.canvas.height / 2 - 100);
      this.ctx.closePath();
    }.bind(this),
    17
  );
};
Game.prototype.sinkBoat = function(boat) {};
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
  var that = this;
  window.addEventListener("keydown", event => {
    switch (event.keyCode) {
      case D_KEY:
        that.keys.setTrue(event);
        break;
      case A_KEY:
        that.keys.setTrue(event);
        break;
      case W_KEY:
        that.boat.lowerSails();
        break;
      case S_KEY:
        that.boat.raiseSails();
        break;
      case F_KEY:
        that.keys.setTrue(event);
        break;
      case G_KEY:
        that.keys.setTrue(event);
        break;
      case RIGHT_KEY:
        that.keys.setTrue(event);
        break;
      case LEFT_KEY:
        that.keys.setTrue(event);
        break;
      case UP_KEY:
        that.boat2.lowerSails();
        break;
      case DOWN_KEY:
        that.boat2.raiseSails();
        break;
      case DASH_KEY:
        that.keys.setTrue(event);
        break;
      case PERIOD_KEY:
        that.keys.setTrue(event);
        break;
    }
  });
  window.addEventListener("keyup", event => {
    switch (event.keyCode) {
      case D_KEY:
        that.keys.setTrue(event);
        break;
      case A_KEY:
        that.keys.setTrue(event);
        break;
      case F_KEY:
        that.keys.setTrue(event);
        break;
      case G_KEY:
        that.keys.setTrue(event);
        break;
      case RIGHT_KEY:
        that.keys.setTrue(event);
        break;
      case LEFT_KEY:
        that.keys.setTrue(event);
        break;
      case DASH_KEY:
        that.keys.setTrue(event);
        break;
      case PERIOD_KEY:
        that.keys.setTrue(event);
        break;
    }
  });
};
Game.prototype.handle = function() {
  if (this.keys.KeyW) {
    this.boat.lowerSails();
  }
  if (this.keys.KeyA) {
    this.boat.rotateLeft();
  }
  if (this.keys.KeyS) {
    this.boat.raiseSails();
  }
  if (this.keys.KeyD) {
    this.boat.rotateRight();
  }
  if (this.keys.ArrowUp) {
    this.boat2.lowerSails();
  }
  if (this.keys.ArrowDown) {
    this.boat2.raiseSails();
  }
  if (this.keys.ArrowRight) {
    this.boat2.rotateRight();
  }
  if (this.keys.ArrowLeft) {
    this.boat2.rotateLeft();
  }
  if (this.keys.KeyF) {
    this.boat.shootLeft();
  }
  if (this.keys.KeyG) {
    this.boat.shootRight();
  }
  if (this.keys.Slash) {
    this.boat2.shootRight();
  }
  if (this.keys.Period) {
    this.boat2.shootLeft();
  }
};
Game.prototype.boarding = function() {
  clearInterval(this.idDraw);
  this.boardingId = setInterval(function() {
    this.drawBoarding;
  }, 17);
};
Game.prototype.drawBoarding = function() {};
Game.prototype.menu = function() {

}
