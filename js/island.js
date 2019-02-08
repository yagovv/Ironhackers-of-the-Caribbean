class Island {
  constructor(game) {
    this.canvas = game.canvas;
    this.ctx = game.ctx;
    this.x = 50;
    this.y = 50;
    this.radius = 40;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#f4b642";
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
