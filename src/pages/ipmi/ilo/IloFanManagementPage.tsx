import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../App';
import Navbar from '../../../components/navigation/Navbar';
import callEndpointNoArguments from '../../../hooks/useEndpointNoArguments';
import ToastNotification from '../../../components/message/toast/ToastNotification';
import { UnauthenticatedClient } from '../../../types/IloInterfaces';

const IloFanManagementPage: React.FC = () => {
    const tabs = [
        { label: 'Overview', path: '/ipmi/ilo' },
        { label: 'Fan Settings', path: '/ipmi/ilo/fan' },
    ];

    const [clients, setClients] = useState<UnauthenticatedClient[]>([]);
    const { data: unauthenticatedClients, loading: loadingUnauthenticated } = callEndpointNoArguments<UnauthenticatedClient[]>('ilo/clients/unauthenticated');
    const [fanSpeedSettings, setFanSpeedSettings] = useState<Record<string, { selectedOption: string; customFanSpeed: number }>>({});
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        if (unauthenticatedClients) {
            setClients(unauthenticatedClients);

            const initialSettings = unauthenticatedClients.reduce((acc, client) => {
                acc[client.serverId] = { selectedOption: 'MIN', customFanSpeed: 10 };
                return acc;
            }, {} as Record<string, { selectedOption: string; customFanSpeed: number }>);
            setFanSpeedSettings(initialSettings);
        }
    }, [unauthenticatedClients]);

    const closeToast = () => setToastMessage(null);

    const updateFanSpeeds = async (iloClientAddress: string, targetFanSpeed: number) => {
        try {
            const { status } = await axios.post(`${API_URL}/ilo/updateFanSpeeds`, {
                iloClientAddress,
                updateType: 'BOTH',
                targetFanSpeed,
            });
            setToastMessage(status === 200 ? 'Fan speeds updated successfully!' : 'Failed updating fan speeds!');
        } catch (error) {
            console.error('Error updating fan speeds:', error);
            setToastMessage('Error updating fan speeds!');
        }
    };

    const handleDropdownChange = (serverId: string, value: string) => {
        setFanSpeedSettings((prevSettings) => ({
            ...prevSettings,
            [serverId]: { ...prevSettings[serverId], selectedOption: value },
        }));
    };

    const handleCustomFanSpeedChange = (serverId: string, value: number) => {
        setFanSpeedSettings((prevSettings) => ({
            ...prevSettings,
            [serverId]: { ...prevSettings[serverId], customFanSpeed: value },
        }));
    };

    const handleUpdateClick = (serverId: string, iloClientAddress: string) => {
        const settings = fanSpeedSettings[serverId];
        const fanSpeed =
            settings.selectedOption === 'CUSTOM' ? settings.customFanSpeed : settings.selectedOption === 'MIN' ? 10 : 100;
        updateFanSpeeds(iloClientAddress, fanSpeed);
    };

    if (loadingUnauthenticated) {
        return <div>Loading clients...</div>;
    }

    return (
        <div className="fan-settings-container">
            <Navbar tabs={tabs} />
            <h1>Fan Settings</h1>
            <div className="fan-settings-grid">
                {clients.map((client) => {
                    const settings = fanSpeedSettings[client.serverId] || { selectedOption: 'MIN', customFanSpeed: 10 };
                    return (
                        <div key={client.serverId} className="fan-settings-card">
                            <h3>{client.serverModel}</h3>
                            <p>Serial Number: {client.serialNumber}</p>
                            <select
                                value={settings.selectedOption}
                                onChange={(e) => handleDropdownChange(client.serverId, e.target.value)}
                            >
                                <option value="MIN">Minimum (10)</option>
                                <option value="MAX">Maximum (100)</option>
                                <option value="CUSTOM">Custom</option>
                            </select>
                            {settings.selectedOption === 'CUSTOM' && (
                                <input
                                    type="number"
                                    value={settings.customFanSpeed}
                                    onChange={(e) =>
                                        handleCustomFanSpeedChange(
                                            client.serverId,
                                            Math.max(5, Math.min(100, parseInt(e.target.value) || 5))
                                        )
                                    }
                                />
                            )}
                            <button onClick={() => handleUpdateClick(client.serverId, client.iloAddress.address)}>
                                Update
                            </button>
                        </div>
                    );
                })}
            </div>
            {toastMessage && <ToastNotification message={toastMessage} onClose={closeToast} />}
        </div>
    );
};

export default IloFanManagementPage;
