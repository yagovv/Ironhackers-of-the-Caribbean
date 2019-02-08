class Player {
    constructor(game, x, y) {
        this.x = x;
        this.y = y;
        this.canvas = this.game.canvas;
        this.ctx = this.game.ctx;
        this.health = 100;
    }
    attack() {
        if (this.game.playersInRange) {
            //
        }
    }
    draw() {
        //cuadradito
        this.ctx.drawRect(this.x, this.y, 20, 20);
    }
    moveRight() {
        this.x += this.speedX;
    }
    moveLeft() {
        this.x -= this.speedX;
    }
    moveUp() {
        this.y += this.speedY;
    }
    moveDown() {
        this.y -= this.speedY;
    }
    accelerateX() {
        this.speedX++;
    }
    brakeX() {
        this.speedX--;
    }
    accelerateY() {
        this.speedY++;
    }
    brakeY() {
        this.speedY--;
    }
}
