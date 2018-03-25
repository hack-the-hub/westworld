// Init
let canvas = document.querySelector('#galaxy');
let ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Fix resize canvas
window.onresize = function() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
function clearScreen() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let stars = []
for (let i=0; i < 700; i++) {
  // star(x, y, speed)
  stars.push({
    x: ~~(Math.random() * canvas.width),
    y: ~~(Math.random() * canvas.height),
    speed: ~~(0.5 + Math.random()),
    color: ~~(Math.random()*3),
  });
}

// Main loop
function loop() {
  requestAnimationFrame(loop, canvas);
  update();
  render();
}

// Update
function update() {
  // Stars
  for (let i=0; i < 700; i++) {
    stars[i].y -= stars[i].speed;
    if (stars[i].y < 0)
      stars[i].y = canvas.height;
  }
}

// Render
function render() {
  clearScreen();
  for (let i=0; i < 700; i++) {
    var s = stars[i];
    ctx.lineWidth = -1;
    ctx.strokeStyle = ['#444', '#888', '#FFF'][stars[i].color];
    ctx.strokeRect(s.x, s.y, 1, 1);
  }
}
loop();