const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
  if (target.value.length > 3) {
    button.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = 'pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);

// Executa assim que a tela de login carrega
window.onload = () => {
  const bestScoreElement = document.querySelector('.login__best-score');
  const bestTime = localStorage.getItem('bestTime');

  if (bestTime) {
    bestScoreElement.innerHTML = `Melhor Tempo: ${bestTime}s`;
  } else {
    bestScoreElement.innerHTML = `Melhor Tempo: Nenhum`;
  }
}