import React from "react";

const PlayerHand = ({ cards, onPlayCard}) => {
    <div className="hand">
        {cards.map((card, index) => (
            <button key={index} onClick={() => onPlayCard(card)}>
                {card.rank} {card.suit}
            </button>
        ))}
    </div>
};

export default PlayerHand;
