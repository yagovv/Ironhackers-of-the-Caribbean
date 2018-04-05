window.onload = function () {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var game = new Game(canvas,ctx);
  game.intro();
  
}