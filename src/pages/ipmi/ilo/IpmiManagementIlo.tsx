import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchEndpoint } from '../../../hooks/useEndpointNoArguments';
import '../../../styles/ilo/IpmiManagementIlo.css';
import Navbar from '../../../components/navigation/Navbar';
import InfoGrid from '../../../components/primary/table/InfoGrid';
import { UnauthenticatedClient } from '../../../types/IloInterfaces';
import { getIloVersion, getLastOnlineFlag } from '../../../utils/IloUtils';
import { useQuery } from '@tanstack/react-query';

const IpmiManagementIlo: React.FC = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        document.title = "ILO Clients";
    }, []); // Add dependency array to avoid re-executing

    const tabs = [
        { label: 'Overview', path: '/ipmi/ilo' },
        { label: 'Fan Settings', path: '/ipmi/ilo/fan' },
    ];

    const handleClientClick = (clientId: string) => {
        navigate(`/ipmi/ilo/client/${clientId}/detail`);
    };

    const { data: clientData, isLoading, isError } = useQuery({
        queryKey: ["unauthIloClients"],
        queryFn: () => FetchEndpoint<UnauthenticatedClient[]>('ilo/clients/unauthenticated'),
    });

    const [clients, setClients] = useState<UnauthenticatedClient[]>([]);

    // Process `clientData` whenever it changes
    useEffect(() => {
        if (clientData) {
            const processedClients = clientData.map((client) => ({
                ...client,
                iloSeries: getIloVersion(client.iloText),
                lastOnlineFlag: getLastOnlineFlag(client.lastUpdateTime),
            }));
            setClients(processedClients);
        }
    }, [clientData]);

    if (isLoading) {
        return <div>Loading clients...</div>;
    }

    if (isError) {
        return <div>Error loading clients.</div>;
    }

    if (!clientData || clientData.length === 0) {
        return (
            <div>
                No clients found.
                Valid Response: {clientData ? 'true' : 'false'},
                Valid Data: {clientData !== null},
                Size: {clientData?.length}
            </div>
        );
    }

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
