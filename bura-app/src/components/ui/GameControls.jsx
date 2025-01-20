import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/GameControls.module.css';

const GameControls = ({ onMove, onBetIncrease, onSayDoma, onNewGame, gameStatus }) => {
    return (
        <div className={styles.controls}>
            {gameStatus === 'playing' && (
                <>
                    <button className={styles.button} onClick={onMove}>
                        Сделать ход
                    </button>
                    <button className={styles.button} onClick={onBetIncrease}>
                        Поднять ставку
                    </button>
                    <button className={styles.button} onClick={onSayDoma}>
                        Сказать "Дома"
                    </button>
                </>
            )}
            {gameStatus === 'finished' && (
                <button className={styles.button} onClick={onNewGame}>
                    Новая игра
                </button>
            )}
        </div>
    );
};

GameControls.propTypes = {
    onMove: PropTypes.func.isRequired,
    onBetIncrease: PropTypes.func.isRequired,
    onSayDoma: PropTypes.func.isRequired,
    onNewGame: PropTypes.func.isRequired,
    gameStatus: PropTypes.string.isRequired
};

export default GameControls;
