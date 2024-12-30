import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import callEndpointNoArguments from '../../../hooks/useEndpointNoArguments';
import '../../../styles/ilo/IpmiManagementIlo.css';
import Navbar from '../../../components/navigation/Navbar';
import InfoGrid from '../../../components/primary/table/InfoGrid';
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

    const sections = [
        {
            title: 'Client Information',
            clickable: false,
            fieldsToDisplay: [
                'iloAddress',
                'serialNumber',
                'serverId',
                'serverUuid',
                'productId',
                'iloVersion',
                'iloUuid',
                'nics',
                'healthStatus',
                'lastUpdateTime',
            ],
            fieldNameOverrides: {
                lastUpdateTime: 'Last Seen',
                healthStatus: 'Health',
            },
            fieldDecorators: {
                nics: { suffix: ' found' },
            },
        },
    ];

    return (
        <div className="ipmi-management-container">
            <h1>Integrated Lights Out - Overview</h1>
            <Navbar tabs={tabs} />
            <InfoGrid
                data={clients.sort((a, b) => a.iloAddress.address.localeCompare(b.iloAddress.address))}
                title="Unauthenticated Clients"
                clickable={false}
                onClick={(client) => handleClientClick(client.iloUuid)}
                sections={sections}
                getItemTitle={(client) => client.serverModel || 'Unknown Model'}
                noDataMessage="No clients available."
            />
        </div>
    );
};

export default IpmiManagementIlo;
