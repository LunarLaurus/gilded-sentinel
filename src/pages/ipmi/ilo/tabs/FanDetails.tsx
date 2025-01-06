import React, { useState, useRef } from 'react';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';
import IloFanSettingsCard from '../../../../components/subcomponent/ipmi/ilo/IloFanSettingsCard';
import InfoGrid from '../../../../components/primary/table/InfoGrid';
import '../../../../styles/ilo/IloGenericStyling.css';

interface Props {
    client: AuthenticatedClient;
}

const FanDetails: React.FC<Props> = ({ client: initialClient }) => {

    React.useEffect(() => {
        document.title = client.serverHostname + " Fan Details";
    }, []);

    const [client] = useState<AuthenticatedClient>(initialClient);
    const fixedKeyBase = useRef(initialClient.iloUuid).current;

    console.log("FanDetails component rendered");

    if (!client) {
        console.log("Client data not available yet");
        return <div>Loading client...</div>;
    }

    return (
        <div>
            <IloFanSettingsCard
                key={`${fixedKeyBase}-FanCard`}
                ip={client.iloAddress}
                iloUuid={client.iloUuid}
            />

            {/* Fans Section */}
            <InfoGrid
                key={`${fixedKeyBase}-FanInfo`}
                data={client.fans}
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
                key={`${fixedKeyBase}-TempSensors`}
                data={client.thermalSensors}
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
                            currentReading: { suffix: 'of Unit' },
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
