const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'Cuphead',
  'Mugman',
  'Chalice',
  'King Dice',
  'Devil',
  'Elder Kettle',
  'Porkring',
  'Cala Maria',
  'Bon Bon',
  'Ribby e Croaks',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

// Função para verificar o final do jogo e salvar a melhor pontuação
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    
    const finalTime = parseInt(timer.innerHTML);
    const currentBest = localStorage.getItem('bestTime');

    // Se não existir recorde ou se o tempo atual for menor (melhor) que o recorde
    if (currentBest === null || finalTime < parseInt(currentBest)) {
      localStorage.setItem('bestTime', finalTime);
      alert(`Parabéns, ${spanPlayer.innerHTML}! Você bateu o RECORDE com: ${finalTime} segundos!`);
    } else {
      alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${finalTime} segundos. (Melhor tempo: ${currentBest}s)`);
    }

    // Aguarda 1.5 segundos após o alerta e volta para o menu inicial
    setTimeout(() => {
      window.location = '../index.html'; // Ajuste o caminho se o seu arquivo de login tiver outro nome
    }, 1500);
  }
}

// Atualizado para buscar o recorde e colocar na tela (opcional, se quiser exibir no header)
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  
  // Exibe o recorde no console apenas para teste, ou você pode criar um span no HTML para ele
  const best = localStorage.getItem('bestTime');
  console.log('O recorde atual é de: ' + (best ? best + 's' : 'Nenhum ainda'));

  startTimer();
  loadGame();
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {
  const clickedCard = target.parentNode;

  if (!target.classList.contains('face') || secondCard !== '') {
    return;
  }

   if (clickedCard.classList.contains('reveal-card') || clickedCard.firstChild.classList.contains('disabled-card')) {
    return;
  }

   clickedCard.classList.add('reveal-card');

  if (firstCard === '') {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;
    checkCards();
  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../imagens/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}

