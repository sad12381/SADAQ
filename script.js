// Confetti Effect
const confettiCanvas = document.getElementById('confetti-canvas');
const confettiSettings = { target: confettiCanvas, max: 200, clock: 50 };
const confetti = new ConfettiGenerator(confettiSettings);

// Smooth Scroll with Offset for Sticky Nav
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    const offset = 80; // Adjust for sticky nav height
    const targetPosition = targetSection.offsetTop - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

// Sticky Navigation
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Animate Competence Bars on Scroll
const competenceBars = document.querySelectorAll('.competence-level');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-level');
      entry.target.style.width = `${width}%`;
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

competenceBars.forEach(bar => observer.observe(bar));

// Particle.js Background
particlesJS.load('particles-js', 'particles.json', () => {
  console.log('Particles loaded!');
});
// Animate Language Progress Bars on Scroll
const progressBars = document.querySelectorAll('.progress-bar');
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-level');
      entry.target.style.width = `${width}%`;
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

// Typing Animation for Tagline
const typingText = document.querySelector('.typing-animation');
const professions = ["Technicien Électrique", "Passionné d'Automatisme", "Polyvalent et Créatif"];
let index = 0;
let charIndex = 0;

const type = () => {
  if (charIndex < professions[index].length) {
    typingText.textContent += professions[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
};

const erase = () => {
  if (charIndex > 0) {
    typingText.textContent = professions[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % professions.length;
    setTimeout(type, 500);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000);
});


// Mini Game Logic
const gameBoard = document.querySelector('.game-board');
const cards = ['⚡', '⚡', '🧲', '🧲', '💡', '💡', '💜', '💜'];
let flippedCards = [];
let matchedCards = [];

// Shuffle the cards
function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

// Create the game board
function createGameBoard() {
  shuffleCards();
  gameBoard.innerHTML = '';
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = card;
    cardElement.textContent = '?';
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

// Flip a card
function flipCard(event) {
  const card = event.target;
  if (flippedCards.length < 2 && !flippedCards.includes(card) && !card.classList.contains('matched')) {
    card.textContent = card.dataset.value;
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

// Check if the flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);

    // Check if all cards are matched
    if (matchedCards.length === cards.length) {
      document.querySelector('.game-message').textContent = 'Félicitations! Vous avez trouvé toutes les paires!';
      
      // Trigger confetti effect
      confetti.render();
      setTimeout(() => confetti.clear(), 3000); // Stop confetti after 3 seconds
    }
  } else {
    setTimeout(() => {
      card1.textContent = '?';
      card2.textContent = '?';
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }, 1000);
  }
  flippedCards = [];
}

// Reset Game
document.getElementById('reset-game').addEventListener('click', () => {
  matchedCards = [];
  createGameBoard();
  document.querySelector('.game-message').textContent = 'Trouvez les paires de cartes correspondantes!';
});

// Initialize the game
createGameBoard();

// Animate Circular Progress Bars
const circularProgressBars = document.querySelectorAll('.circular-progress');

circularProgressBars.forEach(progressBar => {
  const progressValue = progressBar.querySelector('.progress-value');
  const progress = parseInt(progressBar.getAttribute('data-progress'));

  let startValue = 0;
  const speed = 20; // Animation speed in milliseconds

  const progressAnimation = setInterval(() => {
    startValue++;
    progressValue.textContent = `${startValue}%`;
    progressBar.style.background = `conic-gradient(var(--primary-color) ${startValue * 3.6}deg, var(--background-dark) 0deg)`;

    if (startValue === progress) {
      clearInterval(progressAnimation);
    }
  }, speed);
});

// Smooth Scroll for Floating Buttons
const gameButton = document.querySelector('.game-button');
const contactButton = document.querySelector('.contact-button');

gameButton.addEventListener('click', () => {
  const gameSection = document.querySelector('#minigame');
  gameSection.scrollIntoView({ behavior: 'smooth' });
});

contactButton.addEventListener('click', () => {
  const contactSection = document.querySelector('#contact');
  contactSection.scrollIntoView({ behavior: 'smooth' });
});

// Reset Game
document.getElementById('reset-game').addEventListener('click', () => {
  matchedCards = [];
  createGameBoard();
  document.querySelector('.game-message').textContent = 'Trouvez les paires de cartes correspondantes!';
});

// Animate Skill Bars on Scroll
const skillBars = document.querySelectorAll('.skill-bar .skill-level');

const observer1 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = '0';
      setTimeout(() => {
        entry.target.style.width = width;
      }, 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => observer.observe(bar));
