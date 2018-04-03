function Player(game, x, y) {
    this.x = x;
    this.y = y;
    this.canvas = this.game.canvas;
    this.ctx = this.game.ctx;
    this.health = 100;
}
Player.prototype.attack = function () {
    if(this.game.playersInRange){
        //
    }
}
Player.prototype.draw = function () {
    //cuadradito
    this.ctx.drawRect(this.x, this.y, 20, 20);
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