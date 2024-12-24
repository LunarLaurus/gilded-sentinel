import React, { useEffect, useState } from 'react';

interface ToastNotificationProps {
    message: string;
    duration?: number;
    onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message, duration = 3000, onClose }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(onClose, 1000);
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration, onClose]);

    return (
        <div className={`toast-notification ${fadeOut ? 'fade-out' : ''}`}>
            {message}
        </div>
    );
};

export default ToastNotification;
