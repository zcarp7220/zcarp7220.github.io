// Initialize canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set initial ball position and speed
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Set initial paddle positions and dimensions
let playerPaddleY = canvas.height / 2 - 50;
let computerPaddleY = canvas.height / 2 - 50;
const paddleWidth = 10;
const paddleHeight = 100;

// Set initial score values
let playerScore = 0;
let computerScore = 0;

// Helper function to draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

// Helper function to draw the paddles
function drawPaddles() {
  // Player paddle
  ctx.fillStyle = "white";
  ctx.fillRect(0, playerPaddleY, paddleWidth, paddleHeight);

  // Computer paddle
  ctx.fillStyle = "white";
  ctx.fillRect(canvas.width - paddleWidth, computerPaddleY, paddleWidth, paddleHeight);
}

// Helper function to update the ball position
function updateBall() {
  // Update X position
  ballX += ballSpeedX;

  // Check for collision with left paddle
  if (ballX <= paddleWidth && ballY >= playerPaddleY && ballY <= playerPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Check for collision with right paddle
  if (ballX >= canvas.width - paddleWidth && ballY >= computerPaddleY && ballY <= computerPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Update Y position
  ballY += ballSpeedY;

  // Check for collision with top wall
  if (ballY <= 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Check for collision with bottom wall
  if (ballY >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Check for ball going out of bounds on left side
  if (ballX <= 0) {
    computerScore++;
    resetBall();
  }

  // Check for ball going out of bounds on right side
  if (ballX >= canvas.width) {
    playerScore++;
    resetBall();
  }
}

// Reset the ball position and speed
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = Math.floor(Math.random() * 10) - 5;
}

// Helper function to update the computer paddle position
function updateComputerPaddle() {
  // Move the paddle toward the ball
  if (computerPaddleY + paddleHeight / 2 < ballY) {
    computerPaddleY += 5;
  } else {
    computerPaddleY -= 5;
  }

  // Prevent the paddle from going out of bounds
  if (computerPaddleY < 0) {
    computerPaddleY = 0;
  }
  if (computerPaddleY + paddleHeight > canvas.height) {
    computerPaddleY = canvas.height - paddleHeight;
  }
}

// Helper function to update the player paddle position
function updatePlayerPaddle() {
  // Move the paddle based on keyboard input
  if (keys.up) {
    playerPaddleY -= 5;
  }
  if (keys.down) {
    playerPaddleY += 5;
  }

  // Prevent the paddle from going out of bounds
  if (playerPaddleY < 0) {
    playerPaddleY = 0;
  }
  if (playerPaddleY + paddleHeight > canvas.height) {
    playerPaddleY = canvas.height - paddleHeight;
  }
}

// Helper function to draw the score
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Player: ${playerScore}`, 20, 30);
  ctx.fillText(`Computer: ${computerScore}`, canvas.width - 160, 30);
}

// Helper function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Helper function to handle keyboard input
const keys = {};
document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});
document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

// Main game loop
function gameLoop() {
  clearCanvas();
  drawBall();
  drawPaddles();
  updateBall();
  updateComputerPaddle();
  updatePlayerPaddle();
  drawScore();
  requestAnimationFrame(gameLoop);
}
gameLoop();
