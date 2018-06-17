var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var image = new Image();
image.src = 'images/monsters.png';


class Health {
    constructor(canvas, aX, hp) {
        this.hp = hp;
        this.x = aX;
        this.canvas = canvas;
    }

    getHp() {
        return this.hp;
    }

    setHp(p) {
        this.hp = (p < 0) ? 0 : p;
        let canva = this.canvas;
        canva.clearRect(this.x + 19, 19, 201, 11);
        canva.beginPath();
        canva.strokeStyle = "blue";
        canva.strokeRect(this.x + 19, 19, 201, 11);
        canva.stroke();
        canva.fillStyle = "red";
        canva.fillRect(this.x + 20, 20, this.hp * 2, 10);
        canva.fill();
    }

    dead() {
        return !(this.hp > 0);
    }

}

class CreateBody {
    constructor(canvas, aX) {
        this.x = aX || 50;
        this.lifeM = new Health(canvas, 0, 100);
        this.lifeU = new Health(canvas, 750, 100);
        this.canvas = canvas;
    }

    drawBody() {
        let width = 152;
        let height = 160;
        let currentFrame = getRandomInt(0, 4);

        this.canvas.drawImage(image, 240 * currentFrame, 0, width, height, this.x, 50, width, height);

        width = 72;
        height = 120;
        currentFrame = getRandomInt(0, 4);
        this.canvas.drawImage(image, 240 * currentFrame + 40, 160, width, height, this.x + 40, 210, width, height);

        width = 130;
        height = 150;
        currentFrame = getRandomInt(0, 4);
        this.canvas.drawImage(image, 240 * currentFrame + 20, 315, width, height, this.x + 20, 320, width, height);

        width = 39;
        height = 150;
        currentFrame = getRandomInt(0, 4);
        this.canvas.drawImage(image, 240 * currentFrame, 160, width, height, this.x + 4, 200, width, height);
        this.canvas.drawImage(image, 240 * currentFrame + 112, 160, width, height, this.x + 108, 200, width, height);
    }

    newBody(f) {
        this.canvas.clearRect(xxx - 10, 31, 250, 550);
        f();
    }

    setX(x) {
        this.x = (x > 100) ? 0 : x;
        this.newBody(this.drawBody());
    }

    getX() {
        return this.x;
    }
}

let body = new CreateBody(ctx, 40);


function createMonster() {
    body.drawBody();
    body.lifeM.setHp(100);
    body.lifeU.setHp(100);
};