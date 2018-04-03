function hitCircle(game, x, y){
  this.x = x;
  this.y = y;
  this.radius = 13.5;
}

hitCircle.prototype.move = function (x, y){
  this.x = x;
  this.y = y;
}