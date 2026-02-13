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

// Make the "No" button move responsively and work on touch devices.
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  function moveNoBtn() {
    const btn = noBtn;
    const container = btn.parentElement || document.body;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const padding = 8;
    const maxLeft = Math.max(0, containerRect.width - btnRect.width - padding);
    const maxTop = Math.max(0, containerRect.height - btnRect.height - padding);

    // For mobile keep it inside the .buttons container; for larger screens allow wider movement
    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;

    btn.style.left = left + "px";
    btn.style.top = top + "px";
    btn.style.transform = "translate(0,0)";
  }

  // Initialize centered position
  (function initNoBtn(){
    const c = noBtn.parentElement || document.body;
    const cRect = c.getBoundingClientRect();
    const bRect = noBtn.getBoundingClientRect();
    noBtn.style.left = Math.max(0, (cRect.width - bRect.width) / 2) + 'px';
    noBtn.style.top = Math.max(0, (cRect.height - bRect.height) / 2) + 'px';
  })();

  ['mouseover','pointerenter','touchstart','click'].forEach(evt => {
    noBtn.addEventListener(evt, moveNoBtn, { passive: true });
  });
}

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

/* ---------- SIMPLE TOUCH-FRIENDLY SLIDER INIT ---------- */
function initSlider() {
  const slides = document.querySelector('.slides');
  if (!slides) return;
  const imgs = Array.from(slides.querySelectorAll('img'));
  const slider = document.querySelector('.slider');

  function resizeImages() {
    if (window.innerWidth < 700) {
      imgs.forEach(img => {
        img.style.flex = '0 0 85%';
        img.style.width = '85%';
        img.style.height = Math.round(window.innerWidth * 0.56) + 'px';
      });
    } else {
      imgs.forEach(img => {
        img.style.flex = '0 0 48%';
        img.style.width = '48%';
        img.style.height = 'auto';
      });
    }
  }

  // build dots
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'slider-dots';
  imgs.forEach((img, i) => {
    const btn = document.createElement('button');
    btn.className = 'dot';
    btn.addEventListener('click', () => {
      const left = img.offsetLeft - (slides.clientWidth - img.clientWidth) / 2;
      slides.scrollTo({ left, behavior: 'smooth' });
    });
    dotsWrap.appendChild(btn);
  });
  if (slider) slider.appendChild(dotsWrap);

  function updateActiveDot() {
    const center = slides.scrollLeft + slides.clientWidth / 2;
    imgs.forEach((img, i) => {
      const imgCenter = img.offsetLeft + img.clientWidth / 2;
      const isActive = Math.abs(center - imgCenter) < img.clientWidth / 2;
      const dot = dotsWrap.children[i];
      if (dot) dot.classList.toggle('active', isActive);
    });
  }

  slides.addEventListener('scroll', () => {
    updateActiveDot();
  }, { passive: true });

  window.addEventListener('resize', () => {
    resizeImages();
  });

  // initial setup
  resizeImages();
  // scroll to first image centered
  if (imgs[0]) {
    const left = imgs[0].offsetLeft - (slides.clientWidth - imgs[0].clientWidth) / 2;
    slides.scrollTo({ left });
  }
  updateActiveDot();
}

// run after DOM ready (script is deferred so elements exist)
initSlider();