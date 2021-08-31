console.log('flappy');

const main_container = document.getElementById('flappyBird');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
const score = document.getElementById('score')
const highScore = document.getElementById('highscore')


const popup = document.querySelector('.popup');
const msg = document.querySelector('.msg');
const newGameBtn = document.getElementById('newGameBtn')


canvas.width = main_container.clientWidth;
canvas.height = main_container.clientHeight;

const x = canvas.width / 2 - 50;
let y = canvas.height / 2;
let px = canvas.width;
let py = 250;
let gape = 100;
const dx = 15;
const dy = 10;

let sc = 0
let hsc = 0;

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
  ctx.fillText(`${y}`, x, y)
}

const pipes = (x, y, gap) => {
  ctx.fillStyle = 'red';
  ctx.fillRect(x, 0, 30, y)

  ctx.fillStyle = 'black';
  ctx.fillText(`${y}`, x, y)

  ctx.fillStyle = 'red';
  ctx.fillRect(x, y + gap, 30, canvas.height - 80 - gap)

  ctx.fillStyle = 'black';
  ctx.fillText(`${y+gap}`, x, y+gap)
}


var flying;
const flappyFlying = () => {
  if(checkCollison()){
    stop();
    return 0;
  };
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if(y > canvas.height || y < 0){
    console.log('hit ceilling or roof');
    clearTimeout(flying);
    stop();
    return 0;
  }
  if(px < 0){
    px = canvas.width;
    py = Math.floor(Math.random() * (400 - 150) + 150)
  }
  y += dy;
  px -= dx;
  flappy(x, y);
  pipes(px, py, gape);
  flying = setTimeout(flappyFlying, 100);
}


const checkCollison = () => {
  if(x < px + 10 && x > px - 10){
    if(y < py || y > py + gape){
      console.log('boom');
      if(sc > hsc) hsc = sc;
      return true;
    }else{
      sc++;
      updateScore();
    }
  }
}

window.addEventListener('keydown', (e) => {
  if(e.key === ' '){
    y -= 20;
  }
  if(e.key === 'Escape'){
    // if(!isPause){
    //   clearTimeout(flying)
    //   isPause = !isPause;
    // }else{
    //   flappyFlying();
    //   isPause = !isPause;
    // }
    pause();
  }
})


const updateScore = () =>{
  score.innerText = `score : ${sc}`
  highScore.innerText = `high score : ${hsc}` 
}

const stop = () => {
  console.log('stop');
  msg.innerText = 'game Over';
  clearTimeout(flying);
  popup.style.display = 'flex';
}

const resume = document.createElement('button');
resume.innerText = 'resume';

const pause = () => {
  console.log('pause');
  msg.innerText = 'menu'
  clearTimeout(flying);
  popup.append(resume);
  popup.style.display = 'flex';
}

resume.addEventListener('click', (e) => {
  popup.style.display = 'none';
  flying = setTimeout(flappyFlying, 100);
  resume.remove();
})

const init = () => {
  console.log('initializing....');
  y = canvas.height / 2;
  px = canvas.width;
  py = 250;
  gape = 100;
  sc = 0;
  isPause = false;
  flappyFlying();
  updateScore();
}

newGameBtn.addEventListener('click', (e) => {
  init();
  popup.style.display = 'none';
})