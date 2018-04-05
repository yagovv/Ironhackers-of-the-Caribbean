function ManOfWar (game, x, y) {
  Boat.call(this, game);
  this.x = x;
  this.y = y;
  this.img = new Image();
  this.img.src = "images/manofwar.png"
  this.cannons = [];
  this.createCannons(12);
  this.adjustCannons();
}
ManOfWar.prototype = Object.create(Boat.prototype);
ManOfWar.prototype.constructor = ManOfWar;

ManOfWar.prototype.drawSails = function (){
  var angleInRadians = this.angle * (Math.PI / 180);
  this.ctx.translate(this.x, this.y);
  this.ctx.rotate(angleInRadians + Math.PI / 2);
  this.ctx.rotate(-Math.PI / 2);
  this.ctx.beginPath();
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(50, -30, this.sailWidth, 60);
  this.ctx.closePath();

  this.ctx.beginPath();
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(0, -50, this.sailWidth, 100);
  this.ctx.closePath();

  this.ctx.beginPath();
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(-50, -30, this.sailWidth, 60);
  this.ctx.closePath();
  this.ctx.rotate(Math.PI / 2);
  this.ctx.rotate(-angleInRadians - Math.PI / 2);
  this.ctx.translate(-this.x, -this.y);
}
ManOfWar.prototype.adjustCannons = function (){
  this.cannons.forEach(function(e){
    e.offsetX *= 0.6 ;
    e.number *= 3;
  })
}
ManOfWar.prototype.createCannons = function(number) {
  var j = 0;
  var k = 0;
  for (var i = 0; i < number; i++) {
    if (i < number / 2) {
      this.cannons.push(new Cannon(this.game, this, j, "right"));
      j++;
    } else {
      this.cannons.push(new Cannon(this.game, this, k, "left"));
      k++;
    }
  }
};