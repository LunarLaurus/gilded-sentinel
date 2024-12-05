import { useState } from 'react';
import { API_URL } from '../../../App';
import { Client } from '../../../types/ClientInterfaces';
import axios from 'axios';
import NotificationModal from '../../message/modal/NotificationModal';
import ToastNotification from '../../message/toast/ToastNotification';

interface FanSpeedControlProps {
    client: Client;
}

const FanSpeedControl: React.FC<FanSpeedControlProps> = ({ client }) => {
    const [updateType, setUpdateType] = useState('MAX');
    const [targetFanSpeed, setTargetFanSpeed] = useState<number | ''>(50);
    const [loading, setLoading] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const closeToast = () => {
        setToastMessage(null);
    };

    const updateFanSpeed = async () => {
        if (targetFanSpeed === '') {
            setNotificationMessage('Please enter a valid fan speed.');
            return;
        }

        setLoading(true);
        try {
            const { status } = await axios.post(`${API_URL}/ipmi/ilo/updateFanSpeeds`, {
                clientId: client.name,
                updateType,
                targetFanSpeed,
            });

            setToastMessage(status === 200 ? 'Fan speed updated successfully!' : 'Error updating fan speed');
        } catch (error) {
            console.error('Error updating fan speed:', error);
            setToastMessage('Failed to update fan speed');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const closeNotification = () => {
        setNotificationMessage(null);
    };

    return (
        <div>
            <h2>Fan Speed Control</h2>
            <div>
                <label>
                    Client ID: <b>{client.name}</b>
                </label>
            </div>
            <div>
                <label>
                    Update Type:
                    <select value={updateType} onChange={(e) => setUpdateType(e.target.value)}>
                        <option value="MAX">Max</option>
                        <option value="MIN">Min</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Target Fan Speed:
                    <input
                        type="number"
                        value={targetFanSpeed}
                        min={5}
                        max={100}
                        onChange={(e) => setTargetFanSpeed(e.target.value ? Number(e.target.value) : '')}
                    />
                </label>
            </div>
            <button onClick={updateFanSpeed} disabled={loading}> {/* Disable button if loading */}
                {loading ? 'Updating...' : 'Update Fan Speeds'}
            </button>
            {notificationMessage && (
                <NotificationModal message={notificationMessage} onClose={closeNotification} />
            )}
            {toastMessage && (
                <ToastNotification message={toastMessage} onClose={closeToast} />
            )}
        </div>
    );
};

export default FanSpeedControl;