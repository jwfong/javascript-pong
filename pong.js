
var canvus = document.getElementById("gameCanvus");
let canvusContext = canvus.getContext('2d');

let framesPerSecond = 10;
let ballX = 5;
let ballY = 5;
let ballSpeedX = 5;
let ballSpeedY = 4

let paddle1Y = 250;
const paddleHeight = 20

function movement() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  
  if(ballX > canvus.width) {
    ballSpeedX = -ballSpeedX;
  } else if (ballX <= 0) {
      ballSpeedX = -ballSpeedX;
  };

  
  if(ballY > canvus.height) {
    ballSpeedY = -ballSpeedY;
  } else if (ballY <= 0) {
      ballSpeedY = -ballSpeedY;
  };
}

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;

  return {
    x: mouseX,
    y: mouseY
  }
}



function drawGameBoard() {
  colorRect(0, 0, canvus.width, canvus.height, 'black');
  colorRect(1, paddle1Y, 5, 20, 'white');
  drawBall(ballX, ballY, 3, 'white');
  
};

function colorRect(leftX, topY, width, height, color){
  canvusContext.fillStyle = color;
  canvusContext.fillRect(leftX, topY, width, height);
};

function drawBall(centerX, centerY, radius, color) {
  canvusContext.fillStyle = color;
  canvusContext.beginPath();
  canvusContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvusContext.fill();
}

setInterval(function(){
  movement();
  drawGameBoard();
}, 1000/framesPerSecond);

canvus.addEventListener('mousemove', function(evt) {
  var mousePos = calculateMousePos(evt);
  paddle1Y = mousePos.y;
})



