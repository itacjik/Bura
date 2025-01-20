import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@pixi/react';
import CardSprite from './CardSprite';

const GameTable = ({ trumpCard, deck }) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    return (
        <Container position={[centerX, centerY]}>
            {/* Отображаем козырную карту */}
            {trumpCard && (
                <CardSprite
                    card={trumpCard}
                    x={-70}
                    y={0}
                    rotation={Math.PI / 2}
                />
            )}
            
            {/* Отображаем колоду */}
            {deck.length > 0 && (
                <CardSprite
                    isBack={true}
                    x={0}
                    y={0}
                />
            )}
        </Container>
    );
};

GameTable.propTypes = {
    trumpCard: PropTypes.shape({
        rank: PropTypes.string,
        suit: PropTypes.string,
        id: PropTypes.string
    }),
    deck: PropTypes.array.isRequired
};

export default GameTable;
