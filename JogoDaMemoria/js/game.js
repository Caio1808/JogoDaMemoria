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

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    
    const finalTime = parseInt(timer.innerHTML);
    const currentBest = localStorage.getItem('bestTime');

    if (currentBest === null || finalTime < parseInt(currentBest)) {
      localStorage.setItem('bestTime', finalTime);
      alert(`Parabéns, ${spanPlayer.innerHTML}! Você bateu o RECORDE com: ${finalTime} segundos!`);
    } else {
      alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${finalTime} segundos. (Melhor tempo: ${currentBest}s)`);
    }

    setTimeout(() => {
      window.location = '../index.html'; 
    }, 1500);
  }
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

  if (timer.innerHTML === '00') {
    return;
  }

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
  card.setAttribute('data-character', character);

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

const previewCards = () => {
  const allCards = document.querySelectorAll('.card');

  allCards.forEach((card) => {
    card.classList.add('reveal-card');
  });

  
  setTimeout(() => {
    allCards.forEach((card) => {
      card.classList.remove('reveal-card');
    });
    
    startTimer();
  }, 1000);
}

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  
  const best = localStorage.getItem('bestTime');
  console.log('O recorde atual é de: ' + (best ? best + 's' : 'Nenhum ainda'));

  loadGame();      
  previewCards();  
}
