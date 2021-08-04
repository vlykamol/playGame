const fs = require('fs')

let emptySudoku = [[0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0]];

let numbers = [1,2,3,4,5,6,7,8,9]

let uniqueSudoku = [
  [2,3,7,8,4,1,5,6,9],
  [1,8,6,7,9,5,2,4,3],
  [5,9,4,3,2,6,7,1,8],
  [3,1,5,6,7,4,8,9,2],
  [4,6,9,5,8,2,1,3,7],
  [7,2,8,1,3,9,4,5,6],
  [6,4,2,9,1,8,3,7,5],
  [8,5,3,4,6,7,9,2,1],
  [9,7,1,2,5,3,6,8,4]
];

const checkRow = (sudoku,i, num) => {
  for(let j = 0; j < 9; j++){
    if(sudoku[i][j] === num) {
      return false;
    }
  }
  return true;
}

const checkColl = (sudoku,j, num) => {
  for(let i = 0; i < 9; i++){
    if(sudoku[i][j] === num) {
      return false;
    }
  }
  return true;
}

const checkSqr = (sudoku, i, j, num) => {
  i = i - i % 3;
  j = j - j % 3;
  for (let i1 = 0; i1<3; i1++){
    for (let j1 = 0; j1<3; j1++){
      if (sudoku[i+i1][j+j1] === num){
        return false;
      }
    }
  }
  return true;
}

const isSafe = (sudoku, i, j, num) => {
  return checkColl(sudoku, j, num) && checkRow(sudoku, i, num) && checkSqr(sudoku, i, j, num)
}

const isRowValid = (i, sudoku) => {
  const row = [...sudoku[i]];
  row.sort();
  for(let k = 0; k < 9; k++){
    if(row[k] === row[k+1]){
      console.log(`${i+1}th row is not valid`);
      return false;
    }
  }
  return true
}

const iscollValid = (j, sudoku) => {
  const coll = [];
  for(let i = 0; i < 9; i++){
    coll.push(sudoku[i][j])
  }
  coll.sort();
  for(let k = 0; k < 9; k++){
    if(coll[k] === coll[k+1]){
      console.log(`${j+1}th coll is not valid`);
      return false;
    }
  }
  return true
}

const isSqrValid = (i,sudoku) => {
  const sqrMap = [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6], [6, 0], [6, 3], [6, 6]];
  const sqr = []
  for(let k = sqrMap[i][0]; k < sqrMap[i][0] + 3; k++){
    for(let m = sqrMap[i][1]; m < sqrMap[i][1] + 3; m++){
      sqr.push(sudoku[k][m]);
    }
  }
  sqr.sort();
  for(let k = 0; k < 9; k++){
    if(sqr[k] === sqr[k+1]){
      console.log(`${i+1}th sqr is not valid`);
      return false;
    }
  }
  return true
}

const isValid = (sudoku) => {
  for(let i = 0; i < 9; i++){
    if(!isRowValid(i,sudoku)) {
      console.log(i+1,'row is not valid');
      return false
    }if(!iscollValid(i,sudoku)){
      console.log(i+1,'coll is not valid');
      return false
    }if(!isSqrValid(i,sudoku)){
      console.log(i+1, 'sqr is not valid');
      return false
    }
  }
  return true
}

const isFull = (sudoku) => {
  for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
      if(sudoku[i][j] === 0){
        return false
      }
    }
  }
  return  true
}

//suffle array
const suffle = (arr) => {
  for(let i = 0; i < arr.length; i++){
    const j = Math.floor(Math.random() * (i));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
}


// check if unique solution
// let solutions = 0;
// const isUnique = (sudoku) => {
//   if(isFull(sudoku)) {
//     console.log('sudoku is full at first call');
//     return sudoku;
//   }
//   for(let i = 0; i < 9; i++){
//     for(let j = 0; j < 9; j++){
//       let opt = [...numbers]
//       if(sudoku[i][j] === 0){
//         while(opt.length !== 0 && sudoku[i][j] === 0){
//           const num = opt[Math.floor(Math.random() * opt.length)]
//           if(isSafe(sudoku, i, j, num)){
//             console.log(num, ' is safe to put at', i, j);
//             sudoku[i][j] = num
//             opt = opt.filter(e => e !== num )
//             newSudoku(sudoku)
//           }else{
//             return sudoku 
//           }
//         }
//       }
//     }
//   }
// }

const saveSudoku = (sudoku) => {
  if(!isValid(sudoku)){
    console.log('sudoku is not valid');
    return false
  }
  const jasonString = JSON.stringify(sudoku);
  fs.writeFile(`./${n}.json`,jasonString, err => {
    if(err) console.log('error writing file', err);
    else console.log('successfully wrote');
  });
}


const solveGrid = (sudoku) => {
  if(isFull(sudoku)){
    console.log('solved Grid', sudoku);
    saveSudoku(sudoku)
    return true
  }
  for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
      if(sudoku[i][j] === 0){
        suffle(numbers)
        for(let k = 0; k < 9; k++){
          if(isSafe(sudoku, i, j, numbers[k])){
            sudoku[i][j] = numbers[k]
            if(solveGrid(sudoku)){
              return true
            }
            else{
              sudoku[i][j] = 0
            }
          }
        }
        return false
      }
    }
  }
}

var d = new Date();
var n = d.getTime();

console.log('new sudoku',solveGrid(emptySudoku));

