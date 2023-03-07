const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]'); 
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onStartBtnClick (event) {
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
timerId = setInterval(bodyColorSwitch, 1000)
};

function bodyColorSwitch (){
    body.style.backgroundColor = getRandomHexColor();
};

function onStopBtnClick (event) {
clearInterval(timerId);
startBtn.removeAttribute('disabled');
stopBtn.setAttribute('disabled', true);
};
