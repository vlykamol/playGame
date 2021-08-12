console.log('flappy');

const main_container = document.getElementById('flappyBird');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = main_container.clientWidth;
canvas.height = main_container.clientHeight;

const x = canvas.width / 2 - 50;
let y = canvas.height / 2;
let px = canvas.width;
let py = 250;
let gape = 50;
const dx = 15;
const dy = 10;
let isPause = false;

window.addEventListener('resize' , () => {
  console.log('window is resized');
  console.log(main_container, main_container.clientWidth, main_container.clientHeight);
  canvas.width = main_container.clientWidth;
  canvas.height = main_container.clientHeight;
})

const flappy = (x, y) => {
  ctx.fillStyle = 'green';
  ctx.fillRect(x, y, 30, 30)
}

const pipes = (x, y, gap) => {
  ctx.fillStyle = 'red';

  ctx.fillRect(x, 0, 30, y)
  ctx.fillRect(x, y + gap, 30, canvas.height - 80 - gap)
}


var flying;
const flappyFlying = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if(y > canvas.height || y < 0){
    console.log('hit ceilling or roof');
    clearTimeout(flying);
    return 0;
  }
  if(px < 0){
    px = canvas.width;
    py = Math.floor(Math.random() * (400 - 150) + 150)
    console.log('py', py);
  }
  y += dy;
  px -= dx;
  flappy(x, y);
  pipes(px, py, gape);
  flying = setTimeout(flappyFlying, 100);
}

window.addEventListener('keydown', (e) => {
  if(e.key === 'p'){
    flappyFlying();
  }
  if(e.key === ' '){
    y -= 20;
  }
  if(e.key === 'Escape'){
    if(!isPause){
      clearTimeout(flying)
      isPause = !isPause;
    }else{
      flappyFlying();
      isPause = !isPause;
    }
  }
})