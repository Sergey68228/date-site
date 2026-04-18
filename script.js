const floatingHearts = document.querySelector(".floating-hearts");
const noBtn = document.getElementById("noBtn");
const noCounterText = document.getElementById("noCounterText");
const mainCat = document.getElementById("mainCat");
const yesBtn = document.getElementById("yesBtn");

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

if (floatingHearts) {
  setInterval(createHeart, 500);

  for (let i = 0; i < 10; i += 1) {
    setTimeout(createHeart, i * 180);
  }
}

function showCat1() {
  if (!mainCat) return;
  mainCat.src = "cat1.gif";
  mainCat.alt = "Котик";
}

function showCat2() {
  if (!mainCat) return;
  mainCat.src = "cat2.gif";
  mainCat.alt = "Котик просит";
}

if (noBtn) {
  const messages = [
    "подумай ещё раз…",
    "точно нет? 🥺",
    "может всё-таки да?",
    "ну пожалуйста",
    "котик уже просит за меня",
    "я правда хочу погулять с тобой",
    "нет здесь не приветствуется 💔",
    "ладно, выбора у тебя почти нет"
  ];

  let moveCount = 0;
  let isFloating = false;
  let catChangedToTwo = false;

  function activateNoMode(event) {
    if (event && event.type === "touchstart") {
      event.preventDefault();
    }

    moveCount += 1;

    if (!catChangedToTwo) {
      showCat2();
      catChangedToTwo = true;
    }

    if (noCounterText) {
      noCounterText.textContent = messages[(moveCount - 1) % messages.length];
    }

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const x = Math.max(10, Math.random() * Math.max(20, maxX));
    const y = Math.max(10, Math.random() * Math.max(20, maxY));

    noBtn.classList.add("is-floating");
    noBtn.style.position = "fixed";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    isFloating = true;
  }

  noBtn.addEventListener("mouseenter", activateNoMode);
  noBtn.addEventListener("click", activateNoMode);
  noBtn.addEventListener("touchstart", activateNoMode, { passive: false });

  window.addEventListener("resize", () => {
    if (!isFloating) return;

    const rect = noBtn.getBoundingClientRect();
    const overflowX = rect.right > window.innerWidth || rect.left < 0;
    const overflowY = rect.bottom > window.innerHeight || rect.top < 0;

    if (overflowX || overflowY) {
      const maxX = window.innerWidth - noBtn.offsetWidth - 20;
      const maxY = window.innerHeight - noBtn.offsetHeight - 20;

      noBtn.style.left = `${Math.max(10, Math.random() * Math.max(20, maxX))}px`;
      noBtn.style.top = `${Math.max(10, Math.random() * Math.max(20, maxY))}px`;
    }
  });
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    sessionStorage.setItem("selectedCat", "cat3");
  });
}
