(function ($) {
  const pingpong = {
    paddleA: {
      x: 60,
      y: 100,
      width: 20,
      height: 70,
      speed: 15,
      direction: 1,
    },
    paddleB: { x: 500, y: 100, width: 20, height: 70 },
    ball: {
      speed: 15,
      x: 100,
      y: 100,
      directionX: 1,
      directionY: -1,
    },
    playground: {
      offSetTop: $("#playground").offset().top,
      height: $("#playground").height(),
      width: $("#playground").width(),
    },
  };
  function renderPaddles() {
    $("#paddleB").css("top", pingpong.paddleB.y);
    $("#paddleA").css("top", pingpong.paddleA.y);
    $("#paddleB").css("left", pingpong.paddleB.x);
    $("#paddleA").css("left", pingpong.paddleA.x);
  }
  function renderBall() {
    $("#ball").css("top", pingpong.ball.y);
    $("#ball").css("left", pingpong.ball.x);
  }
  function hitsPaddle(paddle) {
    ballX = pingpong.ball.x + pingpong.ball.speed * pingpong.ball.directionX;
    ballY = pingpong.ball.y + pingpong.ball.speed * pingpong.ball.directionY;

    if (
      ballY >= paddle.y - 20 &&
      ballY <= paddle.y + 80 &&
      ballX >= paddle.x - 20 &&
      ballX <= paddle.x + 30
    ) {
      {
        return true;
      }
    } else false;
  }
  function ballHitsTopBottom() {
    var y = pingpong.ball.y + pingpong.ball.speed * pingpong.ball.directionY;
    if (y < 0 || y > pingpong.playground.height - 20) return true;
    else return false;
  }

  function ballHitsRightWall() {
    var x = pingpong.ball.x + pingpong.ball.speed * pingpong.ball.directionX;
    if (x > pingpong.playground.width + 180) return true;
    else return false;
  }

  function ballHitsLeftWall() {
    var x = pingpong.ball.x + pingpong.ball.speed * pingpong.ball.directionX;
    if (x < 0) return true;
    else false;
  }
  function playerAWin() {
    ball.directionX = -ball.directionX;
    ball.x = pingpong.playground.width / 2 + 200;
  }
  function playerBWin() {
    ball.directionX = -ball.directionX;
    ball.x = pingpong.playground.width / 2;
  }
  function moveBall() {
    ball = pingpong.ball;
    if (ballHitsTopBottom()) {
      ball.directionY = -ball.directionY;
    }
    if (hitsPaddle(pingpong.paddleB) || hitsPaddle(pingpong.paddleA)) {
      ball.directionX = -ball.directionX;
      // ball.directionY = -ball.directionY;
    }
    if (ballHitsRightWall()) {
      playerAWin();
    }
    if (ballHitsLeftWall()) {
      playerBWin();
    }
    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;
    renderBall();
  }
  function moveEnemyPaddle() {
    var speed = pingpong.paddleA.speed;
    var direction = pingpong.paddleA.direction;
    if (pingpong.paddleA.y <= 0 || pingpong.paddleA.y >= 200) {
      pingpong.paddleA.direction = -direction;
    }
    pingpong.paddleA.y += pingpong.paddleA.speed * pingpong.paddleA.direction;
  }
  function handleMouseInputs() {
    $("#playground").mouseenter(function () {
      pingpong.paused = false;
    });
    $("#playground").mouseleave(function () {
      pingpong.isPaused = true;
    });
    $("#playground").mousemove(function (e) {
      if (
        e.pageY > pingpong.playground.offSetTop + 50 &&
        e.pageY < pingpong.playground.offSetTop + 250
      ) {
        pingpong.paddleB.y = e.pageY - pingpong.playground.offSetTop - 50;
      }
    });
  }
  function render() {
    renderPaddles();

    window.requestAnimationFrame(render);
  }
  function init() {
    pingpong.timer = setInterval(() => {
      moveBall();
      moveEnemyPaddle();
    }, 1000 / 120);
    render();
    handleMouseInputs();
  }
  init();
})(jQuery);
