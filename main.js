
const table = document.querySelector('table');
const tds = document.querySelectorAll('td');
const popup = document.querySelector('.popup');
const msg = document.querySelector('.msg');
const newGame = document.querySelector('.new-game');

const playero = document.querySelector('.playero');
const playerx = document.querySelector('.playerx');

console.log(playero,playerx);


let turn = false;
let count = 0;
let playerO = 0;
let playerX = 0;

newGame.addEventListener('click', (e) => {
  popup.style.display = 'none';
  tds.forEach(td => {
    td.textContent = '';
  })
  playero.innerText = `playerO : ${playerO}`;
  playerx.innerText = `playerX : ${playerX}`;
  turn = false;
  count = 0;
})

const getIndex = (num) => {
  const node = document.getElementById(`${num}`);
  value = node.textContent;
  if(value === ''){
    node.textContent = turn === false ? 'X' : 'O';
    turn =!turn;
    count++;
    rowCrossed(num);
    collCrossed(num);
    diaCrossed(num)
  } else{
    window.alert('wrong position!');
  }
  if(count === 9){
    // console.log('no one wins')
    if(popup.style.display !== 'flex') {
      msg.innerText = 'no one wins'
      popup.style.display = 'flex';
    }
    return
  }
}

const rowCrossed = (num) => {
  const row = document.getElementById(`${num}`).parentNode;
  const first = row.childNodes[1].textContent;
  const second = row.childNodes[3].textContent;
  const third = row.childNodes[5].textContent;
  if(first === second && second === third) {
    msg.innerText =   `${first} player wins game by row strike`;
    // console.log(first, 'player wins game by row strike');
    first === 'X' ? playerX++ : playerO++;
    popup.style.display = 'flex';
  }
}

const collCrossed = (num) => {
  num = num % 3;
  num = num === 0 ? 3 : num;
  const first = document.getElementById(`${num}`).textContent;
  const second = document.getElementById(`${num + 3}`).textContent;
  const third = document.getElementById(`${num + 6}`).textContent;
  if(first === second && second === third) {
    msg.innerText = `${first} player wins game by collumn strike`;
    // console.log(first, 'player wins game by collumn strike');
    first === 'X' ? playerX++ : playerO++;
    popup.style.display = 'flex';
  }
}

const diaCrossed = (num) => {
  if(num%2 !== 0){
    const first = document.getElementById(`1`).textContent;
    const second = document.getElementById(`9`).textContent;
    const third = document.getElementById(`5`).textContent;
    const fourth = document.getElementById(`7`).textContent;
    const fifth = document.getElementById(`3`).textContent;
    if(first === second && second === third && first !== '') {
      msg.innerText = `${first} player wins game by diagonal strike`;
      // console.log(first, 'player wins game by diagonal strike');
      first === 'X' ? playerX++ : playerO++;
      popup.style.display = 'flex';
    }
    if(third === fourth && fourth === fifth && third !== '') {
      msg.innerText = `${third} player wins game by diagonal strike`;
      // console.log(third, 'player wins game by diagonal strike');
      third === 'X' ? playerX++ : playerO++;
      popup.style.display = 'flex';
    }
  }
  
}