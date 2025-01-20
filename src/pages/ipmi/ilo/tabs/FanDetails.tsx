import React, { useState, useEffect } from 'react';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';
import IloFanSettingsCard from '../../../../components/subcomponent/ipmi/ilo/IloFanSettingsCard';
import InfoGrid from '../../../../components/primary/table/InfoGrid';
import '../../../../styles/ilo/IloGenericStyling.css';
import { FetchEndpoint } from '../../../../hooks/useEndpointNoArguments';

interface Props {
    clientUuid: string;
}

const FanDetails: React.FC<Props> = ({ clientUuid: clientId }) => {
    // State for managing the authenticated client
    const [authenticatedClient, setAuthenticatedClient] = useState<AuthenticatedClient | null>(null);
    const [loadingAuthenticated, setLoadingAuthenticated] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch client data on mount
    useEffect(() => {
        const fetchData = async () => {
            setLoadingAuthenticated(true);
            try {
                const data = await FetchEndpoint<AuthenticatedClient>(`ilo/${clientId}/authenticated`);
                setAuthenticatedClient(data);
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error('Error fetching client data:', err);
                setAuthenticatedClient(null);
                setError('Failed to load client data.');
            } finally {
                setLoadingAuthenticated(false);
            }
        };

        fetchData();
    }, [clientId]);

    // Periodically refetch data every 5 seconds
    useEffect(() => {
        if (!authenticatedClient) return; // Avoid setting up interval if data is not loaded

        const intervalId = setInterval(async () => {
            try {
                console.info('Refetching client data...');
                const data = await FetchEndpoint<AuthenticatedClient>(`ilo/${authenticatedClient.iloUuid}/authenticated`);
                setAuthenticatedClient(data);
            } catch (err) {
                console.error('Error refetching client data:', err);
            }
        }, 5000);

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [authenticatedClient]);

    // Update document title
    useEffect(() => {
        if (authenticatedClient) {
            document.title = `${authenticatedClient.serverHostname || clientId} Fan Details`;
        }
    }, [authenticatedClient, clientId]);

    if (loadingAuthenticated) {
        console.log('Client data not available yet');
        return <div>Loading client...</div>;
    }

    if (error) {
        console.log(error);
        return <div>{error}</div>;
    }

    if (!authenticatedClient) {
        console.log('Client data not found');
        return <div>Client not found.</div>;
    }

    return (
        <div>
            <IloFanSettingsCard
                ip={authenticatedClient.iloAddress}
                iloUuid={authenticatedClient.iloUuid}
            />

            {/* Fans Section */}
            <InfoGrid
                data={authenticatedClient.fans}
                title="Fans"
                sections={[
                    {
                        title: 'Details',
                        fieldsToDisplay: ['currentReading', 'unit', 'statusHealth', 'statusState'],
                        fieldNameOverrides: {
                            statusState: 'State',
                            statusHealth: 'Health',
                        },
                    },
                ]}
                getItemTitle={(fan) => fan.fanName}
                noDataMessage="No Fans available"
            />

            {/* Temperature Sensors Section */}
            <InfoGrid
                data={authenticatedClient.thermalSensors}
                title="Temperature Sensors"
                sections={[
                    {
                        title: 'Location',
                        fieldsToDisplay: ['locationXmm', 'locationYmm'],
                        fieldNameOverrides: {
                            locationXmm: 'X',
                            locationYmm: 'Y',
                        },
                    },
                    {
                        title: 'Information',
                        fieldsToDisplay: [
                            'currentReading',
                            'readingCelsius',
                            'physicalContext',
                            'upperThresholdCritical',
                            'upperThresholdFatal',
                            'upperThresholdUser',
                            'health',
                            'state',
                            'unit',
                        ],
                        fieldNameOverrides: {
                            dimmId: 'Dimm Slot',
                            processorId: 'Processor',
                        },
                        fieldDecorators: {
                            currentReading: { suffix: ' of Unit' },
                            readingCelsius: { suffix: 'C' },
                            upperThresholdCritical: { suffix: 'C' },
                            upperThresholdFatal: { suffix: 'C' },
                            upperThresholdUser: { suffix: 'C' },
                        },
                    },
                ]}
                getItemTitle={(sensor) => sensor.name}
                noDataMessage="No Temperature Sensors available"
            />
        </div>
    );
};

export default FanDetails;
