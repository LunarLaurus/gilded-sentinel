import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import callEndpointNoArguments from '../../../hooks/useEndpointNoArguments';
import '../../../styles/ilo/IpmiManagementIlo.css';
import Navbar from '../../../components/navigation/Navbar';
import InfoGrid from '../../../components/primary/table/InfoGrid';
import { UnauthenticatedClient } from '../../../types/IloInterfaces';
import { getIloVersion, getLastOnlineFlag } from '../../../utils/IloUtils';

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

            const processedClients = unauthenticatedClients.map((client) => {
                return {
                    ...client,
                    iloSeries: getIloVersion(client.iloText),
                    lastOnlineFlag: getLastOnlineFlag(client.lastUpdateTime),
                };
            });

            setClients(processedClients);
        }
    }, [unauthenticatedClients]);

    if (loadingUnauthenticated) {
        return <div>Loading clients...</div>;
    }

    const handleClientClick = (clientId: string) => {
        navigate(`/ipmi/ilo/client/${clientId}/detail`);
    };

    const sections = [
        {
            title: 'Client Information',
            clickable: false,
            fieldsToDisplay: [
                'iloAddress',
                'iloSeries',
                'serialNumber',
                'serverId',
                'serverUuid',
                'productId',
                'iloVersion',
                'iloUuid',
                'nics',
                'healthStatus',
                'lastUpdateTime',
                'lastOnlineFlag',
            ],
            fieldNameOverrides: {
                lastUpdateTime: 'Last Seen',
                lastOnlineFlag: 'Last Online',
                healthStatus: 'Health',
            },
            fieldDecorators: {
                nics: { suffix: ' found' },
            },
            fieldTypeMap: {
                lastUpdateTime: (value: string | number | Date) => `${new Date(value).toLocaleString()}`,
            },
        },
    ];

    return (
        <div className="ipmi-management-container">
            <h1>Integrated Lights Out Clients</h1>
            <Navbar tabs={tabs} />
            <InfoGrid
                data={clients.sort((a, b) => a.iloAddress.address.localeCompare(b.iloAddress.address))}
                title=""
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
