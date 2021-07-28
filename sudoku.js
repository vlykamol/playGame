
const tds = document.querySelectorAll('td');
let value = '';
let turn = false;

tds.forEach((td) => {
  td.addEventListener('click', (e) => {
    e.target.innerText = prompt();
    checkRow(e)
    checkColl(e)
    checkSqr(e);
  })
})

const ch = (children2, inn, id) =>{
  const node = document.getElementById(`${id}`);
  const num = parseInt(node.textContent);
  console.log(node);
  children2.sort();
  for(let i = 0; i < children2.length; i++){
    if(children2[i] === children2[i+1]){
      console.log('wrong in ', inn, children2[i]);
      if(children2[i] == num){
        node.classList.add('wrong')
      }
    }
  }
}

const checkRow = (id) => {
  const row = id.target.parentNode;
  const children = [...row.children];
  var children2 = [];
  children.forEach((num) => {
    children2.push(parseInt(num.innerText))
  });
  ch(children2, 'row', id.target.id);
}

const checkColl = (id) => {
  id = id.target.id;
  num = id % 9;
  num = num === 0 ? 9 : num;
  children2 = [];
  for(let i = num; i < 82; i += 9){
    const first = document.getElementById(`${i}`).textContent;
    children2.push(parseInt(first));
  }
  ch(children2, 'coll', id);
}


const checkSqr = (id) =>{
  id = id.target.id;
  num = id % 9;
  num = num === 0 ? 9 : num;

  if(num <= 3){
    if(id <= 27){
      // console.log('1st sqr');
      getSqr(1, id);
    } else if (id >= 55) {
      // console.log('7th sqr');
      getSqr(55, id);
    } else {
      // console.log('4th sqr');
      getSqr(28, id);
    }
  } else if (num >= 7) {
    if(id <= 27){
      // console.log('3rd sqr');
      getSqr(7, id);
    } else if (id >= 55) {
      // console.log('9th sqr');
      getSqr(61, id);
    } else {
      // console.log('6th sqr');
      getSqr(34, id);
    }
  } else {
    if(id <= 27){
      // console.log('2nd sqr');
      getSqr(4, id);
    } else if (id >= 55) {
      // console.log('8th sqr');
      getSqr(58, id);
    } else {
      // console.log('5th sqr');
      getSqr(31, id);
    } 
  }
}

const getSqr = (id, num) => {
  children2 = []
  for(let i = id; i <= id+2; i++){

    const first = document.getElementById(`${i}`).textContent;
    const second = document.getElementById(`${i + 9}`).textContent;
    const third = document.getElementById(`${i + 18}`).textContent;
    children2.push(parseInt(first), parseInt(second), parseInt(third));

  }
  ch(children2, 'sqr', num);
}