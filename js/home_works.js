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

const DEFAULT_IMAGE = 'https://via.placeholder.com/250x250?text=No+Photo';

const charactersList = document.querySelector('.characters-list');

fetch('../data/characters.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.status);
    }
    return response.json();
  })
  .then((characters) => {
    characters.forEach((character) => {
      const photoSrc = character.photo || DEFAULT_IMAGE;

      const card = document.createElement('div');
      card.classList.add('character-card');

      card.innerHTML = `
        <div class="character-photo">
          <img
            src="${photoSrc}"
            alt="${character.name}"
            onerror="this.src='${DEFAULT_IMAGE}'"
          />
        </div>
        <h3 class="character-name">${character.name}</h3>
        <p class="character-age">Age: ${character.age}</p>
      `;

      charactersList.appendChild(card);
    });
  })
  .catch((error) => {
    console.error('Error characters:', error);
    charactersList.innerHTML = '<p style="color: red;">Failed to load characters.</p>';
  });

const bio = new XMLHttpRequest();
 bio.open('GET', '../data/bio.json', true);

bio.onload = function () {
  if (bio.status === 200) {
    const bio = JSON.parse(bio.responseText);
    console.log('=== My Bio ===');
    console.log('Name:', bio.name);
    console.log('Age:', bio.age);
    console.log('School:', bio.school);
    console.log('Favourite subject:', bio.favorite_subject);
    console.log('Hobbies:', bio.hobbies.join(', '));
    console.log('Full object:', bio);
  } else {
    console.error('XMLHttpRequest failed, status:', bio.status);
  }
};

bio.onerror = function () {
  console.error('XMLHttpRequest network error');
};

bio.send();
