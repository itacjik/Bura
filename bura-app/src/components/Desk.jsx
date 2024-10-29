export const initializeDeck = () => {
  const suits = ["♠", "♣", "♥", "♦"];
  const values = [
    { rank: "Туз", value: 11 },
    { rank: "10", value: 10 },
    { rank: "Король", value: 4 },
    { rank: "Дама", value: 3 },
    { rank: "Валет", value: 2 },
  ];

  const deck = suits.flatMap((suit) =>
    values.map((value) => ({ ...value, suit }))
  );
  return deck.sort(() => Math.random() - 0.5);
};
