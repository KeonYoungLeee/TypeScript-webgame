var numberOne = Math.ceil(Math.random() * 9);
var numberTwo = Math.ceil(Math.random() * 9);
var result = numberOne * numberTwo;
var word = document.createElement('div');
word.textContent = numberOne + " X " + numberTwo;
document.body.append(word);
var form = document.createElement('form');
document.body.append(form);
