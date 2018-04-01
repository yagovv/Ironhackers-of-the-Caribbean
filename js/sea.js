function Sea(game) {
  this.winds = ["south", "north", "west", "east"];
  this.wind = this.winds[1];
  this.storm = 0; //Storm from 0 to 3
}
Sea.prototype.changeWind = function() {
  this.wind = this.winds[Math.floor(Math.random * 5)];
};
Sea.prototype.createIsland = function() {};
Sea.prototype.draw = function() {};
Sea.prototype.drawWind = function() {};
