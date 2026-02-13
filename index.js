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

// Improve autoplay behavior: try to play on load, fall back to muted play,
// and show a small prompt if the browser blocks autoplay with sound.
music.autoplay = true;
music.loop = true;
music.playsInline = true;

async function tryAutoplay() {
  try {
    await music.play();
    playing = !music.paused;
    return;
  } catch (err) {
    // Try muted autoplay (more likely to be allowed)
    try {
      music.muted = true;
      await music.play();
      playing = !music.paused;
      // show a subtle prompt to enable sound
      showEnableSoundPrompt();
    } catch (err2) {
      // Autoplay fully blocked — show prompt
      showEnableSoundPrompt();
    }
  }
}

function showEnableSoundPrompt() {
  if (document.getElementById('autoplayPrompt')) return;
  const btn = document.createElement('button');
  btn.id = 'autoplayPrompt';
  btn.textContent = 'Tap to enable sound';
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '18px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 16px',
    background: '#d6336c',
    color: '#fff',
    border: 'none',
    borderRadius: '999px',
    zIndex: 99999,
    boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
    cursor: 'pointer'
  });
  btn.addEventListener('click', async () => {
    try {
      music.muted = false;
      await music.play();
      playing = !music.paused;
      btn.remove();
    } catch (e) {
      // ignore
    }
  }, { passive: true });
  document.body.appendChild(btn);
}

// Try autoplay on load (script is deferred, DOM exists)
tryAutoplay();

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
    // User-initiated action (Unlock) — try to play unmuted now.
    (async () => {
      try {
        music.muted = false;
        await music.play();
        playing = !music.paused;
        const p = document.getElementById('autoplayPrompt'); if (p) p.remove();
      } catch (e) {
        // If still blocked, keep muted autoplay running and show prompt
        tryAutoplay();
      }
    })();
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

/* ---------- AUTO-SCROLLING SLIDER (infinite) ---------- */
(function enableAutoSlider(){
  const slides = document.querySelector('.slides');
  if (!slides) return;
  const imgs = Array.from(slides.querySelectorAll('img'));
  if (!imgs.length) return;

  const dotsWrap = document.querySelector('.slider-dots') || (() => {
    const el = document.createElement('div');
    el.className = 'slider-dots';
    const container = document.querySelector('.slider') || slides.parentElement;
    container.appendChild(el);
    return el;
  })();

  let current = 0;
  const INTERVAL = 3500;
  let timer = null;
  let paused = false;

  function centerImage(i) {
    const img = imgs[i];
    if (!img) return;
    const left = img.offsetLeft - (slides.clientWidth - img.clientWidth) / 2;
    slides.scrollTo({ left, behavior: 'smooth' });
  }

  function updateDots() {
    Array.from(dotsWrap.children).forEach((d, idx) => d.classList.toggle('active', idx === current));
  }

  // build dots (once)
  if (dotsWrap.children.length === 0) {
    imgs.forEach((img, i) => {
      const btn = document.createElement('button');
      btn.className = 'dot';
      btn.addEventListener('click', () => {
        current = i;
        centerImage(current);
        resetTimer();
      });
      dotsWrap.appendChild(btn);
    });
  }

  function next() {
    current = (current + 1) % imgs.length;
    centerImage(current);
    updateDots();
  }

  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(function step(){ if (!paused) next(); timer = setTimeout(step, INTERVAL); }, INTERVAL);
  }

  // keep current in sync when user scrolls manually
  slides.addEventListener('scroll', () => {
    const center = slides.scrollLeft + slides.clientWidth / 2;
    let best = 0; let bestDist = Infinity;
    imgs.forEach((img, i) => {
      const imgCenter = img.offsetLeft + img.clientWidth / 2;
      const d = Math.abs(center - imgCenter);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    current = best;
    updateDots();
  }, { passive: true });

  // pause while user interacts
  ['pointerdown','touchstart','mousedown'].forEach(ev => slides.addEventListener(ev, () => { paused = true; clearTimeout(timer); }, { passive: true }));
  ['pointerup','touchend','mouseleave'].forEach(ev => slides.addEventListener(ev, () => { paused = false; resetTimer(); }, { passive: true }));

  // initial positioning
  setTimeout(() => { centerImage(0); updateDots(); resetTimer(); }, 120);
})();