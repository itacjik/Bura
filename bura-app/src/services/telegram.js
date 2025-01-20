import { CONFIG } from '../constants/config';

class TelegramService {
    constructor() {
        if (window.Telegram) {
            this.tg = window.Telegram.WebApp;
            this.isInTelegram = true;
        } else {
            // Мок для локальной разработки
            this.tg = {
                ready: () => {},
                expand: () => {},
                close: () => {},
                showAlert: (message) => { console.log('Telegram alert:', message); },
                showConfirm: (message) => { 
                    console.log('Telegram confirm:', message);
                    return Promise.resolve(true);
                },
                sendData: (data) => { console.log('Telegram sendData:', data); },
                initDataUnsafe: {
                    user: {
                        id: 12345,
                        first_name: 'Test',
                        last_name: 'User',
                        username: 'testuser',
                        language_code: 'en'
                    }
                }
            };
            this.isInTelegram = false;
            console.log('Running in development mode with mocked Telegram WebApp');
        }
    }

    init() {
        if (this.isInTelegram) {
            this.tg.ready();
            this.tg.expand();
            this.setThemeParams();
            if (this.tg.BackButton) {
                this.tg.BackButton.show();
            }
        }
    }

    setThemeParams() {
        if (this.isInTelegram) {
            const colorScheme = this.tg.colorScheme || 'light';
            document.documentElement.setAttribute('data-theme', colorScheme);
        }
    }

    // Получить данные пользователя
    getUser() {
        return this.tg.initDataUnsafe?.user;
    }

    // Закрыть приложение
    close() {
        this.tg.close();
    }

    // Показать всплывающее сообщение
    showAlert(message) {
        this.tg.showAlert(message);
    }

    // Показать подтверждение
    showConfirm(message) {
        return this.tg.showConfirm(message);
    }

    // Отправить данные боту
    sendData(data) {
        this.tg.sendData(JSON.stringify(data));
    }
}

export const telegramService = new TelegramService();
