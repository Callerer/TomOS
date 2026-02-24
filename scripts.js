(() => {
  "use strict";

  const boardEl = document.getElementById("board");
  const statusEl = document.getElementById("status");
  const resetBtn = document.getElementById("resetBtn");

  // Configure AI here
  const HUMAN = "X";
  const AI = "O";
  const AI_DELAY_MS = 250; // small delay so it feels responsive/real

  // 0..8
  let cells = Array(9).fill(null); // "X" | "O" | null
  let current = HUMAN;
  let gameOver = false;
  let aiThinking = false;

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function winningLine(c) {
    const LINES = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, d] of LINES) {
      if (c[a] && c[a] === c[b] && c[a] === c[d]) return [a, b, d];
    }
    return null;
  }

  function winnerSymbol(c) {
    const win = winningLine(c);
    return win ? c[win[0]] : null;
  }

  function isDraw(c) {
    return c.every(v => v !== null) && !winningLine(c);
  }

  function emptyIndices(c) {
    const out = [];
    for (let i = 0; i < c.length; i++) if (c[i] === null) out.push(i);
    return out;
  }

  // --- Minimax AI (unbeatable) ---
  function minimax(board, player) {
    const win = winnerSymbol(board);
    if (win === AI) return { score: 10 };
    if (win === HUMAN) return { score: -10 };
    if (isDraw(board)) return { score: 0 };

    const moves = [];
    const empties = emptyIndices(board);

    for (const idx of empties) {
      const next = board.slice();
      next[idx] = player;

      const result = minimax(next, player === AI ? HUMAN : AI);
      moves.push({ index: idx, score: result.score });
    }

    // choose best move depending on player
    if (player === AI) {
      let best = moves[0];
      for (const m of moves) if (m.score > best.score) best = m;
      return best;
    } else {
      let best = moves[0];
      for (const m of moves) if (m.score < best.score) best = m;
      return best;
    }
  }

  function bestMoveIndex(board) {
    // Small improvement: if multiple best moves exist, minimax can pick the first;
    // that's fine, but we can randomize among equally-best moves if you want later.
    const move = minimax(board, AI);
    return typeof move.index === "number" ? move.index : null;
  }

  function render() {
    boardEl.innerHTML = "";

    for (let i = 0; i < 9; i++) {
      const btn = document.createElement("button");
      btn.className = "cell";
      btn.type = "button";
      btn.dataset.index = String(i);
      btn.textContent = cells[i] ?? "";

      const disableBecauseEnded = gameOver;
      const disableBecauseFilled = cells[i] !== null;
      const disableBecauseAITurn = current === AI || aiThinking;

      btn.disabled = disableBecauseEnded || disableBecauseFilled || disableBecauseAITurn;

      btn.addEventListener("click", onCellClick);
      boardEl.appendChild(btn);
    }

    const win = winnerSymbol(cells);
    if (win) setStatus(`Winner: ${win}`);
    else if (isDraw(cells)) setStatus("Draw!");
    else if (current === AI) setStatus("Robot thinking...");
    else setStatus(`Your turn: ${HUMAN}`);
  }

  function endIfNeeded() {
    const win = winnerSymbol(cells);
    if (win) {
      gameOver = true;
      return true;
    }
    if (isDraw(cells)) {
      gameOver = true;
      return true;
    }
    return false;
  }

  function placeMove(index, symbol) {
    if (cells[index] !== null) return false;
    cells[index] = symbol;
    return true;
  }

  function onCellClick(e) {
    const i = Number(e.currentTarget.dataset.index);
    if (gameOver || aiThinking) return;
    if (current !== HUMAN) return;
    if (cells[i] !== null) return;

    placeMove(i, HUMAN);

    if (endIfNeeded()) {
      render();
      return;
    }

    current = AI;
    render();
    requestAIMove();
  }

  function requestAIMove() {
    if (gameOver) return;

    aiThinking = true;
    render();

    setTimeout(() => {
      if (gameOver) {
        aiThinking = false;
        render();
        return;
      }

      const idx = bestMoveIndex(cells);

      // Fallback (shouldn't happen)
      if (idx === null) {
        aiThinking = false;
        render();
        return;
      }

      placeMove(idx, AI);

      aiThinking = false;

      if (endIfNeeded()) {
        render();
        return;
      }

      current = HUMAN;
      render();
    }, AI_DELAY_MS);
  }

  function reset() {
    cells = Array(9).fill(null);
    current = HUMAN;
    gameOver = false;
    aiThinking = false;
    render();
  }

  resetBtn.addEventListener("click", reset);

  // Initial render
  reset();
})();
