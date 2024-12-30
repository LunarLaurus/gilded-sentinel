import React from 'react';
import '../../../../styles/ilo/IloGenericStyling.css';
import { AuthenticatedClient, IloMemoryDimm } from '../../../../types/IloInterfaces';
import InfoTable from '../../../../components/primary/table/InfoTable';

interface Props {
    client: AuthenticatedClient;
}

/* Reusable DIMM Card Component */
const DimmCard: React.FC<{ memory: IloMemoryDimm; index: number; }> = ({ memory, index }) => (
    <div className="generic-ilo-card">
        <h2>DIMM {index}</h2>

        <InfoTable
            data={memory}
            title='General Information'
            fieldsToDisplay={['name', 'status', 'type', 'generation']}
        />
        <InfoTable
            data={memory}
            title='Specifications'
            fieldsToDisplay={[
                'size', 'rank', 'maximumFrequency',
                'minimumVoltageVolts', 'dataWidth', 'totalWidth']}
            fieldDecorators={{
                size: { suffix: 'Mb' },
                maximumFrequency: { suffix: 'Mhz' },
                minimumVoltageVolts: { suffix: 'V' },
                dataWidth: { suffix: 'Bits' },
                totalWidth: { suffix: 'Bits' }
            }}
        />
        <InfoTable
            data={memory}
            title='Manufacturer Details'
            fieldsToDisplay={['manufacturer', 'partNumber', 'hpMemoryType']}
        />
        <InfoTable
            data={memory.location}
            title='Location'
            fieldsToDisplay={['dimmId', 'processorId']}
            fieldNameOverrides={{
                dimmId: 'Dimm Slot',
                processorId: 'Processor',
            }}
        />
    </div>
);

const MemoryDetails: React.FC<Props> = ({ client }) => (
    <div className="generic-ilo-container">
        <div className="generic-ilo-grid">
            {client && client.memory.dimms.length > 0 ? (
                client.memory.dimms.map((dimm, index) => (
                    <DimmCard key={index} memory={dimm} index={index} />
                ))
            ) : (
                <div className="generic-ilo-card">
                    <h2>No DIMMs Available</h2>
                    <p>No memory data found.</p>
                </div>
            )}
        </div>
    </div>
);

export default MemoryDetails;
