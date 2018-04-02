function Sea(game) {
  this.winds = ["south", "north", "west", "east"];
  this.canvas = game.canvas;
  this.ctx = game.ctx;
  this.wind = this.winds[0];
  this.storm = 0; //Storm from 0 to 3
}
Sea.prototype.changeWind = function() {
  var index = Math.floor(Math.random() * 4);
  this.wind = this.winds[index];
};
Sea.prototype.createIsland = function() {};
Sea.prototype.draw = function() {};
Sea.prototype.drawWind = function() {
  //text cutre version
  this.ctx.font = "30px Arial";
  this.ctx.fillStyle = "black";
  this.ctx.fillText(
    "Wind: " + this.wind,
    this.canvas.width / 2,
    this.canvas.height - 40
  );
};
