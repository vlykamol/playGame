console.log('snake is running');
const main_container = document.getElementById('snake');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = main_container.clientWidth;
canvas.height = main_container.clientHeight;

globalThis.x = 10;
globalThis.y = 10;

window.addEventListener('resize' , () => {
  console.log('window is resized');
  console.log(main_container, main_container.clientWidth, main_container.clientHeight);
  canvas.width = main_container.clientWidth;
  canvas.height = main_container.clientHeight;
})

const snake = (x, y) => {
    ctx.fillStyle = 'red';
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
    ctx.fillRect(x, y,10,10)
}

window.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowUp'){
    y -= 10;
  }
  if(e.key === 'ArrowDown'){
    y += 10;
  }
  if(e.key === 'ArrowLeft'){
    x -= 10;
  }
  if(e.key === 'ArrowRight'){
    x += 10;
  }
  snake(x, y)
})