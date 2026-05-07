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

let currentPosition = 0;
const maxPosition = parentBlock.offsetWidth - childBlock.offsetWidth;
function moveBlock() {
  if (currentPosition >= maxPosition) {
    return;
  }
  currentPosition += 3;
  childBlock.style.left = currentPosition + 'px';
  setTimeout(moveBlock, 20);
}
document.addEventListener('DOMContentLoaded', moveBlock);
