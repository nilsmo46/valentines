const CORRECT_PASSWORD = "herspecialword";
const HER_NAME = "Richaaaa";
const RELATIONSHIP_START = "2024-02-17";
const MUSIC_FILE = "music.mp3";

const music = document.getElementById("bgMusic");
music.src = MUSIC_FILE;
let playing = false;

function toggleMusic() {
  playing ? music.pause() : music.play();
  playing = !playing;
}

function unlock() {
  const input = document.getElementById("passwordInput").value;
  if (input === CORRECT_PASSWORD) {
    document.getElementById("lockScreen").style.display = "none";
    animateName();
    startCounter();
  } else {
    document.getElementById("error").style.display = "block";
  }
}

function animateName() {
  const el = document.getElementById("herName");
  [...HER_NAME].forEach((l, i) => {
    const span = document.createElement("span");
    span.textContent = l === " " ? "\u00A0" : l;
    span.style.animationDelay = `${i * 0.15}s`;
    el.appendChild(span);
  });
}

function startCounter() {
  const start = new Date(RELATIONSHIP_START);
  const today = new Date();
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  document.getElementById("daysTogether").textContent = diff;
}

document.getElementById("noBtn").addEventListener("mouseover", e => {
  e.target.style.transform =
    `translate(${Math.random()*300-150}px, ${Math.random()*150-75}px)`;
});

function yesClicked() {
  for (let i = 0; i < 80; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random()*window.innerWidth+"px";
    c.style.background = `hsl(${Math.random()*360},100%,70%)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3000);
  }
  alert("YAY ❤️ I knew it 😘");
}