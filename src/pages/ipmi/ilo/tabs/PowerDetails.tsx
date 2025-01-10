import React from 'react';
import '../../../../styles/ilo/IloGenericStyling.css';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';
import InfoGrid from '../../../../components/primary/table/InfoGrid';
import InfoTable from '../../../../components/primary/table/InfoTable';

interface Props {
    client: AuthenticatedClient;
}

const PowerDetails: React.FC<Props> = ({ client }) => {

    React.useEffect(() => {
        document.title = client.serverHostname + " Power Details";
    }, [client.serverHostname]);

    const sections = [
        {
            title: (supply: { model: string; type: string; }) => `${supply.model} (${supply.type})`,
            clickable: false,
            fieldsToDisplay: [
                'powerCapacity',
                'lastPowerOutputWatts',
                'lineInputVoltage',
                'lineInputVoltageType',
                'hotplugCapable',
                'model',
                'type',
                'serialNumber',
                'sparePartNumber',
                'firmwareVersion',
                'health',
                'state',
                'lastUpdateTime',
            ],
            fieldNameOverrides: {
                lastUpdateTime: 'Last Seen',
                health: 'Health',
                state: 'Status',
            },
            fieldDecorators: {
                powerCapacity: { suffix: 'W' },
                lastPowerOutputWatts: { suffix: 'W' },
                lineInputVoltage: { suffix: 'V' },
            },
            fieldTypeMap: {
                lastUpdateTime: (value: string | number | Date) => `${new Date(value).toLocaleString()}`,
            },
        },
    ];

    return (
        <div className="generic-ilo-container">

            <div className='generic-ilo-card'>
                <InfoTable
                    title='System Power Information'
                    data={client.powerData}
                    fieldsToDisplay={[
                        'capacity',
                        'consumption',
                        'averageConsumedWatts',
                        'intervalInMinutes',
                        'maxConsumedWatts',
                        'minConsumedWatts',
                        'lastUpdateTime',]}
                    fieldDecorators={{
                        capacity: { suffix: 'W' },
                        consumption: { suffix: 'W' },
                        averageConsumedWatts: { suffix: 'W' },
                        intervalInMinutes: { suffix: ' Minutes' },
                        maxConsumedWatts: { suffix: 'W' },
                        minConsumedWatts: { suffix: 'W' }
                    }}
                    fieldNameOverrides={{
                        lastUpdateTime: 'Last Seen',
                    }}
                    fieldTypeMap={{
                        lastUpdateTime: (value: string | number | Date) => `${new Date(value).toLocaleString()}`,
                    }}
                    clickable={false}
                />
            </div>
                <InfoGrid
                    data={client.powerData.supplies}
                    title={'Power Supplies'}
                    clickable={false}
                    noDataMessage="No Power Supplies available."
                    sections={sections}
                    getItemTitle={(supply) => 'Bay ' + supply.bayNumber}
                />
        </div>
    );
};

export default PowerDetails;
