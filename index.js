const CORRECT_PASSWORD = "harrier";
const HER_NAME = "Richaaaa";
const RELATIONSHIP_START = "2024-02-17";
const MUSIC_FILE = "music.mp3";
const loveReasons = [
  "You make even ordinary days feel special.",
  "You understand me in ways no one else does.",
  "You make me feel safe, always.",
  "Your smile can fix my worst days.",
  "You are my favorite person to talk to.",
  "You believe in me, even when I don’t.",
  "You feel like home.",
  "You laugh at my stupid jokes.",
  "You care deeply, even about small things.",
  "You make me want to be better.",
  "You listen without judging.",
  "You support my dreams like they’re your own.",
  "You know when something is wrong, even when I say I’m fine.",
  "You make silence comfortable.",
  "You remember the little details.",
  "You’re patient with me.",
  "You make me feel chosen.",
  "You’re my calm in chaos.",
  "You make love feel easy.",
  "You inspire me every day.",
  "You’re kind, even when it’s hard.",
  "You make me laugh when I need it most.",
  "You understand my moods.",
  "You’re my favorite notification.",
  "You make me feel appreciated.",
  "You make time stop when I’m with you.",
  "You accept me exactly as I am.",
  "You make life brighter.",
  "You are simply… you."
];


const music = document.getElementById("bgMusic");
music.src = MUSIC_FILE;
let playing = false;

function toggleMusic() {
  playing ? music.pause() : music.play();
  playing = !playing;
}

function unlock() {
  const input = document.getElementById("passwordInput").value;
  if (input.toLowerCase() === CORRECT_PASSWORD.toLowerCase()) {
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

const loveBtn = document.getElementById("loveBtn");
const loveReason = document.getElementById("loveReason");

let lastIndex = -1;

loveBtn.addEventListener("click", () => {
  let index;
  do {
    index = Math.floor(Math.random() * loveReasons.length);
  } while (index === lastIndex);

  lastIndex = index;

  loveReason.style.opacity = 0;

  setTimeout(() => {
    loveReason.textContent = loveReasons[index];
    loveReason.style.opacity = 1;
  }, 200);
});