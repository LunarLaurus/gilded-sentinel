import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../App';
import callEndpointNoArguments from '../../../hooks/useEndpointNoArguments';
import ToastNotification from '../../../components/message/toast/ToastNotification';
import '../../../styles/ilo/IpmiManagementIlo.css';

interface IpAddress {
    octets: number[];
    address: string;
}

interface Nic {
    port: number;
    description: string;
    location: string;
    mac: string;
    ip: IpAddress | null;
    status: string;
}

interface UnauthenticatedClient {
    iloAddress: IpAddress;
    serialNumber: string;
    serverModel: string;
    serverId: string;
    serverUuid: string;
    productId: string;
    iloText: string;
    iloVersion: string;
    iloFwBuildDate: string;
    iloSerialNumber: string;
    iloUuid: string;
    healthStatus: number;
    nics: Nic[];
    lastUpdateTime: number;
    timeBetweenUpdates: number;
}

interface IloFanSpeedUpdateRequestDto {
    clientId: string;
    updateType: string;
    targetFanSpeed: number;
}

const IpmiManagementIlo: React.FC = () => {
    const [clients, setClients] = useState<UnauthenticatedClient[]>([]);
    const { data: unauthenticatedClients, loading: loadingUnauthenticated } = callEndpointNoArguments<UnauthenticatedClient[]>('ilo/clients/unauthenticated');

    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const closeToast = () => {
        setToastMessage(null);
    };
    useEffect(() => {
        if (unauthenticatedClients) {
            setClients(unauthenticatedClients);
        }
    }, [unauthenticatedClients]);

    const updateFanSpeeds = async (clientId: string, updateType: string, targetFanSpeed: number) => {
        const fanSpeedMessage: IloFanSpeedUpdateRequestDto = {
            clientId,
            updateType,
            targetFanSpeed,
        };

        try {
            const { status } = await axios.post(`${API_URL}/ilo/updateFanSpeeds`, fanSpeedMessage);
            setToastMessage(status === 200 ? 'Fan speeds updated successfully!' : 'Error updating fan speeds!');
        } catch (error) {
            console.error('Error updating fan speeds:', error);
            setToastMessage('Failed to update fan speeds!');
        }
    };

    if (loadingUnauthenticated) {
        return <div>Loading clients...</div>;
    }

    return (
        <div className="ipmi-management-container">
            <h1>Integrated Lights Out</h1>
            <div className="ipmi-management-clients-grid">
                {clients
                .slice() // Create a shallow copy to avoid mutating state directly
                .sort((a, b) => a.serialNumber.localeCompare(b.serialNumber)) // Sort by serverModel alphabetically
                .map((client) => (
                    <div className="ipmi-management-client-card" key={client.serverId}>
                        <h3 className="ipmi-management-client-title">{client.serverModel}</h3>
                        <p>Hardware Serial Number: {client.serialNumber}</p>
                        <p>Address: {client.iloAddress.address}</p>
                        <p>Version: {client.iloVersion}</p>
                        <p>UUID: {client.iloUuid}</p>
                        <p>Health: {client.healthStatus}</p>
                        <div className="ipmi-management-button-group">
                            <button
                                className="ipmi-management-btn ipmi-management-btn-min"
                                onClick={() => updateFanSpeeds(client.serverId, 'MIN', 10)}
                            >
                                Set Fans to Min
                            </button>
                            <button
                                className="ipmi-management-btn ipmi-management-btn-max"
                                onClick={() => updateFanSpeeds(client.serverId, 'MAX', 100)}
                            >
                                Set Fans to Max
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {toastMessage && (
                <ToastNotification message={toastMessage} onClose={closeToast} />
            )}
        </div>
    );
    
};

export default IpmiManagementIlo;
