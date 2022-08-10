const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
  constructor(x, y){
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    // cool performance trick: multiplication is more performative than division
    // so use * 0.5 instead of / 2. neato!
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    // added offset (this.width * 0.5) so that the image 
    // appears from the center of mouse click
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = 'boom.png';
    // which frame of sprite sheet is displayed
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.sound = new Audio();
    this.sound.src = 'boom.wav';
  }
  update(){
    if (this.frame === 0){
      this.sound.play();
    }
    this.timer++;
    if (this.timer % 10 === 0){
      this.frame++;
    }
  }
  draw(){
    // context about rotation
    // https://youtu.be/GFO_txvwK_c?t=9964
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    // this.spriteWidth * this.frame:
    //  changes the origin of the image based on what iteration
    //  of frame we are on
    ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width * 0.5, 0 - this.height * 0.5, this.width, this.height);
    ctx.restore();
  }
}

window.addEventListener('click', function(e){
  createAnimation(e);
});

//window.addEventListener('mousemove', function(e){
  //createAnimation(e);
//});

function createAnimation(e){
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  // lot to this, just go here:
  // https://youtu.be/GFO_txvwK_c?t=9316
  explosions.push(new Explosion(positionX, positionY));
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++){
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].frame > 5){
      explosions.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}
animate();