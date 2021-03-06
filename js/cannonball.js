class CannonBall {
  constructor(ship, cannon, side, inertia) {
    this.canvas = ship.canvas;
    this.cannon = cannon;
    this.ctx = ship.ctx;
    this.side = side;
    this.angle = cannon.angle;
    this.x = this.cannon.x;
    this.y = this.cannon.y;
    this.radius = 2.5;
    this.speed = 1;
    this.lifetime = 170;
    this.inertia = inertia;
    this.impacted = false;
  }
  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
  }
  move() {
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
  }
}

