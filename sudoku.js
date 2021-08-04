

const tds = document.querySelectorAll('td');
let value = '';
let turn = false;

tds.forEach((td) => {
  td.addEventListener('click', (e) => {
    const node = document.getElementById(`${e.target.id}`);
    e.target.innerText = prompt();
    checkRow(node.parentNode);
    checkColl(node.id);
    checkSqr(node.id);
  })
})

const ifWin = () =>{
  console.log('checking...');
  let check1;
  let check2 = false;
  let check3 = false;
  for(let i = 1; i <= 73; i += 9){
    check1 = checkRow(document.getElementById(i).parentNode);
    // console.log(check1);
    if(check1 === false) break;
  }
  for(let i = 1; i <= 9; i++){
    check2 = checkColl(i);
    // console.log(check2);
    if(check2 === false) break;
  }
  for(let i = 1; i <= 7; i += 3){
    for(let j = i; j <= i + 54; j += 27){
      check3 = checkSqr(j);
      // console.log(check3);
      if(check3 === false) break;
    }
  }
  if(check1 && check2 && check3){
    console.log('you win the game');
  }else{
    console.log('check again');
  }
}

const ch = (children2, inn) => {
  // console.log(inn,'-----------');
  let n1 = 0;
  let n2 = 0;
  let n3 = 0;
  let n4 = 0;
  let n5 = 0;
  let n6 = 0;
  let n7 = 0;
  let n8 = 0;
  let n9 = 0;
  let a = 0;
  children2.forEach((td) => {
    const num = td.innerText;
    if(num === '1') {
      n1++;
      if(n1>1) {
        td.classList.add(`${inn}`);
      }else{
        a++;
        td.classList.remove(`${inn}`);
      }
    }
    if(num === '2') {
      n2++;
      if(n2>1) {
        td.classList.add(`${inn}`);
      }else{
        a++;
        td.classList.remove(`${inn}`);
      }
    }
    if(num === '3') {
      n3++;
      if(n3>1) {
        td.classList.add(`${inn}`);
      }else{
        a++;
        td.classList.remove(`${inn}`);
      }
    }
    if(num === '4') {
      n4++;
      if(n4>1) {
        td.classList.add(`${inn}`);
      }else{
        a++;
        td.classList.remove(`${inn}`);
      }
    }
    if(num === '5') {
      n5++;
      if(n5>1) {
        td.classList.add(`${inn}`);
      }else{
        a++;
        td.classList.remove(`${inn}`);
      }
    }
    if(num === '6') {
      n6++;
      if(n6>1) {
        td.classList.add(`${inn}`);
      }else{
        a++;
        td.classList.remove(`${inn}`);
      }
    }
    if(num === '7') {
      n7++;
      if(n7>1) {
        td.classList.add(`${inn}`);
      }else{
        a++;
        td.classList.remove(`${inn}`);
      }
    }
    if(num === '8') {
      n8++;
      if(n8>1) {
        td.classList.add(`${inn}`);
      }else{
        a++;
        td.classList.remove(`${inn}`);
      }
    }
    if(num === '9') {
      n9++;
      if(n9>1) {
        td.classList.add(`${inn}`);
      }else{
        a++;
        td.classList.remove(`${inn}`);
      }
    }
  })
  return a === 9 ? true : false;
}

const checkRow = (id) => {
  const row = id;
  // console.log('check row', row);
  const children = [...row.children];
  // console.log(ch(children, 'row'));
  return ch(children, 'row');
}

const checkColl = (id) => {
  const node = document.getElementById(`${id}`);
  // console.log('check coll', node);
  num = id % 9;
  num = num === 0 ? 9 : num;
  children2 = [];
  for(let i = num; i < 82; i += 9){
    const first = document.getElementById(`${i}`);
    children2.push(first);
  }
  return ch(children2, 'coll');
}



const checkSqr = (id) =>{
  const node = document.getElementById(`${id}`);
  // console.log('check sqr', node);
  num = id % 9;
  num = num === 0 ? 9 : num;

  if(num <= 3){
    if(id <= 27){
      return getSqr(1, id);
    } else if (id >= 55) {
      return getSqr(55, id);
    } else {
      return getSqr(28, id);
    }
  } else if (num >= 7) {
    if(id <= 27){
      return getSqr(7, id);
    } else if (id >= 55) {
      return getSqr(61, id);
    } else {
      return getSqr(34, id);
    }
  } else {
    if(id <= 27){
      return getSqr(4, id);
    } else if (id >= 55) {
      return getSqr(58, id);
    } else {
      return getSqr(31, id);
    } 
  }
}

const getSqr = (id, num) => {
  children2 = []
  for(let i = id; i <= id+2; i++){
    const first = document.getElementById(`${i}`);
    const second = document.getElementById(`${i + 9}`);
    const third = document.getElementById(`${i + 18}`);
    children2.push(first, second, third);
  }
  return ch(children2, 'sqr');
}

let request = new XMLHttpRequest();

const newGame = () => {
  request.open('GET', 'http://localhost:3000/new');
  request.responseType = Text;
  request.onload = async () => {
    globalThis.newSudoku = await JSON.parse(request.response)
    console.log('get data', newSudoku);
    resetGame();
  }
  request.send();
}

const resetGame = () => {
  // console.log(newSudoku);
  var new_Sudoku = copyArray(newSudoku)
  const dificulty = document.getElementById('dificulty').value;
  k = dificulty === 'easy' ? 20 : dificulty === 'meadium' ? 40 : 60;
  // console.log(k);
  setDificulty(new_Sudoku, k)
  // console.log(new_Sudoku);
  drawSudoku(new_Sudoku);
}

//seting dificulty, removing k digits randomly
const setDificulty = (sudoku, k) => {
  while(k){
    const randNum = Math.floor(Math.random() * 82)
    let r = parseInt(randNum/9);
    r = r === 9 ? r - 1 : r
    const c = parseInt(randNum%9);
    if(sudoku[r][c] !== 0){
      k--
      sudoku[r][c] = 0;
    }
  }
  // return sudoku
}


const drawSudoku = (sudoku) => {
  for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
      const row = document.getElementById(`row_${i+1}`);
      row.children[j].textContent = sudoku[i][j] === 0 ? '' : `${sudoku[i][j]}`
      // const num = sudoku[i][j]
      // console.log(num);
    }
  }
}

const copyArray = (arr) => {
  let newArr = [];
  for(let i = 0; i < arr.length; i++){
    let temp = []
    for(let j = 0; j < arr[i].length; j++){
      temp.push(arr[i][j])
    }
    newArr.push(temp)
  }
  return newArr
}