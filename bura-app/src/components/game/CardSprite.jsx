import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';

// Мапинг значений карт
const RANK_MAP = {
    'A': 'ace',
    '10': '10',
    'K': 'king',
    'Q': 'queen',
    'J': 'jack'
};

// Мапинг мастей
const SUIT_MAP = {
    '♠': 'spades',
    '♣': 'clubs',
    '♥': 'hearts',
    '♦': 'diamonds'
};

const CardSprite = ({ 
    card, 
    x = 0, 
    y = 0, 
    rotation = 0, 
    isBack = false, 
    onClick,
    selected = false,
    scale = 1
}) => {
    const getTexturePath = () => {
        if (isBack) {
            return '/assets/cards/back.svg';
        }
        return `/assets/cards/${RANK_MAP[card.rank]}_${SUIT_MAP[card.suit]}.svg`;
    };

    useEffect(() => {
        // Предзагрузка текстуры
        PIXI.Texture.from(getTexturePath());
    }, []);

    return (
        <Sprite
            image={getTexturePath()}
            x={x}
            y={y}
            rotation={rotation}
            interactive={!!onClick}
            cursor={onClick ? 'pointer' : 'default'}
            anchor={0.5}
            scale={scale}
            alpha={selected ? 0.8 : 1}
            onclick={onClick}
        />
    );
};

CardSprite.propTypes = {
    card: PropTypes.shape({
        rank: PropTypes.string,
        suit: PropTypes.string,
        id: PropTypes.string
    }),
    x: PropTypes.number,
    y: PropTypes.number,
    rotation: PropTypes.number,
    isBack: PropTypes.bool,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    scale: PropTypes.number
};

export default CardSprite;
