
var canvus = document.getElementById("gameCanvus");
let canvusContext = canvus.getContext('2d');

let ballX = 50;
let ballY = 50;

let ballSpeedX = 5;
let ballSpeedY = 4

let paddle1Y = 50;
const paddleHeight = 100;

let framesPerSecond = 30;

function movement() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  
  if (ballX > canvus.width) {
    ballSpeedX = -ballSpeedX;
  } 
  if (ballX < 0) {
      ballSpeedX = -ballSpeedX;
  };

  if (ballY > canvus.height) {
    ballSpeedY = -ballSpeedY;
  } 
  if (ballY < 0) {
      ballSpeedY = -ballSpeedY;
  };
}

function calculateMousePos(evt) {
  var rect = canvus.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;

  return {
    x: mouseX,
    y: mouseY
  }
}



function drawGameBoard() {
  //canus board
  colorRect(0, 0, canvus.width, canvus.height, 'black');
  //left paddle
  colorRect(1, paddle1Y, 5, paddleHeight, 'white');
  //ball
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

function ballReset() {
  ballX = canvus.width/2;
  ballY = canvus.height/2;
}

setInterval(function(){
  movement();
  drawGameBoard();
}, 1000/framesPerSecond);

canvus.addEventListener('mousemove', function(evt) {
  var mousePos = calculateMousePos(evt);
  paddle1Y = mousePos.y - (paddleHeight/2);
  
})



