import React from "react";

const ScoreBoard = ({ scores }) => {
  <div className="score-board">
    <h2>Очки</h2>
    <p>Игрок 1: {scores[0]}</p>
    <p>Игрок 2: {scores[1]}</p>
  </div>;
};

export default ScoreBoard;
