const fs = require('fs');
const path = require('path');

const RANKS = ['A', '10', 'K', 'Q', 'J'];
const SUITS = {
    'hearts': { symbol: '♥', color: '#FF0000' },
    'diamonds': { symbol: '♦', color: '#FF0000' },
    'clubs': { symbol: '♣', color: '#000000' },
    'spades': { symbol: '♠', color: '#000000' }
};

// Читаем шаблон карты
const template = fs.readFileSync(
    path.join(__dirname, '../public/assets/cards/card_template.svg'),
    'utf8'
);

// Создаем директорию для карт, если её нет
const cardsDir = path.join(__dirname, '../public/assets/cards');
if (!fs.existsSync(cardsDir)) {
    fs.mkdirSync(cardsDir, { recursive: true });
}

// Генерируем карты
for (const [suitName, suit] of Object.entries(SUITS)) {
    for (const rank of RANKS) {
        const cardContent = template
            .replace(/{{color}}/g, suit.color)
            .replace(/{{suit}}/g, suit.symbol)
            .replace(/{{rank}}/g, rank);

        const fileName = `${rank.toLowerCase()}_of_${suitName}.svg`;
        fs.writeFileSync(
            path.join(cardsDir, fileName),
            cardContent
        );
    }
}

// Создаем рубашку карты
const backTemplate = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="140" height="190" viewBox="0 0 140 190">
    <!-- Card background -->
    <rect x="5" y="5" width="130" height="180" rx="10" ry="10" fill="#2c3e50" stroke="black" stroke-width="1"/>
    
    <!-- Pattern -->
    <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="10" height="10" fill="#34495e"/>
        <rect x="10" y="10" width="10" height="10" fill="#34495e"/>
    </pattern>
    
    <!-- Pattern fill -->
    <rect x="15" y="15" width="110" height="160" fill="url(#pattern)"/>
    
    <!-- Border decoration -->
    <rect x="10" y="10" width="120" height="170" rx="8" ry="8" fill="none" stroke="#gold" stroke-width="2"/>
</svg>`;

fs.writeFileSync(
    path.join(cardsDir, 'back.svg'),
    backTemplate
);
