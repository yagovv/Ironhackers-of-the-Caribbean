window.onload =  () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const game = new Game(canvas,ctx);
  game.intro();
  
}