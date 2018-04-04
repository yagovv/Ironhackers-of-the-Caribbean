function LoadingIndicators (game, boat){
  this.boat = boat;
  this.game = game;
}
LoadingIndicators.prototype.draw = function (){
  this.game.ctx.strokeStyle = "black";
  this.game.ctx.strokeRect(
    this.boat.x - this.boat.height/2 -10,
    this.boat.y + this.boat.height -25,
    100,
    10
  );
  //Loader left
  this.game.ctx.fillStyle = "orange";
  this.game.ctx.fillRect(
    this.boat.x ,
    this.boat.y + this.boat.height -25,
    -this.boat.loadingLeft,
    10
  );
  this.game.ctx.strokeRect(
    this.boat.x,
    this.boat.y + this.boat.height -25,
    50,
    10
  )
  //Loader Right
  this.game.ctx.fillStyle = "orange";
  this.game.ctx.fillRect(
    this.boat.x,
    this.boat.y + this.boat.height -25,
    this.boat.loadingRight,
    10
  );

}