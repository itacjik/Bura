import React, { useState, useEffect } from 'react';
import BuraGame from '../game/BuraGame';
import './BuraGame.css';

const game = new BuraGame();

const BuraGameComponent = () => {
    const [gameState, setGameState] = useState({
        player1Cards: [],
        player2Cards: [],
        trumpCard: null,
        currentPlayer: 1,
        selectedCards: [],
        currentBet: 1,
        gameStatus: 'waiting', // waiting, playing, finished
        winner: null,
        message: ''
    });

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        game.reset();
        game.dealInitialCards();
        
        setGameState({
            player1Cards: [...game.player1Cards],
            player2Cards: [...game.player2Cards],
            trumpCard: game.trumpCard,
            currentPlayer: 1,
            selectedCards: [],
            currentBet: 1,
            gameStatus: 'playing',
            winner: null,
            message: ''
        });
    };

    const handleCardSelect = (card, index) => {
        if (gameState.gameStatus !== 'playing') return;
        
        const newSelectedCards = [...gameState.selectedCards];
        const cardIndex = newSelectedCards.findIndex(c => c.toString() === card.toString());
        
        if (cardIndex === -1) {
            // Если карта той же масти что и уже выбранные
            if (newSelectedCards.length === 0 || 
                newSelectedCards[0].suit === card.suit) {
                newSelectedCards.push(card);
            }
        } else {
            newSelectedCards.splice(cardIndex, 1);
        }
        
        setGameState(prev => ({
            ...prev,
            selectedCards: newSelectedCards
        }));
    };

    const handleMove = () => {
        if (gameState.selectedCards.length === 0) return;
        
        // Здесь будет логика хода
        // TODO: Реализовать логику хода
    };

    const handleBetIncrease = () => {
        if (game.increaseBet()) {
            setGameState(prev => ({
                ...prev,
                currentBet: game.currentBet
            }));
        }
    };

    const handleSayDoma = () => {
        const result = game.sayDoma(gameState.currentPlayer);
        setGameState(prev => ({
            ...prev,
            gameStatus: 'finished',
            winner: result.winner,
            message: `Игрок ${result.winner} выиграл ${result.points} очков!`
        }));
    };

    return (
        <div className="bura-game">
            <div className="game-info">
                <div>Текущая ставка: {gameState.currentBet}</div>
                <div>Ход игрока: {gameState.currentPlayer}</div>
            </div>
            
            <div className="player2-hand">
                {gameState.player2Cards.map((card, index) => (
                    <div key={index} className="card back" />
                ))}
            </div>
            
            <div className="game-center">
                <div className="trump-card">
                    {gameState.trumpCard && (
                        <div className="card">
                            {gameState.trumpCard.toString()}
                        </div>
                    )}
                </div>
            </div>
            
            <div className="player1-hand">
                {gameState.player1Cards.map((card, index) => (
                    <div 
                        key={index} 
                        className={`card ${
                            gameState.selectedCards.includes(card) ? 'selected' : ''
                        }`}
                        onClick={() => handleCardSelect(card, index)}
                    >
                        {card.toString()}
                    </div>
                ))}
            </div>
            
            <div className="game-controls">
                <button onClick={handleMove}>Сделать ход</button>
                <button onClick={handleBetIncrease}>Повысить ставку</button>
                <button onClick={handleSayDoma}>Дома</button>
                <button onClick={startNewGame}>Новая игра</button>
            </div>
            
            {gameState.message && (
                <div className="game-message">{gameState.message}</div>
            )}
        </div>
    );
};

export default BuraGameComponent;
