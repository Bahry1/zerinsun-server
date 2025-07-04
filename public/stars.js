const canvas = document.getElementById("stars-canvas");
const ctx = canvas.getContext("2d");
let stars = [];
let w, h;

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.002
    });
  }
}

function animateStars() {
  ctx.clearRect(0, 0, w, h);
  for (let s of stars) {
    s.alpha += s.speed;
    if (s.alpha <= 0 || s.alpha >= 1) s.speed = -s.speed;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(animateStars);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createStars(100);
});

resizeCanvas();
createStars(100);
animateStars();