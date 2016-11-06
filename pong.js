
var canvus = document.getElementById("gameCanvus");
let canvusContext = canvus.getContext('2d');

let ballX = 50;
let ballY = 50;

let ballSpeedX = 10;
let ballSpeedY = 4

let paddle1Y = 50;
let paddle2Y = 50;
const paddleHeight = 100;
const paddleThickness = 5;
let framesPerSecond = 30;

function movement() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  
  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX
    } else {
      ballReset();
    }
  }

  if (ballX > canvus.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX
    } else {
      ballReset();
    }
  } 

  if (ballY < 0) {
      ballSpeedY = -ballSpeedY;
  }

  if (ballY > canvus.height) {
    ballSpeedY = -ballSpeedY;
  } 
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
  //left paddle for player
  colorRect(1, paddle1Y, paddleThickness, paddleHeight, 'white');
  //computers paddle
  colorRect(canvus.width - paddleThickness-1, paddle2Y, paddleThickness, paddleHeight, 'white');
  //ball
  drawBall(ballX, ballY, 7, 'white');
  
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
  ballSpeedX = -ballSpeedX;
  ballX = canvus.width/2;
  ballY = canvus.height/2;
}

setInterval(function(){
  movement();
  drawGameBoard();
}, 1000/framesPerSecond);

canvus.addEventListener('mousemove', function(evt) {
  var mousePos = calculateMousePos(evt);
  //paddle1Y = mousePos.y - (paddleHeight/2);
  paddle2Y = mousePos.y - (paddleHeight/2);
  
})



