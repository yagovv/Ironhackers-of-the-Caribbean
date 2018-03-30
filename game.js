function Game (canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.player = new Component(this.canvas, this.ctx);
}

Game.prototype.start = function() {
  this.id = setInterval(function() {
    this.clear();
    this.player.draw();
    //draws
  }.bind(this),17);
}

Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}