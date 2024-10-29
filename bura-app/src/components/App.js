import React, { useState, useEffect } from "react";
import Desc from "./Desk";
import GameBoard from "./GameBoard";
import PlayerHand from "./PlayerHand";
import ScoreBoard from "./ScoreBoard";
import Timer from "./Timer";

function App() {
  const [deck, setDeck] = useState([]);
  const [trumpCard, setTrumpCard] = useState(null); // Козырная карта
  const [playerHands, setPlayerHands] = useState([[], []]); // Карты игроков
  const [currentPlayer, setCurrentPlayer] = useState(0); // Чей сейчас ход
  const [scores, setScores] = useState([0, 0]); // Очки
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    const shuffledDesk = shuffleDesk();
    setDeck(shuffledDesk);
    setPlayerHands([shuffledDesk.splice(0, 3), shuffledDesk.splice(0, 3)]);
    setTrumpCard(shuffledDesk.pop());
    setIsGameStarted(true);
  };

  const shuffleDesk = () => {
    const suits = ["♠", "♣", "♥", "♦"];
    const values = [
      { rank: "Туз", value: "11" },
      { rank: "10", value: "10" },
      { rank: "Король", value: "4" },
      { rank: "Дама", value: "3" },
      { rank: "Валет", value: "2" },
    ];
    const desk = suits.flatMap((suit) =>
      values.map((value) => ({ ...value, suit }))
    );
    return desk.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="App">
      <h1>Игра "Бура"</h1>
      <button onClick={startGame}>Начать игру</button>
      <ScoreBoard scores={scores} />
      <Timer currentPlayer={currentPlayer} />
      <GameBoard
        trumpCard={trumpCard}
        playerHands={playerHands}
        currentPlayer={currentPlayer}
        onPlayCard={() => {}} // Обработчик хода
      />
    </div>
  );
}

export default App;
