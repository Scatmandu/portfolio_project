let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
  playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png'
//source image 6876 px wide w/ 12 columns = width on one sprite 6876 / 12 = 575
const spriteWidth = 575;
//source image 5230 px tall w/ 10 rows = height one sprite 5230 / 10 = 523
const spriteHeight = 523;
let gameFrame = 0;
//controls speed of animation by placing x amount of frames between each frame
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 4,
  }
];
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  }
    for (let j = 0; j < state.frames; j++){
      let positionX = j * spriteWidth;
      let positionY = index * spriteHeight;
      frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
    console.log(frames);
  });

function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //drawImage prototype with 9 arguments
    //ctx.drawImage(image, source_x, sy, sw, sh, destination_x, dy, dw, dh)
  // position - allows us to implement our staggerFrames variable
  // gameFrame - tracks current frame of animation. Ongoing while script is running.
  // staggerFrames - number of frames to slow down animation by
  // spriteAnimations[playerState].loc.length - max number of frames per sprite
  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
  console.log(spriteAnimations[playerState].loc.length)
  let frameX = spriteWidth * position;
  // playerState - array that holds all of animationStates information
  let frameY = spriteAnimations[playerState].loc[position].y;
  frameX = spriteWidth * position;
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
  gameFrame++;
  requestAnimationFrame(animate);
};
animate();