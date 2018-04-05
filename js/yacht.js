function Yacht(game, x, y) {
  Boat.call(this, game);
  this.x = x;
  this.y = y;
  this.cannons = [];
  this.createCannons(4);
}
Yacht.prototype = Object.create(Boat.prototype);
Yacht.prototype.constructor = Yacht;