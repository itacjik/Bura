import React, { useEffect, useState } from "react";

const Timer = ({ currentPlayer }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    setTimeLeft(30);
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [currentPlayer]);

  return (
    <div className="timer">
      <p>Время на ход: {timeLeft} секунд</p>
    </div>
  );
};

export default Timer;
