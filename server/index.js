const express = require("express");
const app = express;
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/game/start', (req, res) => {
    const gameData = initializeGame();
    res.json(gameData);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function initializeGame() {

  // Логика для генерации начального состояния игры
  return { players: [], cards: [] };
}

