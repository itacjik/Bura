import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@pixi/react';
import CardSprite from './CardSprite';

const PlayerHand = ({ 
    cards, 
    selectedCards = [], 
    onCardSelect, 
    position = { x: 0, y: 0 }, 
    isOpponent = false 
}) => {
    const spacing = 40; // Расстояние между картами
    
    return (
        <Container position={[window.innerWidth / 2 + (position.x || 0), position.y || 0]}>
            {cards.map((card, index) => {
                const isSelected = selectedCards.includes(card.id);
                const x = (index - cards.length / 2) * spacing;
                
                return (
                    <CardSprite
                        key={card.id}
                        card={card}
                        x={x}
                        y={isSelected ? -20 : 0}
                        isBack={isOpponent}
                        onClick={isOpponent ? undefined : () => onCardSelect(card.id)}
                    />
                );
            })}
        </Container>
    );
};

PlayerHand.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            rank: PropTypes.string.isRequired,
            suit: PropTypes.string.isRequired
        })
    ).isRequired,
    selectedCards: PropTypes.arrayOf(PropTypes.string),
    onCardSelect: PropTypes.func,
    position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    isOpponent: PropTypes.bool
};

export default PlayerHand;
