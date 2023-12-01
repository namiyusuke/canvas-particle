const c = document.querySelector("canvas");
const ctx = c.getContext("2d");
const cw = (c.width = innerWidth);
const ch = (c.height = innerHeight); //*0.9
const dots = Array(750);
const dur = 10;
const hue = 105;
const mPos = { x: cw / 2, y: ch };
c.addEventListener("mousemove", (e) => {
  mPos.x = e.clientX;
  mPos.y = e.clientY;
});
for (let i = 0; i < dots.length; i++) {
  dots[i] = {
    x: Math.random() * cw,
    y: Math.random() * ch,
    r: Math.random() * 2 + 1,
    c: `hsl(20%, 100%, 50%)`,
    s: Math.random() * 2 + 1,
    d: Math.random() * dur,
  };
}
function drawDot(x, y, r) {
  const dist = Math.sqrt(Math.pow(x - mPos.x, 2) + Math.pow(y - mPos.y, 2));
  const maxDist = 200; // マウスとの最大距離
  const maxRadius = 35; // 最大の円の半径
  const minRadius = 4; // 最小の円の半径

  const radius = Math.max(minRadius, maxRadius - (maxRadius - minRadius) * (dist / maxDist));
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}
function redraw() {
  ctx.clearRect(0, 0, cw, ch);
  dots.forEach((dot) => drawDot(dot.x, dot.y, dot.r));
}
const tl = gsap.timeline({ onUpdate: redraw });
tl.from(dots, {
  duration: dur,
  ease: "none",
  x: (i) => "-=random(-99,99)",
  y: (i, t) => -t.r * ch,
  r: () => "+=random(-1,2)",
  repeatRefresh: true,
  stagger: { from: "random", amount: dur, repeat: -1 },
});
