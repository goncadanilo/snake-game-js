const stage = document.getElementById("stage");
const context = stage.getContext("2d");

const count = document.getElementById("count");
const max_count = document.getElementById("max-score");
const modal = document.getElementById("myModal");
const btn = document.getElementById("btn");

document.addEventListener("keydown", keyPress);
setInterval(handleGame, 150);

const speed = 1;
const len = 25;
const quantity = 20;

var start = false;
var game_over = false;
var score = 0;
var max_score = 0;
var direction = { x: 0, y: 0 };
var position = { x: 10, y: 10 };
var apple = { x: 15, y: 15 };

var trail = [];
tail = 2;

var lastKey = 0;

function handleGame() {
  count.innerHTML = score;
  max_count.innerHTML = max_score;

  position.x += direction.x;
  position.y += direction.y;

  if (position.x < 0) {
    position.x = quantity - 1;
  }

  if (position.x > quantity - 1) {
    position.x = 0;
  }

  if (position.y < 0) {
    position.y = quantity - 1;
  }

  if (position.y > quantity - 1) {
    position.y = 0;
  }

  context.fillStyle = "#252222";
  context.fillRect(0, 0, stage.width, stage.height);

  context.fillStyle = "#f00";
  context.fillRect(apple.x * len, apple.y * len, len, len);

  context.fillStyle = "#0f0";
  for (var i = 0; i < trail.length; i++) {
    context.fillRect(trail[i].x * len, trail[i].y * len, len - 1, len - 1);

    if (trail[i].x === position.x && trail[i].y === position.y) {
      direction.x = direction.y = 0;
      tail = 2;
      score = 0;
      lastKey = 0;
    }
  }

  trail.push({ x: position.x, y: position.y });
  while (trail.length > tail) {
    trail.shift();
  }

  if (apple.x === position.x && apple.y === position.y) {
    tail++;
    apple.x = Math.floor(Math.random() * quantity);
    apple.y = Math.floor(Math.random() * quantity);
    score += 10;
    max_score = score;
    start = true;
  }

  if (start === true && score === 0) {
    setTimeout(function() {
      modal.style.display = "block";
    }, 700);

    start = false;
    game_over = true;
  }

  btn.onclick = function() {
    modal.style.display = "none";
    game_over = false;
  };
}

function keyPress(event) {
  if (!game_over) {
    switch (event.keyCode) {
      case 37: // left
        if (lastKey !== 39) {
          direction.x = -speed;
          direction.y = 0;
          lastKey = 37;
        }
        break;
      case 38: // up
        if (lastKey !== 40) {
          direction.x = 0;
          direction.y = -speed;
          lastKey = 38;
        }
        break;
      case 39: // right
        if (lastKey !== 37) {
          direction.x = speed;
          direction.y = 0;
          lastKey = 39;
        }
        break;
      case 40: // down
        if (lastKey !== 38) {
          direction.x = 0;
          direction.y = speed;
          lastKey = 40;
        }
        break;
      default:
        break;
    }
  }
}
