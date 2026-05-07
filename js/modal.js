const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal_close');
let scrollModalShown = false;

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

function handleScroll() {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  const clientHeight = window.innerHeight;
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    if (!scrollModalShown) {
      openModal();
      scrollModalShown = true;
      window.removeEventListener('scroll', handleScroll);
    }
  }
}

window.addEventListener('scroll', handleScroll);

setTimeout(() => {
  if (!scrollModalShown) {
    openModal();
  }
}, 10000);
