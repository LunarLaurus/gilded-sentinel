import React from 'react';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client: AuthenticatedClient;
}

const NicDetails: React.FC<Props> = ({ client }) => (
    <div>
        <h2>NIC Details</h2>
        {client && client.nics?.length > 0 ? (
            client.nics.map((nic, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <h3>NIC {index + 1}</h3>
                    <p>Port: {nic.port}</p>
                    <p>Description: {nic.description}</p>
                    <p>Location: {nic.location}</p>
                    <p>MAC Address: {nic.mac}</p>
                    <p>IP Address: {nic.ip?.address || 'N/A'}</p>
                    <p>Status: {nic.status}</p>
                </div>
            ))
        ) : (
            <p>No NICs available</p>
        )}
    </div>
);

export default NicDetails;
