class Card {
    constructor(rank, suit, id) {
        this.rank = rank;
        this.suit = suit;
        this.id = id;
    }

    get points() {
        const pointsMap = {
            'A': 11,
            '10': 10,
            'K': 4,
            'Q': 3,
            'J': 2
        };
        return pointsMap[this.rank];
    }
}

export class Game {
    constructor() {
        this.ranks = ['A', '10', 'K', 'Q', 'J'];
        this.suits = ['♠', '♣', '♥', '♦'];
        this.reset();
    }

    reset() {
        this.deck = [];
        this.player1Cards = [];
        this.player2Cards = [];
        this.trumpCard = null;
        this.trumpSuit = null;
        this.currentPlayer = 1;
        this.selectedCards = [];
        this.currentBet = 1;
        this.gameStatus = 'waiting';
        this.winner = null;
        this.message = '';
        this.takenCards = { 1: [], 2: [] };
    }

    startNewGame() {
        this.reset();
        this.createDeck();
        this.shuffleDeck();
        this.dealInitialCards();
        this.gameStatus = 'playing';
    }

    createDeck() {
        let id = 1;
        for (let suit of this.suits) {
            for (let rank of this.ranks) {
                this.deck.push(new Card(rank, suit, id++));
            }
        }
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    dealInitialCards() {
        for (let i = 0; i < 3; i++) {
            this.player1Cards.push(this.deck.pop());
            this.player2Cards.push(this.deck.pop());
        }
        this.trumpCard = this.deck.pop();
        this.trumpSuit = this.trumpCard.suit;
    }

    getPlayerCards(playerNumber) {
        return playerNumber === 1 ? this.player1Cards : this.player2Cards;
    }

    getTrumpCard() {
        return this.trumpCard;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    getCurrentBet() {
        return this.currentBet;
    }

    getGameStatus() {
        return this.gameStatus;
    }

    getWinner() {
        return this.winner;
    }

    getMessage() {
        return this.message;
    }

    getDeck() {
        return this.deck;
    }

    selectCard(cardId) {
        const playerCards = this.currentPlayer === 1 ? this.player1Cards : this.player2Cards;
        const card = playerCards.find(c => c.id === cardId);
        
        if (!card) return false;

        const cardIndex = this.selectedCards.findIndex(c => c.id === cardId);
        if (cardIndex === -1) {
            // Если карта той же масти что и уже выбранные
            if (this.selectedCards.length === 0 || 
                this.selectedCards[0].suit === card.suit) {
                this.selectedCards.push(card);
            }
        } else {
            this.selectedCards.splice(cardIndex, 1);
        }
        
        return true;
    }

    makeMove() {
        if (this.selectedCards.length === 0) return false;

        const currentPlayerCards = this.currentPlayer === 1 ? this.player1Cards : this.player2Cards;
        
        // Удаляем сыгранные карты из руки
        for (const card of this.selectedCards) {
            const index = currentPlayerCards.findIndex(c => c.id === card.id);
            if (index !== -1) {
                currentPlayerCards.splice(index, 1);
            }
        }

        // Добираем карты
        this.drawCards();

        // Переход хода
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.selectedCards = [];

        return true;
    }

    drawCards() {
        while (this.player1Cards.length < 3 && this.deck.length > 0) {
            this.player1Cards.push(this.deck.pop());
        }
        while (this.player2Cards.length < 3 && this.deck.length > 0) {
            this.player2Cards.push(this.deck.pop());
        }
    }

    increaseBet() {
        const betSequence = [1, 2, 3, 4, 5, 6]; // Дави, Се, Чари, Панджи, Шаши
        const currentIndex = betSequence.indexOf(this.currentBet);
        if (currentIndex < betSequence.length - 1) {
            this.currentBet = betSequence[currentIndex + 1];
            return true;
        }
        return false;
    }

    sayDoma() {
        const playerCards = this.currentPlayer === 1 ? this.takenCards[1] : this.takenCards[2];
        const points = playerCards.reduce((sum, card) => sum + card.points, 0);

        if (points >= 31) {
            this.gameStatus = 'finished';
            this.winner = this.currentPlayer;
            this.message = `Игрок ${this.currentPlayer} выиграл ${this.currentBet} очков!`;
            return true;
        } else {
            this.gameStatus = 'finished';
            this.winner = this.currentPlayer === 1 ? 2 : 1;
            this.message = `Игрок ${this.winner} выиграл ${this.currentBet} очков!`;
            return true;
        }
    }
}
