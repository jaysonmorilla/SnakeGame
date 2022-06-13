const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

class Snake {
    constructor() {
        this.alignment = {
            x: 10,
            y: 100
        }
        this.snakeArr = [],
        this.speed = 5,
        this.color = "magenta"
        this.width = 5, // The width of snake on canvas
        this.height = 5 // The height of snake on canvas
    }

    setSpeed(_arg) {
        this.speed += _arg;
    }

    setSize(_arg) {
        this.size += _arg;
    }

    draw() {
        c.strokeStyle = this.color;
        c.lineWidth = 0.5;
        for(var x = 0; x < this.snakeArr.length; x++){
            c.strokeRect(this.snakeArr[x].x, this.snakeArr[x].y, this.width, this.height);
        }
    }
}

export default Snake;