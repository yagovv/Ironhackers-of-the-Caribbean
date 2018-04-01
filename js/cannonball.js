function CannonBall(ship, side) {
  this.canvas = ship.canvas;
  this.ctx = ship.ctx;
  this.x = ship.x;
  this.y = ship.y;
  this.side = side;
  this.angle = ship.angle;
  this.speed = 1;
}
CannonBall.prototype.draw = function() {
  this.ctx.fillStyle = "black";
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
  this.ctx.closePath();
  this.ctx.fill();
};
CannonBall.prototype.move = function() {
  var angleRad = this.angle * (Math.PI / 180); //angle in radians
  if(this.side == "right"){
    this.x = this.x + this.speed * Math.cos(angleRad + Math.PI/2);
    this.y = this.y + this.speed * Math.sin(angleRad + Math.PI/2);
  }
  if(this.side == "left"){
    this.x = this.x + this.speed * Math.cos(angleRad - Math.PI/2);
    this.y = this.y + this.speed * Math.sin(angleRad - Math.PI/2);
  }
};
