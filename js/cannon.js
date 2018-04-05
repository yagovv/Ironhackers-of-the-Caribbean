function Cannon (game, ship, x, y, angle){
  this.ctx = game.ctx;
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.ship = ship;
  this.number = number;
  this.offsetX = -15 + this.number * 20;
  this.offsetY = this.ship.img.width/2 + 18;
  this.img = new Image ();
  this.img.src = "images/cannon.png";
}
Cannon.prototype.draw = function(){
  if(this.side == "right"){
    this.drawRight();
  }else{
    this.drawLeft();
  }
}
Cannon.prototype.shoot = function(inertia, side){
    var angleRad = this.angle * (Math.PI / 180);
    this.ship.cannonBalls.push(new CannonBall(this.ship, this, this.side, inertia));
    if(this.side == "right"){
      this.ship.rightCannonsLoaded = false;
      this.ship.loadingRight = 0;
      this.ship.loadRightCannons();
      this.ship.deleteCannonBall();
    }else {
      this.ship.leftCannonsLoaded = false;
      this.ship.loadingLeft = 0;
      this.ship.loadLeftCannons();
      this.ship.deleteCannonBall();
    }
   
}
Cannon.prototype.move = function (){
  this.angle = this.ship.angle;
  if(this.side == "right"){
    this.x = this.ship.x + (this.offsetX * Math.cos(this.angle * Math.PI/180));  
    this.y = this.ship.y + (-this.offsetY * Math.sin(this.angle * Math.PI/180));
  }else{
    this.x = (this.ship.x + (-this.offsetX -5 )* Math.cos(this.angle * Math.PI/180));
    this.y = (this.ship.y + -this.offsetY * Math.sin(this.angle * Math.PI/180));
  }
  
}
Cannon.prototype.drawRight = function(){
  this.ctx.translate(this.ship.x, this.ship.y);
  this.ctx.rotate(((this.angle +180) * Math.PI/180));
  this.ctx.drawImage(this.img, this.offsetX, -this.offsetY, this.img.width/2, this.img.height/2);
  this.ctx.rotate((-(this.angle + 180) * Math.PI/180));
  this.ctx.translate(-this.ship.x, -this.ship.y);
}
Cannon.prototype.drawLeft = function(){
  this.ctx.translate(this.ship.x, this.ship.y);
  this.ctx.rotate(((this.angle) * Math.PI/180));
  this.ctx.beginPath();
  this.ctx.arc(this.offsetX,-this.offsetY, 5, 0, 2*Math.PI);
  this.ctx.fill();
  this.ctx.closePath();
  this.ctx.drawImage(this.img, -this.offsetX - 5, -this.offsetY, this.img.width/2, this.img.height/2);
  this.ctx.rotate((-(this.angle) * Math.PI/180));
  this.ctx.translate(-this.ship.x, -this.ship.y);
}
