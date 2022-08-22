const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 769;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();

image.src = 'assets/gameMap.png';

class Enemy {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.width = 100;
    this.height = 100;
    this.waypointIndex = 0;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();

    const waypoint = waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.center.y;
    const xDistance = waypoint.x - this.center.x;
    const angle = Math.atan2(yDistance, xDistance);
    this.position.x += Math.cos(angle);
    this.position.y += Math.sin(angle);
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };

    if (
      Math.round(this.center.x) === Math.round(waypoint.x) &&
      Math.round(this.center.y) === Math.round(waypoint.y) &&
      this.waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex++;
    }
  }
}

const enemies = [];
for (let i = 1; i < 10; i++) {
  const xOffset = i * 150;
  enemies.push(
    new Enemy({
      position: { x: waypoints[0].x - xOffset, y: waypoints[0].y },
    })
  );
}

let x = 200;
function animate() {
  requestAnimationFrame(animate);
  ctx.drawImage(image, 0, 0);
  enemies.forEach((enemy) => {
    enemy.update();
  });
}

animate();
