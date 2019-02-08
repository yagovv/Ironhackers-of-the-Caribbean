class Sea {
  constructor(game) {
    this.winds = ["south", "north", "west", "east"];
    this.canvas = game.canvas;
    this.ctx = game.ctx;
    this.changeWind();
    this.storm = 0; //Storm from 0 to 3
    this.windArrow = new Image();
    this.windArrow.src = 'images/arrow-wind.png';
    this.seaSprite = new Image();
    this.seaSprite.src = 'images/sea_sprite.png';
    this.frameIndex = 1;
  }
  changeWind() {
    var index = Math.floor(Math.random() * 4);
    this.wind = this.winds[index];
    switch (index) {
      case 0:
        this.backWind = this.winds[1];
        break;
      case 1:
        this.backWind = this.winds[0];
        break;
      case 2:
        this.backWind = this.winds[3];
        break;
      case 3:
        this.backWind = this.winds[2];
        break;
    }
  }

  draw() {
    this.drawSea();
  }
  
  drawWind() {
    // rosa fashion de los vientos
    var angle = 0;
    var width = 100;
    var radius = width - 20;
    var x = this.canvas.width - width;
    var y = 0;
    if (this.wind == "south") {
      angle = 270;
    }
    else if (this.wind == "north") {
      angle = 90;
    }
    else if (this.wind == "east") {
      angle = 180;
    }
    else if (this.wind == "west") {
      angle = 0;
    }
    angle = angle * Math.PI / 180;
    this.ctx.translate((x + width / 2 + 30) / 2, y + width / 2);
    this.ctx.rotate(angle);
    this.ctx.fillStyle = "red";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, width / 2, 0, 2 * Math.PI);
    this.ctx.fillStyle = "blue";
    this.ctx.fill();
    this.ctx.drawImage(this.windArrow, -20, -20, 40, 40);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.rotate(-angle);
    this.ctx.translate((-x - width / 2 - 30) / 2, -y - width / 2);
    this.ctx.fillStyle = "white";
    this.ctx.font = "15px Arial";
    this.ctx.fillText("N", (x + width / 2 + 20) / 2, y + 15);
    this.ctx.fillText("S", (x + width / 2 + 20) / 2, width - 10);
    this.ctx.fillText("W", (x + 5) / 2 - 5, width / 2 + 5);
    this.ctx.fillText("E", (x + width + 40) / 2, width / 2 + 5);
    // this.ctx.drawImage(this.windArrow, x, y, );
  }
  drawSea() {
    var multiplos = this.canvas.width / 40;
    if (this.frameIndex == 1) {
      for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 40; j++) {
          this.ctx.drawImage(this.seaSprite, this.seaSprite.width / 2 + 1, 10, this.seaSprite.width / 8, this.seaSprite.width / 8, multiplos * j, multiplos * i, 40, 40);
        }
      }
    }
    else if (this.frameIndex == -1) {
      for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 40; j++) {
          this.ctx.drawImage(this.seaSprite, this.seaSprite.width / 2 + 20, 10, this.seaSprite.width / 8, this.seaSprite.width / 8, multiplos * j, multiplos * i, 40, 40);
        }
      }
      //hay que ir de 0 a 40, usando multiplos*40;
    }
  }
}
