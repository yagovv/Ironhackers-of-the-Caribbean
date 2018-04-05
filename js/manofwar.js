function ManOfWar (game, x, y) {
  Boat.call(this, game);
  this.cannons = [];
  this.createCannons(12);
}
ManOfWar.prototype = Object.create(Boat.prototype);
ManOfWar.prototype.constructor = ManOfWar;