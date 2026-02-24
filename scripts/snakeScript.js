(() => {
  "use strict";

  // ===== Config =====
  const CELL = 10;
  const boardWidth = 300;
  const boardHeight = 300;
  const startX = 200;
  const startY = 100;
  const TICK_MS = 90;

  // ===== DOM / Canvas =====
  let canvas, ctx;
  let currScoreEl, currHighEl;

  // ===== Game state =====
  let snake; // array of {x,y}
  let food;  // {x,y}
  let direction; // {x,y} or null
  let nextDirection; // queued direction
  let score = 0;
  let highScore = 0;

  let timer = null;
  let running = false;

  // ===== Helpers =====
  function clampToGrid(n) {
    return Math.floor(n / CELL) * CELL;
  }

  function sameCell(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  function inBounds(p) {
    return p.x >= 0 && p.x < boardWidth && p.y >= 0 && p.y < boardHeight;
  }

  function isOpposite(a, b) {
    // a and b are direction vectors
    return a && b && a.x === -b.x && a.y === -b.y;
  }

  function updateHUD() {
    // If these elements aren't present, don't crash the game.
    if (currScoreEl) currScoreEl.innerText = "Score: " + score;
    if (currHighEl) currHighEl.innerText = "High Score: " + highScore;
  }

  function computeScore() {
    score = snake.length * 100;
  }

  function randomFoodCell() {
    while (true) {
      const x = clampToGrid(Math.random() * boardWidth);
      const y = clampToGrid(Math.random() * boardHeight);
      const candidate = { x, y };

      let onSnake = false;
      for (let i = 0; i < snake.length; i++) {
        if (sameCell(snake[i], candidate)) {
          onSnake = true;
          break;
        }
      }
      if (!onSnake) return candidate;
    }
  }

  function resetGame() {
    stop();

    snake = [{ x: clampToGrid(startX), y: clampToGrid(startY) }];
    food = randomFoodCell();

    direction = null; // not moving until first key
    nextDirection = null;

    score = 0;
    updateHUD();
    draw();
  }

  function gameOver(message) {
    stop();

    computeScore();
    if (score > highScore) highScore = score;
    updateHUD();

    alert(message + "\nYour score: " + score);

    resetGame();
  }

  function stop() {
    running = false;
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function start() {
    if (running) return;
    running = true;
    tick();
  }

  function setDirection(vec) {
    if (!direction) {
      direction = vec;
      nextDirection = null;
      start();
      return;
    }
    if (!isOpposite(direction, vec)) nextDirection = vec;
  }

  // ===== Input =====
  function onKeyDown(e) {
    // Prevent page scroll with WASD/Space on some pages
    if ([87, 65, 83, 68, 32].includes(e.keyCode)) e.preventDefault();

    const code = e.keyCode;

    if (code === 87) setDirection({ x: 0, y: -CELL }); // W
    else if (code === 83) setDirection({ x: 0, y: CELL }); // S
    else if (code === 65) setDirection({ x: -CELL, y: 0 }); // A
    else if (code === 68) setDirection({ x: CELL, y: 0 }); // D
    else if (code === 32) {
      if (!direction) return;
      if (running) stop();
      else start();
    }
  }

  // ===== Game loop =====
  function tick() {
    if (!running) return;

    if (nextDirection && !isOpposite(direction, nextDirection)) {
      direction = nextDirection;
    }
    nextDirection = null;

    if (!direction) {
      draw();
      timer = setTimeout(tick, TICK_MS);
      return;
    }

    const head = snake[0];
    const newHead = { x: head.x + direction.x, y: head.y + direction.y };

    if (!inBounds(newHead)) {
      gameOver("You went out of bounds! Game over.");
      return;
    }

    // Self collision
    for (let i = 0; i < snake.length; i++) {
      if (sameCell(snake[i], newHead)) {
        gameOver("You ate your tail! Game over.");
        return;
      }
    }

    snake.unshift(newHead);

    if (sameCell(newHead, food)) {
      food = randomFoodCell();
    } else {
      snake.pop();
    }

    computeScore();
    updateHUD();
    draw();

    timer = setTimeout(tick, TICK_MS);
  }

  // ===== Rendering =====
  function draw() {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // food
    ctx.fillStyle = "#00ff15";
    ctx.fillRect(food.x, food.y, CELL, CELL);

    // snake
    for (let i = 0; i < snake.length; i++) {
      const s = snake[i];
      ctx.fillStyle = "#4a4a4a";
      ctx.fillRect(s.x, s.y, CELL, CELL);
      ctx.fillStyle = "#00ff15";
      ctx.fillRect(s.x + 0.5, s.y + 0.5, CELL - 1, CELL - 1);
    }
  }

  // ===== Init =====
  function init() {
    canvas = document.getElementById("snakeCanvas");
    if (!canvas) {
      // If this logs, your script is loading before the canvas exists
      console.error("snake.js: #snakeCanvas not found");
      return;
    }

    canvas.width = boardWidth;
    canvas.height = boardHeight;
    ctx = canvas.getContext("2d");

    // These are optional; your provided HTML doesn't include them.
    currScoreEl = document.getElementById("currScore");
    currHighEl = document.getElementById("currHigh");

    document.addEventListener("keydown", onKeyDown, false);

    resetGame();
  }

  // Make init callable if you want to call it manually
  window.snakeGame = { init };

  // Auto-init after DOM is ready (works whether script is in <head> or bottom)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
