import React from 'react';
import '../../../../styles/ilo/IloGenericStyling.css';
import { Nic, AuthenticatedClient } from '../../../../types/IloInterfaces';
import InfoGrid from '../../../../components/primary/table/InfoGrid';
import { IPv4Address } from '../../../../types/IpmiInterfaces';

interface Props {
    client: AuthenticatedClient;
}

const NicDetails: React.FC<Props> = ({ client }) => {

    React.useEffect(() => {
        document.title = client.serverHostname + " NIC Details";
    }, [client.serverHostname]);

    const sortNics = (nics: Nic[]) => {
        return nics.sort((a, b) => {
            // Sorting by status
            const statusRank = (status: string) => {
                if (status === 'Ok') return 0; // Top priority
                if (status === 'Link Down') return 5;
                if (status === 'Unknown') return 10; // Lowest priority
                if (status === 'Disabled') return 15; // Lowest priority
                return 1; // Middle priority for everything else
            };
    
            const rankA = statusRank(a.status);
            const rankB = statusRank(b.status);
    
            if (rankA !== rankB) return rankA - rankB;
    
            // Check if description contains 'iLO' as a full word (case insensitive)
            //const containsIlo = (description: string) => /\bilo\b/i.test(description);    
            //const hasIloA = containsIlo(a.description);
            //const hasIloB = containsIlo(b.description);
    
            // Alphabetical sort by description as fallback
            return (a.ip?.address || 'N/A').localeCompare(b.ip?.address || 'N/A');
        });
    };    

    const sections = [
        {
            clickable: false,
            fieldsToDisplay: [
                'ip',
                'port',
                'description',
                'location',
                'mac',
                'status'
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
                ip: (value: IPv4Address) => value?.address === '0.0.0.0' || !value?.address ? 'N/A' : value.address,
            },
        },
    ];

    return (
        <div className="generic-ilo-container">
            {client && client.nics.length > 0 ? (
                <InfoGrid
                    data={sortNics(client.nics)}
                    title={"Network Interface Cards"}
                    clickable={false}
                    sections={sections}
                    getItemTitle={(nic) => nic.description || 'Unknown Model'}
                    noDataMessage="No clients available."
                />
            ) : (
                <div className="generic-ilo-card">
                    <h2>No NICs Available</h2>
                    <p>This is likely an Error.</p>
                </div>
            )}
        </div>
    );
};

export default NicDetails;
