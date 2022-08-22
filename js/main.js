const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 769;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.onload = () => {
  ctx.drawImage(image, 0, 0);
};
image.src = 'assets/gameMap.png';
