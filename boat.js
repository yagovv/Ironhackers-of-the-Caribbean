function Boat(game) {
  this.canvas = game.canvas;
  this.ctx = game.ctx;
  this.x = this.canvas.width / 2;
  this.y = this.canvas.height / 2;
  this.speed = 0;
  this.level = 1;
  this.anchorDeployed = true;
  this.health = 100;
  this.sail = 1;
  this.cannonsLoaded = true;
}

Boat.prototype.loadCannons = function() {
  if (!this.cannonsLoaded) {
    setTimeout(function() {
      this.cannonsLoaded = true;
    }, 3000);
  }
};

Boat.prototype.drawShip = function() {
  if (this.speed === 0) {
  }
};
Boat.prototype.drawWaves = function() {};

Boat.prototype.drawPixel = function(x, y, color) {
  this.ctx.rect(20);
};
