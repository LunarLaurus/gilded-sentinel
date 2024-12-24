import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../App';
import callEndpointNoArguments from '../../../hooks/useEndpointNoArguments';
import ToastNotification from '../../../components/message/toast/ToastNotification';
import '../../../styles/ilo/IpmiManagementIlo.css';
import { UnauthenticatedClient } from '../../../types/IloInterfaces';

const IpmiManagementIlo: React.FC = () => {
    const [clients, setClients] = useState<UnauthenticatedClient[]>([]);
    const { data: unauthenticatedClients, loading: loadingUnauthenticated } = callEndpointNoArguments<UnauthenticatedClient[]>('ilo/clients/unauthenticated');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const [fanSpeedSettings, setFanSpeedSettings] = useState<Record<string, { selectedOption: string; customFanSpeed: number }>>({});

    const closeToast = () => setToastMessage(null);

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
        <div className="ipmi-management-container">
            <h1>Integrated Lights Out</h1>
            <div className="ipmi-management-clients-grid">
                {clients
                    .slice()
                    .sort((a, b) => a.serialNumber.localeCompare(b.serialNumber))
                    .map((client) => {
                        const settings = fanSpeedSettings[client.serverId] || { selectedOption: 'MIN', customFanSpeed: 10 };

                        return (
                            <div className="ipmi-management-client-card" key={client.serverId}>
                                <h3 className="ipmi-management-client-title">{client.serverModel}</h3>
                                <p>Hardware Serial Number: {client.serialNumber}</p>
                                <p>Address: {client.iloAddress.address}</p>
                                <p>Version: {client.iloVersion}</p>
                                <p>UUID: {client.iloUuid}</p>
                                <p>Health: {client.healthStatus}</p>
                                <div className="ipmi-management-control">
                                    <select
                                        className="ipmi-management-dropdown"
                                        value={settings.selectedOption}
                                        onChange={(e) => handleDropdownChange(client.serverId, e.target.value)}
                                        title="Select fan speed option: Minimum, Maximum, or Custom"
                                        aria-label="Fan speed options"
                                    >
                                        <option value="MIN">Minimum (10)</option>
                                        <option value="MAX">Maximum (100)</option>
                                        <option value="CUSTOM">Custom</option>
                                    </select>
                                    <input
                                        type="number"
                                        className={`ipmi-management-number-field ${
                                            settings.selectedOption === 'CUSTOM' ? 'visible' : ''
                                        }`}
                                        value={settings.customFanSpeed}
                                        onChange={(e) =>
                                            handleCustomFanSpeedChange(
                                                client.serverId,
                                                Math.max(1, Math.min(100, parseInt(e.target.value) || 1))
                                            )
                                        }
                                        min="5"
                                        max="100"
                                        placeholder="5-100"
                                        title="Enter a custom fan speed between 5 and 100"
                                        aria-label="Custom fan speed input"
                                        aria-describedby={`custom-fan-speed-help-${client.serverId}`}
                                    />
                                    <span id={`custom-fan-speed-help-${client.serverId}`} className="visually-hidden">
                                        Enter a custom fan speed between 5 and 100
                                    </span>
                                    <button
                                        className="ipmi-management-btn"
                                        onClick={() => handleUpdateClick(client.serverId, client.iloAddress.address)}
                                        title="Click to update fan speed"
                                        aria-label="Update fan speed"
                                    >
                                        Update Fan Speed
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
            {toastMessage && <ToastNotification message={toastMessage} onClose={closeToast} />}
        </div>
    );
};

export default IpmiManagementIlo;
