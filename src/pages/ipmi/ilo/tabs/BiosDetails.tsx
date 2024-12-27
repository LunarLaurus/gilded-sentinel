import React from 'react';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client: AuthenticatedClient;
}

const BiosDetails: React.FC<Props> = ({ client }) => {
    const hasBootBlock = client.bios.bootBlock !== null;
    const validBootBlock = hasBootBlock 
        && client.bios.bootBlock.version !== null 
        && client.bios.bootBlock.version.length > 0;

    return (
        <div className="ipmi-management-clients-grid">
            <div
                key={client.bios.current.version}
                className="ipmi-management-client-card"
            >
                <h3>Current</h3>
                <p>
                    Date: {client.bios.current.date}<br />
                    Family: {client.bios.current.family}<br />
                </p>
            </div>
            <div
                key={client.bios.backup.version}
                className="ipmi-management-client-card"
            >
                <h3>Backup</h3>
                <p>
                    Date: {client.bios.backup.date}<br />
                    Family: {client.bios.backup.family}<br />
                </p>
            </div>
            {validBootBlock && (
                <div
                    key={client.bios.bootBlock.version}
                    className="ipmi-management-client-card"
                >
                    <h3>Boot Block</h3>
                    <p>
                        Date: {client.bios.bootBlock.date}<br />
                        Family: {client.bios.bootBlock.family}<br />
                    </p>
                </div>
            )}
        </div>
    );
};

export default BiosDetails;
