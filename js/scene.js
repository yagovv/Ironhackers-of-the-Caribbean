function Scene (game){
  this.canvas = game.canvas;
  this.ctx = game.ctx;
  this.opacity = 0;
  this.texto = "IRONHACKERS OF THE CARIBBEAN";
  this.texto2 = "A GAME BY YAGO VEGA";
  this.texto3 = " Two brave pirates are about \nto get into an epic battle...";
  this.texto4 = "Who will win?";
  this.newScene = true;
  this.controls = "SAILS: Player 1 -> W,S ||| Arrow Up, Arrow Down <- Player 2\n STEER: Player 1 -> A,D ||| Arrow Left, Arrow Right <- Player 2\n Cannons: Player 1-> F,G ||| -,. <- Player 2 ";
}
Scene.prototype.draw = function(texto, val){
  if(this.newScene){
    this.opacity = 0;
    this.newScene = false;
  }
  
  this.ctx.fillStyle = "rgba(255,255,255," + this.opacity+")";
 
  var x = x || this.canvas.width/7;
  var y = this.canvas.height/2 -100;
  var lineheight = 50;
  var lines = texto.split('\n');
  if(val == true){
    x = 10
    this.ctx.font = "45px VT323";
  }else if(val==false){
    this.ctx.font = "80px VT323";
  }
for (var i = 0; i<lines.length; i++)
    this.ctx.fillText(lines[i], x, y + (i*lineheight) );
  // this.ctx.fillText(texto, this.canvas.width/4, this.canvas.height/2);
  this.opacity += 0.005;
}