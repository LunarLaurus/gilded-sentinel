import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/navigation/Navbar';
import callEndpointNoArguments from '../../../hooks/useEndpointNoArguments';
import { UnauthenticatedClient } from '../../../types/IloInterfaces';
import IloFanSettingsCard from '../../../components/subcomponent/ipmi/ilo/IloFanSettingsCard';
import '../../../styles/ilo/IloFanManagementPage.css';

const IloFanManagementPage: React.FC = () => {
    const tabs = [
        { label: 'Overview', path: '/ipmi/ilo' },
        { label: 'Fan Settings', path: '/ipmi/ilo/fan' },
    ];

    const [clients, setClients] = useState<UnauthenticatedClient[]>([]);
    const { data: unauthenticatedClients, loading: isLoading } = callEndpointNoArguments<UnauthenticatedClient[]>('ilo/clients/unauthenticated');

    useEffect(() => {
        if (unauthenticatedClients) {
            setClients(unauthenticatedClients);
        }
    }, [unauthenticatedClients]);

    const renderContent = () => {
        if (isLoading) return <div>Loading clients...</div>;
        if (clients.length === 0) return <p>No clients found.</p>;

        return (
            <div className="fan-settings-grid">
                {clients.map((client) => (
                    <IloFanSettingsCard
                        key={client.serverId}
                        ip={client.iloAddress}
                        iloUuid={client.iloUuid}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="fan-settings-container">
            <Navbar tabs={tabs} />
            <h1>Fan Settings</h1>
            {renderContent()}
        </div>
    );
};

export default IloFanManagementPage;
