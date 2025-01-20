import React, { useState, useEffect } from 'react';
import { Stage } from '@pixi/react';
import { useTelegram } from '../hooks/useTelegram';
import { CONFIG } from '../constants/config';
import { Game } from '../game/Game';
import GameTable from './game/GameTable';
import PlayerHand from './game/PlayerHand';
import GameControls from './ui/GameControls';
import GameUI from './ui/GameUI';
import '../styles/variables.css';
import styles from '../styles/App.module.css';

const App = () => {
    const [game] = useState(() => new Game());
    const [gameState, setGameState] = useState({
        playerCards: [],
        opponentCards: [],
        trumpCard: null,
        currentPlayer: 1,
        selectedCards: [],
        currentBet: 1,
        gameStatus: 'waiting',
        winner: null,
        message: ''
    });

    const { user, showAlert } = useTelegram();

    useEffect(() => {
        if (user) {
            startNewGame();
        }
    }, [user]);

    const startNewGame = () => {
        game.startNewGame();
        updateGameState();
    };

    const updateGameState = () => {
        setGameState({
            playerCards: game.getPlayerCards(1),
            opponentCards: game.getPlayerCards(2),
            trumpCard: game.getTrumpCard(),
            currentPlayer: game.getCurrentPlayer(),
            selectedCards: [],
            currentBet: game.getCurrentBet(),
            gameStatus: game.getGameStatus(),
            winner: game.getWinner(),
            message: game.getMessage()
        });
    };

    const handleCardSelect = (cardId) => {
        if (gameState.gameStatus !== 'playing') return;
        game.selectCard(cardId);
        updateGameState();
    };

    const handleMove = () => {
        if (game.makeMove()) {
            updateGameState();
        } else {
            showAlert('Выберите карты для хода');
        }
    };

    const handleBetIncrease = () => {
        if (game.increaseBet()) {
            updateGameState();
        } else {
            showAlert('Достигнута максимальная ставка');
        }
    };

    const handleSayDoma = () => {
        if (game.sayDoma()) {
            updateGameState();
        } else {
            showAlert('Недостаточно очков для победы');
        }
    };

    return (
        <div className={styles.app}>
            <Stage 
                width={window.innerWidth} 
                height={window.innerHeight}
                options={{ 
                    backgroundColor: parseInt(getComputedStyle(document.documentElement)
                        .getPropertyValue('--background-color')
                        .replace('#', '0x')
                    ) 
                }}
            >
                <GameTable 
                    trumpCard={gameState.trumpCard}
                    deck={game.getDeck()}
                />
                <PlayerHand 
                    cards={gameState.playerCards}
                    selectedCards={gameState.selectedCards}
                    onCardSelect={handleCardSelect}
                    position={{ y: window.innerHeight - CONFIG.GAME.CARD_HEIGHT - 20 }}
                />
                <PlayerHand 
                    cards={gameState.opponentCards}
                    isOpponent={true}
                    position={{ y: 50 }}
                />
            </Stage>
            
            <GameUI 
                currentBet={gameState.currentBet}
                currentPlayer={gameState.currentPlayer}
                gameStatus={gameState.gameStatus}
                message={gameState.message}
            />
            
            <GameControls 
                onMove={handleMove}
                onBetIncrease={handleBetIncrease}
                onSayDoma={handleSayDoma}
                onNewGame={startNewGame}
                gameStatus={gameState.gameStatus}
            />
        </div>
    );
};

export default App;
