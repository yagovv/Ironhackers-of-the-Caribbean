function Player(game) {
    this.width = 50;
    this.height = 50;
    this.x = 0;
    this.y = game.canvas.height - this.height;
    this.canvas = game.canvas;
    this.ctx = game.ctx;
    this.speedX = 10;
    this.speedY = 10;
}
Player.prototype.handleKeys = function () {
    var RIGHT_KEY = 39;
    var LEFT_KEY = 37;
    var UP_KEY = 40;
    var DOWN_KEY = 38;
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case RIGHT_KEY:
                this.moveRight();
                break;
            case LEFT_KEY:
                this.moveLeft();
                break;
            case UP_KEY:
                this.moveUp();
                break;
            case DOWN_KEY:
                this.moveDown();
                break;
        }
    }.bind(this);
}
Player.prototype.draw = function () {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
};
Player.prototype.moveRight = function () {
    this.x += this.speedX;
};
Player.prototype.moveLeft = function () {
    this.x -= this.speedX;
};
Player.prototype.moveUp = function () {
    this.y += this.speedY;
};
Player.prototype.moveDown = function () {
    this.y -= this.speedY;
};
Player.prototype.accelerateX = function () {
    this.speedX++;
};
Player.prototype.brakeX = function () {
    this.speedX--;
};
Player.prototype.accelerateY = function () {
    this.speedY++;
};
Player.prototype.brakeY = function () {
    this.speedY--;
};