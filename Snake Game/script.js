const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restart");
const scoreEl = document.getElementById("score");

const box = 20;
const canvasSize = 400;

let snake = [{x: 8*box, y: 8*box}];
let direction = "RIGHT";
let food = randomFood();
let score = 0;
let speed = 150;
let game;

let highScore = localStorage.getItem('snakeHighScore') || 0;
scoreEl.textContent = `Score: ${score} | High Score: ${highScore}`;

document.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", restartGame);

// Mobile swipe controls
let touchStartX = 0, touchStartY = 0;
canvas.addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});
canvas.addEventListener("touchend", e => {
  let touchEndX = e.changedTouches[0].clientX;
  let touchEndY = e.changedTouches[0].clientY;
  let dx = touchEndX - touchStartX;
  let dy = touchEndY - touchStartY;
  if(Math.abs(dx) > Math.abs(dy)){
    if(dx > 0 && direction !== "LEFT") direction = "RIGHT";
    if(dx < 0 && direction !== "RIGHT") direction = "LEFT";
  } else {
    if(dy > 0 && direction !== "UP") direction = "DOWN";
    if(dy < 0 && direction !== "DOWN") direction = "UP";
  }
});

function draw(){
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw snake
  for(let i=0; i<snake.length; i++){
    ctx.fillStyle = i===0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Move snake
  let head = {x: snake[0].x, y: snake[0].y};
  if(direction === "LEFT") head.x -= box;
  if(direction === "RIGHT") head.x += box;
  if(direction === "UP") head.y -= box;
  if(direction === "DOWN") head.y += box;

  // Eat food
  if(head.x === food.x && head.y === food.y){
    score++;
    speed = Math.max(50, 150 - score*5); // increase speed
    food = randomFood();
    if(score > highScore){
      highScore = score;
      localStorage.setItem('snakeHighScore', highScore);
    }
  } else {
    snake.pop();
  }

  snake.unshift(head);

  // Update score
  scoreEl.textContent = `Score: ${score} | High Score: ${highScore}`;

  // Check collisions
  if(head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || collision(head, snake)){
    clearInterval(game);
    alert(`Game Over! Your score: ${score}`);
  }
}

function changeDirection(event){
  const key = event.keyCode;
  if(key === 37 && direction !== "RIGHT") direction = "LEFT";
  if(key === 38 && direction !== "DOWN") direction = "UP";
  if(key === 39 && direction !== "LEFT") direction = "RIGHT";
  if(key === 40 && direction !== "UP") direction = "DOWN";
}

function collision(head, array){
  for(let i=1; i<array.length; i++){
    if(head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}

function randomFood(){
  return {
    x: Math.floor(Math.random() * (canvasSize/box)) * box,
    y: Math.floor(Math.random() * (canvasSize/box)) * box
  };
}

function restartGame(){
  snake = [{x: 8*box, y: 8*box}];
  direction = "RIGHT";
  score = 0;
  speed = 150;
  food = randomFood();
  clearInterval(game);
  game = setInterval(draw, speed);
}

game = setInterval(draw, speed);
