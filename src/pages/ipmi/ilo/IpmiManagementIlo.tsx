import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import callEndpointNoArguments from '../../../hooks/useEndpointNoArguments';
import '../../../styles/ilo/IpmiManagementIlo.css';
import Navbar from '../../../components/navigation/Navbar';
import { UnauthenticatedClient } from '../../../types/IloInterfaces';

const IpmiManagementIlo: React.FC = () => {
    const navigate = useNavigate();
    const tabs = [
        { label: 'Overview', path: '/ipmi/ilo' },
        { label: 'Fan Settings', path: '/ipmi/ilo/fan' },
    ];

    const { data: unauthenticatedClients, loading: loadingUnauthenticated } = callEndpointNoArguments<UnauthenticatedClient[]>('ilo/clients/unauthenticated');
    const [clients, setClients] = useState<UnauthenticatedClient[]>([]);

    useEffect(() => {
        if (unauthenticatedClients) {
            setClients(unauthenticatedClients);
        }
    }, [unauthenticatedClients]);

    if (loadingUnauthenticated) {
        return <div>Loading clients...</div>;
    }

    const handleClientClick = (clientId: string) => {
        navigate(`/ipmi/ilo/client/${clientId}`);
    };

    return (
        <div className="ipmi-management-container">
            <h1>Integrated Lights Out - Overview</h1>
            <Navbar tabs={tabs} />
            <div className="ipmi-management-clients-grid">
                {clients
                    .slice()
                    .sort((a, b) => a.serialNumber.localeCompare(b.serialNumber))
                    .map((client) => (
                        <div
                            key={client.serverId}
                            className="ipmi-management-client-card"
                            onClick={() => handleClientClick(client.iloUuid)}
                        >
                            <h3>{client.serverModel}</h3>
                            <p>
                                Address: {client.iloAddress.address || 'N/A'} <br />
                                Health Status: {client.healthStatus} <br />
                                {client.nics?.length > 0
                                    ? `${client.nics.length} NICs available`
                                    : 'No NICs available'} <br />
                                Serial Number: {client.serialNumber} <br />
                                Server UUID: {client.serverUuid} <br />
                                Product ID: {client.productId} <br />
                                ILO UUID: {client.iloUuid} <br />
                                Last Update Time: {new Date(client.lastUpdateTime).toLocaleString()} <br />
                                Time Between Updates: {client.timeBetweenUpdates} seconds
                            </p>

                        </div>

                    ))}
            </div>
        </div>
    );
};

export default IpmiManagementIlo;
