function Sea(game) {
  this.winds = ["south", "north", "west", "east"];
  this.canvas = game.canvas;
  this.ctx = game.ctx;
  this.wind = this.winds[1];
  this.backWind = this.winds[0];
  this.storm = 0; //Storm from 0 to 3
}
Sea.prototype.changeWind = function() {
  var index = Math.floor(Math.random() * 4);
  this.wind = this.winds[index];
  switch (index){
    case 0: 
      this.backWind = this.winds[1];
      break;
    case 1:
      this.backWind = this.winds[0];
      break;
    case 2:
      this.backWind = this.winds[3];
      break;
    case 3:
      this.backWind = this.winds[2];
      break;
  }
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
