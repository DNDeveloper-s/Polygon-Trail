let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

window.addEventListener('mousemove', e => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

let d = {
    y: 0,
    width: 100,
    height: 120,
    tiltedHeight: 30,
    verticalHeight: 60
}

class Ball {
    constructor(x, y, w, h, tiltedH, verticalH) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.tiltedH = tiltedH;
        this.verticalH = verticalH;
        this.opacity = 0.2;
    }

    draw() {
        c.beginPath();
        c.moveTo(this.x + this.w/2, this.y);
        c.lineTo(this.x, this.y + this.tiltedH);
        c.lineTo(this.x, this.tiltedH + this.y + this.verticalH);
        c.lineTo(this.x + this.w/2, this.y + (this.tiltedH * 2) + this.verticalH);
        c.lineTo(this.x + this.w, this.y + this.tiltedH + this.verticalH);
        c.lineTo(this.x + this.w, this.y + this.tiltedH);
        c.lineTo(this.x + this.w/2, this.y);
        c.globalAlpha = this.opacity;
        // c.fillStyle = 'rgba(10,255,120,0.5)';
        c.stroke();
        c.fill();
    }

    update() {

        if(mouse.x - this.x < 200 && mouse.x - this.x > -100 && mouse.y - this.y < 200 && mouse.y - this.y > -100) {
            c.lineWidth = 2;
            c.strokeStyle = 'rgba(195, 66, 63, 1)';
            this.opacity  = 0.6;
            // // c.globalAlpha = 0.7;
            // if(this.opacity < 1) {
    
            //     this.opacity += 0.02;
            // }
            c.fillStyle = 'rgba(195, 66, 63, 1)';
        } else {
            c.lineWidth = 1;
            // c.strokeStyle = 'rgba(67, 87, 173,0.15)';
            // c.fillStyle = 'rgba(67, 87, 173,0)';
            if(this.opacity > 0.25) {
                this.opacity -= 0.009;
            }
        }

        this.draw();

    }
}

let balls;

function init() {
  balls = [];
  
    for (let j = -1; j < 100; j++) {

        d.y = 90 * j;

        for(let i = 0; i < 100; i++) {

            if( j % 2 == 0) {
                d.x = 100 * i;
            } else {
                d.x = (100 * i) - 50;
            }

            let poly = new Ball(d.x, d.y, d.width, d.height,d.tiltedHeight, d.verticalHeight);

            balls.push(poly);

            console.log(poly);
            
        
            if(d.x > window.innerWidth) {
                console.log(i);
                break;
            }
        }
        
        if(d.y > window.innerWidth) {
            console.log(j);
            break;
        }
        
    }
  
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height)

    
    balls.forEach(ball => {
        ball.update()
    })  
    
    
}

init();

animate();