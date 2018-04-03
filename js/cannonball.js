function CannonBall(ship, side, inertia, x, y) {
  this.canvas = ship.canvas;
  this.ctx = ship.ctx;
  this.x = x;
  this.y = y;
  this.side = side;
  this.angle = ship.angle;
  this.radius = 2.5;
  this.speed = 1;
  this.lifetime = 100;
  this.inertia = inertia;
  this.impacted = false;
}
CannonBall.prototype.draw = function() {
  this.ctx.fillStyle = "black";
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  this.ctx.closePath();
  this.ctx.fill();
};
CannonBall.prototype.move = function() {
  var angleRad = this.angle * (Math.PI / 180); //angle in radians
  if (this.side == "right") {
    this.x =
      this.x + this.speed * Math.cos(angleRad + Math.PI / 2) + this.inertia[0];
    this.y =
      this.y + this.speed * Math.sin(angleRad + Math.PI / 2) + this.inertia[1];
  }
  if (this.side == "left") {
    this.x =
      this.x + this.speed * Math.cos(angleRad - Math.PI / 2) + this.inertia[0];
    this.y =
      this.y + this.speed * Math.sin(angleRad - Math.PI / 2) + this.inertia[1];
  }
};
