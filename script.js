const floatingHearts = document.querySelector(".floating-hearts");

function createHeart() {
  if (!floatingHearts) return;

  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "♡" : "💗";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;
  heart.style.fontSize = `${16 + Math.random() * 24}px`;

  floatingHearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

setInterval(createHeart, 500);

for (let i = 0; i < 10; i += 1) {
  setTimeout(createHeart, i * 180);
}

const noBtn = document.getElementById("noBtn");
const noCounterText = document.getElementById("noCounterText");

if (noBtn) {
  const messages = [
    "подумай ещё раз…",
    "точно нет? 🥺",
    "эта кнопка работает странно",
    "может всё-таки да?",
    "я старалась между прочим",
    "нет здесь не приветствуется 💔",
    "ладно, выбора у тебя почти нет"
  ];

  let moveCount = 0;
  let isFloating = false;

  function moveNoButton() {
    moveCount += 1;

    if (noCounterText) {
      noCounterText.textContent =
        messages[(moveCount - 1) % messages.length];
    }

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const x = Math.max(10, Math.random() * maxX);
    const y = Math.max(10, Math.random() * maxY);

    noBtn.classList.add("is-floating");
    noBtn.style.position = "fixed";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    isFloating = true;
  }

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("click", moveNoButton);

  window.addEventListener("resize", () => {
    if (!isFloating) return;

    const rect = noBtn.getBoundingClientRect();
    const overflowX = rect.right > window.innerWidth || rect.left < 0;
    const overflowY = rect.bottom > window.innerHeight || rect.top < 0;

    if (overflowX || overflowY) {
      moveNoButton();
    }
  });
}