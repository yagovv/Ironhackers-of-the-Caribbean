function Scene (game, texto){
  this.canvas = game.canvas;
  this.ctx = game.ctx;
  this.texto = texto;
}
Scene.prototype.draw = function(){
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.font = "15px Arial";
  this.ctx.fillStyle = "white";
  this.ctx.fillText(this.texto, this.canvas.width/2, this.canvas.height/2);
}