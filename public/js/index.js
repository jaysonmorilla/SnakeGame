import Snake from './snake.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const score = document.querySelector('.score-points');
var GAME_SPEED = 500;
var status = 'start';
var RandX = Math.floor(Math.random() * 60);
var RandY = Math.floor(Math.random() * 30);

class Main extends Snake {
    constructor() {
        super(),
        this.position = {
            x: 0,
            y: 0
        },
        this.dimension = {
            width: canvas.width,
            height: canvas.height
        },
        this.foodLoc = {
            x: 5 * RandX,
            y: 5 * RandY
        }
        this.size = 1,
        this.init = 0,
        this.score = 0,
        this.level = 1,
        this.move = 'd',
        this.isNotMatch = true,
        this.defaultMove = 'd'
    }

    clearCanvas() {
        c.clearRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
    }

    controller() {
        switch(this.move) {
            case 'a': 
                if(this.defaultMove == 'd') {
                    this.alignment.x += this.speed; 
                } else {
                    this.defaultMove = this.move;
                    this.alignment.x -= this.speed;
                }  break;
            case 'w':
                if(this.defaultMove == 's') { 
                    this.alignment.y += this.speed;
                } else {
                    this.defaultMove = this.move;
                    this.alignment.y -= this.speed;
                } break;
            case 'd': 
                if(this.defaultMove == 'a') {
                    this.alignment.x -= this.speed;
                } else {
                    this.defaultMove = this.move;
                    this.alignment.x += this.speed;
                } break;
            case 's': 
                if(this.defaultMove == 'w') {
                    this.alignment.y -= this.speed;
                } else {
                    this.defaultMove = this.move;
                    this.alignment.y += this.speed;
                } break;
            default: return;
        }
    }

    setMove(_args) {
        this.move = _args;
    }

    setFood() {
        c.fillStyle = 'green';
        c.fillRect(this.foodLoc.x, this.foodLoc.y, this.width, this.height);
    }

    setLocation() {
        RandX = Math.floor(Math.random() * 60) * 5;
        RandY = Math.floor(Math.random() * 30) * 5;
        for(var temp = 0; temp < this.snakeArr.length; temp++) {
            if(RandX == this.snakeArr[temp].x && RandY == this.snakeArr[temp].y) {
                RandX = Math.floor(Math.random() * 60) * 5;
                RandY = Math.floor(Math.random() * 30) * 5;
            }
        }
        this.foodLoc.x = RandX;
        this.foodLoc.y = RandY;
    }

    isFoodCollide() {
        if(this.alignment.x == this.foodLoc.x &&
            this.alignment.y == this.foodLoc.y){
                this.size += 2;
                this.score += 1;
                score.textContent = this.score;
                this.setLocation();
        }
    }

    drawGrids() {
        c.fillStyle = 'black';
        c.shadowBlur = 0;
        for(var x = 0; x < canvas.width; x = x + 5) {
            for(var y = 0; y < canvas.height; y = y + 5){
                c.fillRect(x, y, 4, 4);
            }
        }
    }

    difficulties() {
        if(GAME_SPEED == 160) { // MAX SPEED
            return
        }

        if(this.score / 5 == this.level) {
            GAME_SPEED = GAME_SPEED - 20;
            this.level += 1;
        }
    }

    updateSnake() {
        if(this.countArrayOfObj(this.snakeArr) > this.size){
            this.snakeArr.shift();
        }
    }

    snakeRecord() {
        this.snakeArr.push({x: this.alignment.x, y: this.alignment.y});
    }

    update() {
        this.clearCanvas();
        this.snakeRecord();
        this.drawGrids();
        this.setFood();
        this.isBitten();
        this.controller();
        this.outOfBound();
        this.draw();
        this.updateSnake();
        this.isFoodCollide();
        this.difficulties();
    }

    outOfBound() {
        if(this.alignment.x > canvas.width-5) {
            this.alignment.x = 0;
        }
        else if(Math.sign(this.alignment.x) === -1){
            this.alignment.x = canvas.width-5;
        }

        if(this.alignment.y > canvas.height-5) {
            this.alignment.y = 0;
        }else if(Math.sign(this.alignment.y) === -1){
            this.alignment.y = canvas.height-5;
        }
    }

    increaseSize() {
        this.size += 1;
    }

    countArrayOfObj(_obj) {
        var result = 0;
        for(var temp of _obj) {
            result++;
        }
        return result;
    }

    isBitten() {
        for(var temp = 0; temp < this.snakeArr.length - 1; temp++) {
            if(this.alignment.x == this.snakeArr[temp].x && this.alignment.y == this.snakeArr[temp].y) {
                this.color = 'RED';
                status = 'GAME OVER';
            }
        }
    }
}

const game = new Main();

document.addEventListener('keypress', ({ key }) => {
    if(key == 'w' || key == 'a' || key == 'd' || key == 's') {
        game.setMove(key);
    }
    if(key == 'Enter') {
        status = status == 'pause'? "start" : "pause";
    }

    if(key == '=') {
        game.increaseSize();
    }
})

var lastRenderTime = 0;

function animate(currentTime) {
    requestAnimationFrame(animate);
    if(status == 'start') {
        const secondsSinceLastRender = (currentTime - lastRenderTime) / GAME_SPEED;
        if(secondsSinceLastRender < 1 / game.speed) return;
        lastRenderTime = currentTime;
        game.update();
    }
}

animate();