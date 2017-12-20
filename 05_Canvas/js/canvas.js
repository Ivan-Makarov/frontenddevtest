const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'navy';
ctx.strokeRect(50, 50, 320, 180);

const gradient = ctx.createLinearGradient(100, 150, 250, 180);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.5, 'green');
gradient.addColorStop(0.8, 'blue');
gradient.addColorStop(1, 'purple');

ctx.font = "bold 30px sans-serif";
ctx.fillStyle = gradient;
ctx.fillText('The answer is 42', 100, 150);

ctx.beginPath();
ctx.moveTo(40, 40);
ctx.lineTo(380, 240);
ctx.closePath();
ctx.strokeStyle = 'tomato';
ctx.stroke();
