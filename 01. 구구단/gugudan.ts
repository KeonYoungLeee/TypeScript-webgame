let numberOne = Math.ceil(Math.random() * 9 );
let numberTwo = Math.ceil(Math.random() * 9 );
let result = numberOne * numberTwo;

const word = document.createElement('div');
word.textContent = `${numberOne} X ${numberTwo}`;
document.body.append(word);

const form = document.createElement('form');
document.body.append(form);

