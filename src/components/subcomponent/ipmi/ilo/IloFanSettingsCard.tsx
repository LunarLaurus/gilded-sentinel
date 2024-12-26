import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ToastNotification from '../../../message/toast/ToastNotification';
import { API_URL } from '../../../../App';
import { IPv4Address } from '../../../../types/IpmiInterfaces';
import '../../../../styles/ilo/IloFanSettingsCard.css';

interface IloFanSettingsCardProps {
    ip: IPv4Address;
    model: string;
    serial: string;
    iloUuid: string;
}

const IloFanSettingsCard: React.FC<IloFanSettingsCardProps> = ({ ip, model, serial, iloUuid }) => {
    const [fanSpeedSettings, setFanSpeedSettings] = useState({
        selectedOption: 'MIN',
        customFanSpeed: 10,
    });
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        setFanSpeedSettings({ selectedOption: 'MIN', customFanSpeed: 10 });
    }, [ip, model, serial, iloUuid]);

    const updateFanSpeeds = async (fanSpeed: number) => {
        try {
            const { status } = await axios.post(`${API_URL}/ilo/updateFanSpeeds`, {
                iloClientAddress: ip.address,
                updateType: 'BOTH',
                targetFanSpeed: fanSpeed,
            });
            setToastMessage(
                status === 200 ? 'Fan speeds updated successfully!' : 'Failed to update fan speeds.'
            );
        } catch (error) {
            console.error('Error updating fan speeds:', error);
            setToastMessage('Error updating fan speeds.');
        }
    };

    const handleDropdownChange = (value: 'MIN' | 'MAX' | 'CUSTOM') => {
        setFanSpeedSettings((prev) => ({ ...prev, selectedOption: value }));
    };

    const handleCustomFanSpeedChange = (value: number) => {
        setFanSpeedSettings((prev) => ({
            ...prev,
            customFanSpeed: Math.max(5, Math.min(100, value)),
        }));
    };

    const handleUpdateClick = () => {
        const fanSpeed =
            fanSpeedSettings.selectedOption === 'CUSTOM'
                ? fanSpeedSettings.customFanSpeed
                : fanSpeedSettings.selectedOption === 'MIN'
                ? 10
                : 100;
        updateFanSpeeds(fanSpeed);
    };

    return (
        <div className="fan-settings-card">
            <h3>{iloUuid}</h3>
            <p>
                {model}<br />
                Serial Number: {serial}<br />
            </p>
            <select
                value={fanSpeedSettings.selectedOption}
                onChange={(e) =>
                    handleDropdownChange(e.target.value as 'MIN' | 'MAX' | 'CUSTOM')
                }
            >
                <option value="MIN">Minimum (10)</option>
                <option value="MAX">Maximum (100)</option>
                <option value="CUSTOM">Custom</option>
            </select>
            {fanSpeedSettings.selectedOption === 'CUSTOM' ? (
                <input
                    type="number"
                    value={fanSpeedSettings.customFanSpeed}
                    onChange={(e) => handleCustomFanSpeedChange(parseInt(e.target.value) || 5)}
                />
            ) : (
                <input
                    type="number"
                    value=""
                    readOnly
                    disabled
                />
            )}
            <button onClick={handleUpdateClick} className="fan-settings-btn">
                Update
            </button>
            {toastMessage && <ToastNotification message={toastMessage} onClose={() => setToastMessage(null)} />}
        </div>
    );
};

export default IloFanSettingsCard;
