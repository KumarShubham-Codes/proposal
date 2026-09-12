const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const noModal = document.getElementById("noModal");
const yesModal = document.getElementById("yesModal");
const closeNo = document.getElementById("closeNo");
const closeYes = document.getElementById("closeYes");

function openModal(modal) {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

noBtn.addEventListener("click", () => {
  noBtn.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-7px) rotate(-2deg)" },
      { transform: "translateX(7px) rotate(2deg)" },
      { transform: "translateX(-4px)" },
      { transform: "translateX(0)" }
    ],
    { duration: 420, easing: "ease-out" }
  );
  openModal(noModal);
});

yesBtn.addEventListener("click", () => {
  document.body.classList.add("celebrating");
  openModal(yesModal);
  launchHearts();
});

closeNo.addEventListener("click", () => closeModal(noModal));

closeYes.addEventListener("click", () => {
  closeModal(yesModal);
});

[noModal, yesModal].forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal(modal);
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeModal(noModal);
    closeModal(yesModal);
  }
});

function launchHearts() {
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.textContent = Math.random() > .35 ? "♥" : "✦";
    heart.style.position = "fixed";
    heart.style.left = `${50 + (Math.random() * 20 - 10)}%`;
    heart.style.top = `${52 + (Math.random() * 8 - 4)}%`;
    heart.style.zIndex = "200";
    heart.style.fontSize = `${14 + Math.random() * 22}px`;
    heart.style.color = Math.random() > .5 ? "#e66d59" : "#f5b82e";
    heart.style.pointerEvents = "none";
    document.body.appendChild(heart);

    const x = (Math.random() - .5) * 600;
    const y = -180 - Math.random() * 450;

    heart.animate(
      [
        { transform: "translate(-50%, -50%) scale(.4)", opacity: 0 },
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1, offset: .12 },
        { transform: `translate(calc(-50% + ${x}px), ${y}px) rotate(${Math.random()*80-40}deg)`, opacity: 0 }
      ],
      { duration: 1800 + Math.random() * 1000, easing: "cubic-bezier(.15,.7,.2,1)" }
    ).finished.then(() => heart.remove());
  }
}
