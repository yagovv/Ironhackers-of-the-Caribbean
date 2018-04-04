function LoadingIndicator (game, boat){
  this.boat = boat;
  this.game = game;
}
LoadingIndicator.prototype.draw = function (){
  this.game.ctx.strokeStyle = "black";
  this.game.ctx.strokeRect(
    this.boat.x - this.boat.height/2 -10,
    this.boat.y + this.boat.height -25,
    100,
    10
  );
  this.game.ctx.fillStyle = "orange";
  this.game.ctx.fillRect(
    this.boat.x -this.boat.height/2 -10,
    this.boat.y + this.boat.height -25,
    this.boat.loading,
    10
  );


}