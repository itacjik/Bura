import React from "react";
import PlayerHand from "./PlayerHand";

const GameBoard = ({ trumpCard, playerHands, currentPlayer, onPlayCard }) => {
  <div className="game-board">
    <h2>
      Козырная карта:{" "}
      {trumpCard ? `${trumpCard.rank} ${trumpCard.suit}` : "Не определена"}
    </h2>
    <div className="player-area">
      <h3>Игрок 1</h3>
      <PlayerHand cards={playerHands[0]} onPlayCard={onPlayCard} />
    </div>
    <div className="player-area">
      <h3>Игрок 2</h3>
      <PlayerHand cards={playerHands[1]} onPlayCard={onPlayCard} />
    </div>
  </div>;
};

export default GameBoard;
