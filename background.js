const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w, h;

/* ---------- Resize (HERO ONLY) ---------- */
function resize() {
  const hero = document.querySelector(".hero");
  w = canvas.width = hero.offsetWidth;
  h = canvas.height = hero.offsetHeight;
}
window.addEventListener("resize", resize);
resize();

/* ---------- Particles ---------- */
const particles = Array.from({ length: 80 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2 + 1,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4
}));

/* ---------- Floating Data Points ---------- */
const dataPoints = Array.from({ length: 30 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  s: Math.random() * 3 + 2,
  v: Math.random() * 0.35 + 0.1
}));

let t = 0;

/* ---------- ECG Line (GREEN) ---------- */
function drawECG() {
  ctx.beginPath();
  ctx.strokeStyle = "rgba(236,72,153,0.5)";
  ctx.lineWidth = 2;

  for (let x = 0; x < w; x++) {
    const spike = x % 140 === 0 ? -40 : 0;
    const y =
      h * 0.55 +
      Math.sin((x + t * 6) * 0.02) * 18 +
      spike;

    ctx.lineTo(x, y);
  }
  ctx.stroke();
}

/* ---------- Soft Background Wave ---------- */
function drawWave() {
  ctx.beginPath();
  ctx.strokeStyle = "rgba(15,118,110,0.28)";
  ctx.lineWidth = 1.5;

  for (let x = 0; x < w; x++) {
    ctx.lineTo(
      x,
      h * 0.72 + Math.sin((x + t) * 0.01) * 30
    );
  }
  ctx.stroke();
}

/* ---------- Center Pulse ---------- */
function drawPulse() {
  const r = 24 + Math.sin(t * 0.05) * 6;
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(236,72,153,0.5)";
  ctx.lineWidth = 2.5;
  ctx.stroke();
}

/* ---------- Animation Loop ---------- */
function animate() {
  ctx.clearRect(0, 0, w, h);
  t++;

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(7, 192, 176, 0.7)";
    ctx.fill();
  });

  dataPoints.forEach(d => {
    d.y -= d.v;
    if (d.y < -10) d.y = h + 10;

    ctx.fillStyle = "rgba(236,72,153,0.8)";
    ctx.fillRect(d.x, d.y, d.s, d.s);
  });

  drawWave();
  drawECG();
  drawPulse();

  requestAnimationFrame(animate);
}

animate();



