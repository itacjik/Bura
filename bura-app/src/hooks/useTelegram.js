import { useEffect, useState } from 'react';
import { telegramService } from '../services/telegram';

export const useTelegram = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Инициализация Telegram Mini App
        telegramService.init();
        
        // Получаем данные пользователя
        const userData = telegramService.getUser();
        if (userData) {
            setUser(userData);
        }
    }, []);

    return {
        user,
        showAlert: telegramService.showAlert.bind(telegramService),
        showConfirm: telegramService.showConfirm.bind(telegramService),
        sendData: telegramService.sendData.bind(telegramService),
        close: telegramService.close.bind(telegramService)
    };
};
