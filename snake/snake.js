console.log('snake is running');
const main_container = document.getElementById('snake');
const score = document.getElementById('score')
const highScore = document.getElementById('highscore')
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

const popup = document.querySelector('.popup');
const msg = document.querySelector('.msg');
const newGameBtn = document.getElementById('newGameBtn')

canvas.width = main_container.clientWidth;
canvas.height = main_container.clientHeight;


window.addEventListener('resize' , () => {
  console.log('window is resized');
  console.log(main_container, main_container.clientWidth, main_container.clientHeight);
  canvas.width = main_container.clientWidth;
  canvas.height = main_container.clientHeight;
})

let sc = 0
let hsc = 0;
let speed = 100; 
let dir = '';
let snakeTail = [[60, 10], [50, 10], [40, 10], [30, 10], [20, 10], [10, 10]]

globalThis.x = snakeTail[0][0];
globalThis.y = snakeTail[0][1];
const dx = 10;
const dy = 10;
globalThis.fx = 50;
globalThis.fy = 80;

const randomPos = () => {
  globalThis.fx = Math.floor(Math.random() * canvas.width/10) * 10;
  globalThis.fy = Math.floor(Math.random() * canvas.height/10) * 10;
}

const food = () => {
  ctx.fillStyle = "green";
  ctx.fillRect(fx, fy, 10, 10)
}

const updateScore = () =>{
  score.innerText = `score : ${sc}`
  highScore.innerText = `high score : ${hsc}` 
}

var collison;
var animate;
globalThis.isHit = false;

const checkCollison = () => {
  console.log('checking any collison');
  for(let i = 2; i < snakeTail.length; i++){
    if(snakeTail[i][0] === snakeTail[1][0] && snakeTail[i][1] === snakeTail[1][1]){
      clearTimeout(animate);
      isHit = true
      if(sc > hsc) hsc = sc;
      stop();
    }
  }
  collison = isHit === false ? setTimeout(checkCollison, speed) : clearTimeout(collison)
}

const snake = (x, y) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if(x < 0){
    globalThis.x = canvas.width - 6
  }
  if(x > canvas.width){
    globalThis.x = 0
  }
  if(y < 0) {
    console.log('hit border');
    globalThis.y = canvas.height
  }
  if(y > canvas.height){
    globalThis.y = 0
  }
  for(let i = 0; i < snakeTail.length; i++){
    ctx.fillStyle = i === 0 ? 'red' : 'black';
    ctx.fillRect(snakeTail[i][0], snakeTail[i][1], 10, 10)
  }
  food();
}

window.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowUp'){
    if(dir !== 'd'){
      clearTimeout(animate);
      moveUP()
    }
  }
  if(e.key === 'ArrowDown'){
    if(dir !== 'u'){
      clearTimeout(animate);
      moveDown()
    }
  }
  if(e.key === 'ArrowLeft'){
    if(dir !== 'r'){
      clearTimeout(animate)
      moveLeft()  
    }
  }
  if(e.key === 'ArrowRight'){
    if(dir !== 'l'){
      clearTimeout(animate)
      moveRight()
    }
  }
  if(e.key === 'Escape'){
    pause();
  }
})

const moveRight = () => {
  // console.log('rig');
  dir = 'r';
  x += dx;
  // snakeTail[0][0] += dx;
  snake(x,y);
  updateSnake(snakeTail)
  if(x === fx && y === fy){
    sc++;
    updateScore()
    snakeTail.push([fx, fy])
    randomPos()
  }
  animate = setTimeout(moveRight, speed);
}

const moveLeft = () => {
  // console.log('lee');
  dir = 'l';
  x -= dx;
  // snakeTail[0][0] -= dx;
  snake(x,y);
  updateSnake(snakeTail)
  if(x === fx && y === fy){
    sc++;
    updateScore()
    snakeTail.push([fx, fy])
    randomPos()
  }
  animate = setTimeout(moveLeft, speed);
}

const moveUP = () => {
  // console.log('upp');
  dir = 'u';
  y -= dy;
  // snakeTail[0][1] -= dy;
  snake(x,y);
  updateSnake(snakeTail)
  if(x === fx && y === fy){
    sc++;
    updateScore()
    snakeTail.push([fx, fy])
    randomPos()
  }
  animate = setTimeout(moveUP, speed);
}

const moveDown = () => {
  // console.log('dow');
  dir = 'd';
  y += dy;
  // snakeTail[0][1] += dy;
  snake(x,y);
  updateSnake(snakeTail)
  if(x === fx && y === fy){
    sc++;
    updateScore()
    snakeTail.push([fx, fy])
    randomPos()
  }
  animate = setTimeout(moveDown, speed);
}

const updateSnake = (snakeTail) => {
  snakeTail.unshift([x,y])
  snakeTail.pop()
}


const init = () => {
  console.log('initializing....');
  sc = 0
  speed = 100; 
  dir = '';
  snakeTail = [[60, 10], [50, 10], [40, 10], [30, 10], [20, 10], [10, 10]]
  globalThis.x = snakeTail[0][0];
  globalThis.y = snakeTail[0][1];
  globalThis.fx = 50;
  globalThis.fy = 80;
  globalThis.isHit = false
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for(let i = 0; i < snakeTail.length; i++){
    ctx.fillStyle = i === 0 ? 'red' : 'black';
    ctx.fillRect(snakeTail[i][0], snakeTail[i][1], 10, 10)
  }
  food();
  checkCollison();
  updateScore();
}

const stop = () => {
  console.log('stop');
  msg.innerText = 'game Over'
  clearTimeout(animate);
  clearTimeout(collison);
  popup.style.display = 'flex';
  updateScore();
}

const resume = document.createElement('button');
resume.innerText = 'resume';


const pause = () => {
  console.log('pause');
  msg.innerText = 'menu'
  clearTimeout(animate);
  clearTimeout(collison);
  popup.append(resume);
  popup.style.display = 'flex';
}

resume.addEventListener('click', (e) => {
  popup.style.display = 'none';
  collison = setTimeout(checkCollison, speed);
  resume.remove();
})


newGameBtn.addEventListener('click', (e) => {
  init();
  popup.style.display = 'none'
})