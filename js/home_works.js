const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

const gmailInput = document.getElementById('gmail_input');
const gmailButton = document.getElementById('gmail_button');
const gmailResult = document.getElementById('gmail_result');

function checkGmail() {
  const email = gmailInput.value.trim();
  
  if (gmailRegex.test(email)) {
    gmailResult.textContent = '✓ Valid Gmail';
    gmailResult.style.color = 'green';
  } else {
    gmailResult.textContent = '✗ Invalid Gmail';
    gmailResult.style.color = 'red';
  }
}

gmailButton.addEventListener('click', checkGmail);

gmailInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkGmail();
  }
});
const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');

let posX = 0;
let posY = 0;
let dirX = 1; 
let dirY = 0; 

const step = 3;
const maxX = parentBlock.offsetWidth - childBlock.offsetWidth;
const maxY = parentBlock.offsetHeight - childBlock.offsetHeight;

function moveBlock() {
  if (dirY === 0 && dirX === 1) {
    posX += step;
    if (posX >= maxX) {
      posX = maxX;
      dirX = 0;
      dirY = 1;
    }
  }
  else if (dirY === 1 && dirX === 0) {
    posY += step;
    if (posY >= maxY) {
      posY = maxY;
      dirX = -1;
      dirY = 0; 
    }
  }

  else if (dirY === 0 && dirX === -1) {
    posX -= step;
    if (posX <= 0) {
      posX = 0;
      dirX = 0;
      dirY = -1;
    }
  }

  else if (dirY === -1 && dirX === 0) {
    posY -= step;
    if (posY <= 0) {
      posY = 0;
      dirX = 1;
      dirY = 0; 
    }
  }

  childBlock.style.left = posX + 'px';
  childBlock.style.top = posY + 'px';
  
  setTimeout(moveBlock, 20);
}

document.addEventListener('DOMContentLoaded', moveBlock);

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const secondsDisplay = document.getElementById('seconds');

let seconds = 0;
let timerInterval = null;
let isRunning = false;

function startTimer() {
  if (isRunning) {
    return;
  }
  
  isRunning = true;
  
  timerInterval = setInterval(() => {
    seconds++;
    secondsDisplay.textContent = seconds;
  }, 1000);
}

function stopTimer() {
  isRunning = false;
  
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  secondsDisplay.textContent = '0';
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
