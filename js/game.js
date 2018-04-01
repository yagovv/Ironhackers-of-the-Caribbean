function Game(canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.player = new Player(this);
  this.boat = new Boat(this, 100, 100);
}

Game.prototype.start = function() {
  this.drawAll();
  this.moveAll();
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
  this.idDraw = setInterval(
    function() {
      this.clear();
      this.boat.draw();
      this.boat.cannonBalls.forEach(element => {
        element.draw();
      });

      //draws
    }.bind(this),
    18
  );
};
Game.prototype.moveAll = function() {
  this.idMove = setInterval(
    function() {
      this.boat.move();
      this.boat.cannonBalls.forEach(function(e) {
        e.move();
      });
    }.bind(this),
    18
  ); 
};
Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
