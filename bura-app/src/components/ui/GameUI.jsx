import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/GameUI.module.css';

const GameUI = ({ 
    currentBet, 
    currentPlayer, 
    gameStatus, 
    message 
}) => {
    const getBetName = (bet) => {
        const betNames = {
            1: '',
            2: 'Дави',
            3: 'Се',
            4: 'Чари',
            5: 'Панджи',
            6: 'Шаши'
        };
        return betNames[bet] || '';
    };

    return (
        <div className={styles.ui}>
            <div className={styles.info}>
                <div className={styles.bet}>
                    Ставка: {getBetName(currentBet)} ({currentBet})
                </div>
                <div className={styles.player}>
                    Ход игрока: {currentPlayer}
                </div>
            </div>
            
            {message && (
                <div className={styles.message}>
                    {message}
                </div>
            )}
            
            {gameStatus === 'finished' && (
                <div className={styles.overlay}>
                    <div className={styles.gameOver}>
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
};

GameUI.propTypes = {
    currentBet: PropTypes.number.isRequired,
    currentPlayer: PropTypes.number.isRequired,
    gameStatus: PropTypes.string.isRequired,
    message: PropTypes.string
};

export default GameUI;
