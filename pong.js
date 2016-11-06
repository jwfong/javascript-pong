
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

let player1score = 0;
let player2score = 0;

//set number of scores required to win
const winningScore = 5;

function movement() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  
  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX
      
      let deltaY = ballY - (paddle1Y + paddleHeight/2);
      ballSpeedY = deltaY * 0.35;

    } else {
      player2score++
      ballReset();
    }
  }

  if (ballX > canvus.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX

      let deltaY = ballY - (paddle2Y + paddleHeight/2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player1score++;
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

function computerMovement() {
  let paddle2YCenter = paddle2Y + (paddleHeight/2);

  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
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
  //display player 1 score
  canvusContext.fillText("Play 1 Score: " + player1score, 100, 100);
  //display player 2 score
  canvusContext.fillText("Play 2 Score: " + player2score, canvus.width - 100, 100);
  
  drawNet();
  // colorRect(canvus.width/2, 0, 2, canvus.height,'white');
};


function drawNet() {
  for(var i = 0; i < canvus.height; i += 40){
    colorRect(canvus.width/2-1, i, 2, 20, 'white');
  }
}

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
  if(player1score >= winningScore || player2score >= winningScore) {
    player1score = 0;
    player2score = 0;
  }

  ballSpeedX = -ballSpeedX;
  ballX = canvus.width/2;
  ballY = canvus.height/2;
}

setInterval(function(){
  movement();
  drawGameBoard();
  computerMovement();
}, 1000/framesPerSecond);

canvus.addEventListener('mousemove', function(evt) {
  var mousePos = calculateMousePos(evt);
  paddle1Y = mousePos.y - (paddleHeight/2);
})



