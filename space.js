const canvas = document.getElementById("space-canvas");
const ctx = canvas.getContext("2d");
const WHITE = "#FFFFFF"

const starWidth = 2;
const starHeight = 1;

const posCenterX = canvas.width/2;
const posCenterY = canvas.height/2;
const maxSpeed = 20;

class Star {
    constructor(width,height,maxSpeed) {
        this.width = width;
        this.height = height;
        this.maxSpeed = maxSpeed;
        
        this.x = Math.random() * this.width  - this.width/2 ;
        this.y = Math.random() * this.height - this.height/2;
        this.slope = this.y / this.x;
        this.speed = Math.max(Math.random() * this.maxSpeed, 1);
    }

    move(centerX, centerY) {
        if (this.x < -centerX || this.x > centerX || 
            this.y < -centerY || this.y > centerY) {
            
            this.x = Math.random() * this.width  - this.width/2 ;
            this.y = Math.random() * this.height - this.height/2;
            this.slope = this.y / this.x;
            this.speed = Math.max(Math.random() * this.maxSpeed, 1);
        }
            
        if (this.x == 0) {
             this.y += (this.y > 0) ? this.speed : -this.speed;
        
        } else if (this.y == 0) {    
            this.x += (this.x > 0) ? this.speed : -this.speed;
            
        } else {
            
            this.x += (this.x > 0) ? this.speed : -this.speed;
            this.y = this.slope * this.x;
        }
    }
}

let stars =  new Array(100);
/*init*/
for (let i = 0; i < stars.length; i++) {
    stars[i] = new Star(canvas.width, canvas.height, maxSpeed);    
}


const drawStar = n => {
    
    for (let i = 0; i < n; i++) {
        let x = stars[i].x + canvas.width/2;
        let y = stars[i].y + canvas.height/2;
        
        ctx.beginPath();
        
        ctx.rect(x,y,starWidth,starHeight);
        
        stars[i].move(canvas.width/2, canvas.height/2);

        ctx.fillStyle = WHITE;
        ctx.fill();
        ctx.closePath();
    }
    
};



function setup() {
    
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.beginPath();
    // ctx.rect(position.x,position.y, 1, 1);
    // ctx.fillStyle = WHITE;
    // ctx.fill();
    // ctx.closePath();
    drawStar(stars.length);   
}

draw();
setInterval(draw,10);