function HealthIndicator (game, boat){
  this.boat = boat;
  this.x = boat.x;
  this.y = boat.y;
  this.ctx = boat.ctx;
  this.height = boat.height;
  this.health = boat.health;

}
HealthIndicator.prototype.draw = function (){
  this.move();
  this.ctx.strokeStyle = "black";
  this.ctx.strokeRect(
    this.x - this.height/2 -10,
    this.y + this.height/2,
    100,
    10
  );
  this.ctx.fillStyle = "green";
  this.ctx.fillRect(
    this.x -this.height/2 -10,
    this.y + this.height/2,
    this.boat.health,
    10
  );
}
HealthIndicator.prototype.move = function (){
  this.x = this.boat.x;
  this.y = this.boat.y;
}