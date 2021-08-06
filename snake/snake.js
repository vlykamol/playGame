console.log('snake is running');
const main_container = document.getElementById('snake');
const score = document.getElementById('score')
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = main_container.clientWidth;
canvas.height = main_container.clientHeight;

let sc = 0
let speed = 100; 
let dir = '';
let snakeTail = [[30, 10], [20, 10], [10, 10]]

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
}


window.addEventListener('resize' , () => {
  console.log('window is resized');
  console.log(main_container, main_container.clientWidth, main_container.clientHeight);
  canvas.width = main_container.clientWidth;
  canvas.height = main_container.clientHeight;
})

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
    ctx.fillStyle = i===0? 'red' : 'black';
    ctx.fillRect(snakeTail[i][0], snakeTail[i][1], 10, 10)
  }
  food();
}

var animate;


const checkCollison = () => {
  for(let i = 2; i < snakeTail.length; i++){
    if(snakeTail[i][0] === snakeTail[1][0] && snakeTail[i][1] === snakeTail[1][1]){
      console.log('hit', snakeTail[i]);
      return true
    }
  }
  return false
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
    clearTimeout(animate)
  }
})

const moveRight = () => {
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
  if(checkCollison()) {
    clearTimeout(animate)
  }
  else{
    animate = setTimeout(moveRight, speed);
  }
}
const moveLeft = () => {
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
  if(checkCollison()) {
    clearTimeout(animate)
  }
  else{
    animate = setTimeout(moveLeft, speed);
  }
}
const moveUP = () => {
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
  if(checkCollison()) {
    clearTimeout(animate)
  }
  else{
    animate = setTimeout(moveUP, speed);
  }
}
const moveDown = () => {
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
  if(checkCollison()) {
    clearTimeout(animate)
  }
  else{
    animate = setTimeout(moveDown, speed);
  }
}


const updateSnake = (snakeTail) => {
  snakeTail.unshift([x,y])
  snakeTail.pop()
}