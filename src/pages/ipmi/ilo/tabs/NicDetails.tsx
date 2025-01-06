import React from 'react';
import '../../../../styles/ilo/IloGenericStyling.css';
import InfoGrid from '../../../../components/primary/table/InfoGrid';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client: AuthenticatedClient;
}

const NicDetails: React.FC<Props> = ({ client }) => {

    React.useEffect(() => {
        document.title = client.serverHostname + " NIC Details";
    });

    const sections = [
        {
            title: 'Information',
            fieldsToDisplay: ['port', 'description', 'location', 'mac', 'ip.address', 'status'],
            fieldNameOverrides: {
                'ip.address': 'IP Address',
                mac: 'MAC Address',
            },
        },
    ];

    return (
        <div className="generic-ilo-container">
            <InfoGrid
                data={client.nics || []}
                title="NIC Details"
                clickable={false}
                sections={sections}
                getItemTitle={(nic) => `NIC ${client.nics.indexOf(nic) + 1}`}
                noDataMessage="No NICs available"
            />
        </div>
    );
};

export default NicDetails;
