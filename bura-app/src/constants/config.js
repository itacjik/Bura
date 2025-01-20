export const CONFIG = {
    TELEGRAM: {
        BOT_TOKEN: process.env.REACT_APP_TG_BOT_TOKEN,
    },
    GAME: {
        MIN_PLAYERS: parseInt(process.env.REACT_APP_GAME_MIN_PLAYERS || '2'),
        MAX_PLAYERS: parseInt(process.env.REACT_APP_GAME_MAX_PLAYERS || '2'),
        WIN_POINTS: parseInt(process.env.REACT_APP_GAME_WIN_POINTS || '31'),
        BET_NAMES: {
            1: '',
            2: 'Дави',
            3: 'Се',
            4: 'Чари',
            5: 'Панджи',
            6: 'Шаши'
        }
    },
    API: {
        BASE_URL: process.env.REACT_APP_API_URL,
        WS_URL: process.env.REACT_APP_WS_URL
    },
    ENV: process.env.REACT_APP_ENV || 'development'
};
