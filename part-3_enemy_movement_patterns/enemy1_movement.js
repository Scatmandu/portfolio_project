const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 100;
enemiesArray = [];
let gameFrame = 0;

/**enemy1 = {
  x: 0,
  y: 0,
  width: 200,
  height: 200,
}
*/

class Enemy {
  constructor(){
    this.image = new Image();
    this.image.src = 'enemy1.png';
    // this.speed = Math.random() * 4 - 2;
    // width of image in pixels divided by the number 
    // of frames in the animation ie. 1758 / 6 = 293
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    // if the image's aspect ratio seems off we can play with
    // different values of denominator here
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    // if we don't wrap this in Math.floor then line 40 will never be true.
    // this is for differing animation speeds per instantiation
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }
  update(){
    // makes enemies wiggle in place
    // can modulate the distance they move by increasing or decreasing the range
    this.x += Math.random() * 8 - 4;
    this.y += Math.random() * 6 - 3;
    if (gameFrame % this.flapSpeed === 0){
    this.frame > 4 ? this.frame = 0 : this.frame++;
    }
  }
  draw(){
    // very cool. draws a 1px border rectangle. nice abstract look.
    //ctx.strokeRect(this.x, this.y, this.width, this.height);
    // drawImage documentation:
      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    // arg 1: determines frame start position ie. if frame is zero it starts at x = 0, if 1 x = 293.
      // this.frame * this.spriteWidth
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
};
// const enemy1 = new Enemy();
for (let i = 0; i < numberOfEnemies; i++){
  enemiesArray.push(new Enemy());
}
function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach(enemy => {
    enemy.draw();
    enemy.update();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
