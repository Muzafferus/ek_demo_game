// Kətanı və konteksti əldə edin
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Kətanın ölçülərini təyin edin
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Obyektləri və dəyişənləri müəyyənləşdirin
let ball = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  radius: 30,
  dx: 0,
  dy: 0,
  kicked: false
};

// Ekrana toxunma və ya klik hadisələrini dinləyin
canvas.addEventListener('click', kickBall);

function kickBall() {
  if (!ball.kicked) {
    ball.dy = -15; // Topun başlanğıc sürəti
    ball.kicked = true;
  }
}

function drawBall() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = '#ffffff'; // Topun rəngi
  context.fill();
  context.closePath();
}

function update() {
  if (ball.kicked) {
    ball.dy += 0.5; // Qravitasiya təsiri
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height) {
      ball.y = canvas.height - ball.radius;
      ball.dy = 0;
      ball.kicked = false;

      // EKToken qazanın və botla əlaqə qurun
      earnEKToken();
    }
  }

  // Ekranı təmizləyin və topu çəkin
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  requestAnimationFrame(update);
}

function earnEKToken() {
  // Telegram Web App ilə botla əlaqə qurun
  Telegram.WebApp.sendData('earn_ektoken');
}

// Oyunu başlatın
update();
